import { Router } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import app from '../../server';

export class AuthController {

    constructor() {
    }

    route() {
        const router = new Router();

        router.post("/", (req, res) => {
            User.findOne({ login: req.body.login }, function (err, user) {
                if (err) throw err;
    
                if (!user) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                }
                else if (user) {
                    // check if password matches
    
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (err)
                            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    });
    
                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    var payload = {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar,
                        admin: user.admin,
                    };
                    var token = jwt.sign(payload, app.get('secretToken'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
    
                }
            });
        });

        return router;
    }
}
