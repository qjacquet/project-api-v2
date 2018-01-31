import { Router } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { UserController } from '../controllers/user';
import { ok, fail } from './utils';
import app from '../../server';

export class AuthController {

    constructor() {
    }

    auth() {
        const router = new Router();

        router.post("/", (req, res) => {
            User.findOne({ login: req.body.login }, function (err, user) {
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                }
                else if (user) {

                    /** Compare input password to hashed stored password */
                    user.comparePassword(req.body.password, function (isMatch) {
                        if (!isMatch)
                            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                        else {
                            /** Set token and payload for other user infos */
                            var payload = {
                                id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                avatar: user.avatar,
                                admin: user.admin,
                                status: user.status
                            };
                            var token = jwt.sign(payload, app.get('secretToken'), {
                                expiresIn: 60 * 60 * 24 // expires in 24 hours
                            });

                            /** Return token */
                            res.json({
                                success: true,
                                message: 'Enjoy your token!',
                                token: token
                            });
                        }
                    });
                }
            });
        });

        return router;
    }

    register() {
        const router = new Router();
        const userController = new UserController();

        router.post("/", (req, res) => {
            userController
                .create(req.body)
                .then(ok(res))
                .then(null, fail(res));
        });

        return router;
    }
}
