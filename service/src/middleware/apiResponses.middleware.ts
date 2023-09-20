import { NextFunction, Request, Response } from 'express';

class BadRequestError extends Error {}
class UnauthorizedError extends Error {}
class ForbiddenError extends Error {}
class InternalServerError extends Error {}
class NotFoundError extends Error {}

function sendError(res: Response, code: string, description: string, developerMessage: string, status: number) {
	return res.status(status).send({
		resultCode: code,
		resultDescription: description,
		developerMessage: developerMessage,
	});
}

export function mapResponse(res: Response, data: any, status: number) {
	return res.status(status).send({
		resultCode: '2000',
		resultDescription: 'Success',
		developerMessage: data,
	});
}

export function createErrorResponse(errorData: any) {
	const resultCode = `${errorData.MC}${errorData.repo}-${errorData.node}-${errorData.status}-${errorData.apiNo}-${errorData.errorCode}`;
	const resultDescription = `${errorData.nodeName} ${errorData.apiName} [${errorData.resultMessage}]`;
	const developerMessage = `${errorData.nodeName} ${errorData.apiName} [${errorData.resultMessage}]`;

	return {
		data: errorData,
		resultCode: resultCode,
		resultDescription: resultDescription,
		developerMessage: developerMessage,
		Error: 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้',
	};
}

export function createStandardErrorResponse(errorData: any) {
	const resultCode = `MCS027-${errorData.nodeNo}-${errorData.httpStatus}-${errorData.apiNo}-${errorData.errorCode}`;
	const resultDescription = `${errorData.nodeName} ${errorData.apiName} [${errorData.errorDescription}]`;
	const developerMessage = `${errorData.nodeName} ${errorData.apiName} [${errorData.description}]`;
	const responseMap = {
		resultCode: resultCode,
		resultDescription: resultDescription,
		developerMessage: developerMessage,
		Error: errorData.errorMessage || 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้',
	};
	const caseError: Error = {
		name: 'standard error',
		message: JSON.stringify(responseMap),
	};
	return caseError;
}

export const apiResponses = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof BadRequestError) {
		sendError(res, '400', err.message || 'Bad Request', 'Bad Request', 400);
	}
	if (err instanceof UnauthorizedError) {
		sendError(res, '401', err.message || 'Unauthorized', 'Unauthorized', 401);
	}
	if (err instanceof ForbiddenError) {
		sendError(res, '403', err.message || 'Forbidden', 'Forbidden', 403);
	}
	if (err instanceof NotFoundError) {
		return sendError(res, '404', err.message || 'Not Found', 'Not Found', 404);
	}
	if (err instanceof InternalServerError) {
		sendError(res, '500', err.message || 'Internal Server Error', 'Internal Server Error', 500);
	}
	sendError(res, '500', err.message || 'Internal Server Error', 'Internal Server Error', 500);
};
