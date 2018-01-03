import { Router } from 'express';
import { AuthController } from './controllers/auth';
import { UserController, ScrumboardController } from './controllers';
import jwt from 'jsonwebtoken';
import app from '../server';
import isAuth from './middleware/auth';

export default function() {
	var api = Router();

    /** Routes without auth check */
    api.use('/auth', new AuthController().auth());
    api.use('/register', new AuthController().register());

    /** Routes need auth */
    api.use('/users', isAuth, new UserController().route());
    api.use('/scrumboards', isAuth, new ScrumboardController().route());

	return api;
}
