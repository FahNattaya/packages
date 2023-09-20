import { body } from 'express-validator';

export class ProductPackageValidation {
	static mapQueryPromotionCurrentPack = [body('mobileNo').notEmpty(), body('language').optional()];

	static queryPromotionCurrentPack = [
		body('mobileNo').notEmpty().withMessage('mobileNo is required'),
		body('language').notEmpty().withMessage('language is required'),
	];

	static getPackagesByConditionData = [
		body('sanitizedName').notEmpty(),
		body('billingSystem').notEmpty(),
		body('location').notEmpty(),
		body('orderType').notEmpty(),
		body('productClass').notEmpty(),
		body('contractPack').notEmpty(),
	];
}
