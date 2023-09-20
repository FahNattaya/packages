import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
dotenv.config();
export interface RequestWithTokenAndUser extends Request {
	token?: string;
	user?: string | jwt.JwtPayload;
}

enum ErrorType {
	BadRequest = 'BadRequest',
	Unauthorized = 'Unauthorized',
	Forbidden = 'Forbidden',
	InternalServer = 'InternalServer',
}

export const verifyToken = (req: RequestWithTokenAndUser, res: Response, next: NextFunction) => {
	const authHeader = req.headers['x-authorization'] as string;

	if (!authHeader) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Authentication token missing' });
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Authentication token missing' });
	}
	// if (typeof authHeader === 'undefined') {

	// 	return next(createError(ErrorType.BadRequest, 'No x-authorization header'));
	// }
	// const authParts = Array.isArray(authHeader) ? authHeader[0].split(' ') : authHeader.split(' ');
	// if (authParts.length !== 2 || authParts[0] !== 'Bearer') {
	// 	return next(createError(ErrorType.BadRequest, "'Invalid x-authorization format, expected 'Bearer token'"));
	// }
	// const token = authParts[1];
	const secret = ',TH0.n3SG0UL]^R/Q$v}aO#.V2gzbj';
	// if (token == null) return next(createError(ErrorType.BadRequest, 'Token was expired'));
	// if (!secret) {
	// 	return next(createError(ErrorType.InternalServer, 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง'));
	// }
	// jwt.verify(token, secret, (err, user) => {
	// 	if (err) {
	// 		if (err.name === 'JsonWebTokenError') {
	// 			return next(createError(ErrorType.Unauthorized, 'Invalid token'));
	// 		}
	// 		if (err.name === 'TokenExpiredError') {
	// 			return next(createError(ErrorType.BadRequest, 'Token was expired'));
	// 		}
	// 		return next(createError(ErrorType.InternalServer, 'Invalid input'));
	// 	}
	// 	if (typeof user === 'undefined')
	// 		return next(createError(ErrorType.Forbidden, 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง'));
	// 	req.user = user;
	// 	next();
	// });
	jwt.verify(token, secret, (err, user) => {
		if (err) {
			return res.status(StatusCodes.FORBIDDEN).json({ error: 'Invalid token' });
		}
		// if (typeof user === 'undefined')
		// 	return next(createError(ErrorType.Forbidden, 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง'));
		req.user = user;
		next();
	});
};

export const attachToken = (req: Request & { token?: string }, res: Response, next: NextFunction) => {
	const authHeader = req.headers['x-authorization'];
	req.token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
	next();
};

function createError(type: ErrorType, message?: string): Error {
	const error = new Error(message);
	error.name = type;
	return error;
}
