import { NextFunction, Request, Response } from 'express';
import { checkExact, ValidationChain, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export default function validate(validations: ValidationChain[]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		for (const validation of validations) {
			const result = await validation.run(req);
			if (result['errors'].length) {
				break;
			}
		}
		await checkExact().run(req);
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		const validationErrors = Object.keys(errors.mapped())[0] as string;
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: 'Validation errors', errors: `Invalid value ${validationErrors}` });
	};
}
