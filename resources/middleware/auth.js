import jwt from 'jsonwebtoken';
import app from '../../server';

export default function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers.authorization;

    // decode token
    if (token) {

        // verifies secret and checks if expired
        jwt.verify(token, app.get('secretToken'), function (err, decoded) {
            if (err) {
                return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};