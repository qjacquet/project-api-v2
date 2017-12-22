import { Router } from 'express';
import { AuthController } from './controllers/auth';
import { UserController, ScrumboardController } from './controllers';
import jwt from 'jsonwebtoken';
import app from '../server';

export default function() {
	var api = Router();

	api.use('/auth', new AuthController().route());
	api.use('/users', new UserController().route());

    api.use(function (req, res, next) {

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
    });

	api.use('/scrumboards', new ScrumboardController().route());
	return api;
}
