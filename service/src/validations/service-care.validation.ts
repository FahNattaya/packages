import { body } from 'express-validator';

export class ServiceCareValidation {
	static getCarePromotionsByShelf = [
		body('productType').notEmpty().isString(),
		body('productSubType').notEmpty().isString(),
		body('productName').notEmpty().isString(),
		body('brand').notEmpty().isString(),
		body('model').notEmpty().isString(),
		body('handsetPrice').notEmpty().isString(),
		body('language').optional().isString(),
	];

	static getCarePromotionsByShelfTest = [
		body('productType').notEmpty().isString(),
		body('productSubType').notEmpty().isString(),
		body('productName').notEmpty().isString(),
		body('brand').notEmpty().isString(),
		body('model').notEmpty().isString(),
		body('handsetPrice').notEmpty().isString(),
	];
}
