import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const addErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err) {
		return res.status(StatusCodes.NOT_IMPLEMENTED).send({
			success: false,
			name: err.name,
			message: err.message,
		});
	}
	next();
};
