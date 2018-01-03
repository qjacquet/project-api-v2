import { Router } from 'express';
import { AuthController } from './controllers/auth';
import { UserController, ScrumboardController } from './controllers';
import jwt from 'jsonwebtoken';
import app from '../server';
import isAuth from './middleware/auth';

export default function() {
	var api = Router();

    /** Routes without auth check */
	api.use('/auth', new AuthController().route());
    api.use('/users', new UserController().route());

    /** Routes need auth */
    api.use('/scrumboards', isAuth, new ScrumboardController().route());

	return api;
}
