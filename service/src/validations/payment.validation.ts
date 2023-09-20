import { body, param } from 'express-validator';

export class PaymentValidation {
	static banksPromotion = [body('location').notEmpty()];

	static queryCardInfo = [
		body('prefixCard').isString().notEmpty().withMessage('prefixCard is required'),
		body('cardCategory').isString().notEmpty().withMessage('cardCategory is required'),
	];

	static installmentsForPartner = [
		body('brand').isString().notEmpty().withMessage('brand is required'),
		body('model').isString().notEmpty().withMessage('model is required'),
		body('color').isString().notEmpty().withMessage('color is required'),
	];

	static loanAddress = [param('name').isString().optional()];
}
