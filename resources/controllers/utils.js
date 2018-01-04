import { User } from '../../models';
import jwt from 'jsonwebtoken';

export function ok(res) {
    return (data) => {
        res.json(data);
    };
};

export function fail(res) {
    return (error) => {
        console.log(error);
        res.sendStatus(404).end();
    };
};

export function getUserIdFromToken(token){
    var user = new User();
    user = jwt.decode(token);
    return user.id;
}

export function getTokenFromRequest(req){
    return req.body.token || req.query.token || req.headers.authorization;
}

/**
 * Get User Id from Request
 * @param {Request} req 
 */
export function getUserId(req){
    return getUserIdFromToken(getTokenFromRequest(req));
}

