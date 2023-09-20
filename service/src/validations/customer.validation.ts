import { body, param } from 'express-validator';

export class CustomerValidation {
	static queryContractByMobileNo = [
		body('option').isString().notEmpty(),
		body('mobileNo').isString().optional(),
		body('idCardNo').isString().notEmpty(),
		body('profileType').isString().notEmpty(),
		body('sourceSystem').isString().notEmpty(),
	];

	static sendOTP = [body('msisdn').isLength({ min: 9, max: 9 }).isString().notEmpty()];

	static verifyOTP = [
		body('transactionID').isString().notEmpty(),
		body('msisdn').isLength({ min: 9, max: 9 }).isString().notEmpty(),
		body('pwd').isString().isLength({ min: 4, max: 4 }).notEmpty(),
	];

	static queryListMobileNo = [param('idCard').isString().notEmpty().withMessage('idCard must be a non-empty string')];
}
