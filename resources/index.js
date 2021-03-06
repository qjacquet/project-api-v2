import { Router } from 'express';
import { AuthController } from './controllers/auth';
import { UserController, ScrumboardController, FileController, ChatController } from './controllers';
import jwt from 'jsonwebtoken';
import app from '../server';
import isAuth from './middleware/auth';

export default function() {
	var api = Router();

    /** Routes without auth check */
    api.use('/auth', new AuthController().auth());
    api.use('/register', new AuthController().register());

	 /** Routes need auth */
	 api.use('/logout', new AuthController().logout());
	 
    api.use('/users', isAuth, new UserController().route());
    api.use('/scrumboards', isAuth, new ScrumboardController().route());
    api.use('/files', isAuth, new FileController().route());
    api.use('/chats', isAuth, new ChatController().route());

	return api;
}
