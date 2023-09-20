import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import * as moment from 'moment-timezone';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { addErrorHandler } from './middleware/handleErrors.middleware';
import { myLogger } from './middleware/logger';
import Router from './routes';

dotenv.config();
moment.tz.setDefault('Asia/Bangkok');

const PORT_HTTP = process.env.PORT || 3001;
const app: Application = express();
const mongoUrl = process.env.DB_URL as string;
app.use(express.json({ limit: '5mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hpp());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(myLogger);
app.use(Router);
app.use(addErrorHandler);

const httpServer = http.createServer(app);
httpServer.listen(PORT_HTTP, () => {
	console.log('Http Server is running on port', PORT_HTTP);
});

mongoose.connect(mongoUrl);
