import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Utils } from './utils';
import db from './db';
import api from './resources';


var app = express();
app.server = http.createServer(app);

app.use(cors({
	exposedHeaders: ['Link']
}));

app.set('secretToken', Utils.getSecretToken());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db( _ => {
	app.use('/', api());
	app.server.listen(3000);
});

export default app;
