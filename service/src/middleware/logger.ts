import { NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';

import winston from 'winston';
export const myLogger = async (req: Request, res: any, next: NextFunction) => {
	const startHrTime = process.hrtime();
	const originalSend = res.send;
	const myFormat = winston.format.printf(({ message }) => {
		const {
			IP,
			REQUEST_URI,
			RESPONSE_BODY,
			RESPONSE_STATUS,
			REQUEST_METHOD,
			REQUEST_HEADER,
			RESPONSE_RESULT_CODE,
			SERVICE_ENDPOINT,
			TIMESTAMP,
			RESPONSE_TIME,
			RESPONSE_RESULT_DEVELOPER_MESSAGE,
			ERROR_MESSAGE,
			ERROR_INSTANCE,
			REQUEST_ID,
			ID,
			RESPONSE_RESULT_DESCRIPTION,
		} = message;
		return JSON.stringify({
			IP,
			REQUEST_URI,
			RESPONSE_BODY,
			RESPONSE_STATUS,
			REQUEST_METHOD,
			REQUEST_HEADER,
			RESPONSE_RESULT_CODE,
			SERVICE_ENDPOINT,
			TIMESTAMP,
			RESPONSE_TIME,
			RESPONSE_RESULT_DEVELOPER_MESSAGE,
			ERROR_MESSAGE,
			ERROR_INSTANCE,
			REQUEST_ID,
			ID,
			RESPONSE_RESULT_DESCRIPTION,
		});
	});
	res.send = function (body: object) {
		const responseBody = body;
		const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		const elapsedHrTime = process.hrtime(startHrTime);
		const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
		const appName = process.env.name || 'mychannel-service-device-sales';
		const formattedDate = moment()
			.toISOString()
			.replace(/(T)(?!T)|(Z)(?!Z)/g, (_, t, z) => (t ? ' ' : z ? '' : _));
		const logger = winston.createLogger({
			format: winston.format.combine(myFormat),
			transports: [new winston.transports.Console()],
		});
		if (process.env.production === 'true') {
			logger.info({
				REQUEST_URI: req.url,
				IP: ip,
				RESPONSE_STATUS: res.statusCode,
				REQUEST_METHOD: req.method,
				REQUEST_HEADER: req.headers,
				RESPONSE_RESULT_CODE: res.statusCode.toString() + '00',
				SERVICE_ENDPOINT: 'device-sales',
				RESPONSE_BODY: responseBody,
				TIMESTAMP: formattedDate,
				RESPONSE_TIME: Math.floor(elapsedTimeInMs),
				RESPONSE_RESULT_DEVELOPER_MESSAGE: 'Request successful',
				ERROR_MESSAGE: res.statusCode !== StatusCodes.OK ? responseBody : null,
				ERROR_INSTANCE: null,
				REQUEST_ID: formattedDate.replace(/[-:. ]+/g, ''),
				ID: formattedDate.replace(/[-:. ]+/g, '') + ':' + appName,
				RESPONSE_RESULT_DESCRIPTION: 'Success',
			});
		}
		originalSend.call(this, body);
	};
	next();
};
