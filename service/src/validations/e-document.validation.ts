import { body } from 'express-validator';

export class EDocumentValidation {
	static createEContract = [
		body('campaignName').isString().notEmpty(),
		body('locationName').isString().notEmpty(),
		body('idCard').isString().notEmpty(),
		body('titleName').isString().notEmpty(),
		body('fullName').isString().notEmpty(),
		body('mobileNumber').isString().notEmpty(),
		body('brand').isString().notEmpty(),
		body('model').isString().notEmpty(),
		body('color').isString().notEmpty(),
		body('priceIncludeVat').isString().notEmpty(),
		body('discountIncludeVat').isString().optional(),
		body('netPrice').isString().notEmpty(),
		body('contract').isNumeric().optional(),
		body('advancePay').isString().optional(),
		body('mobileCarePackageTitle').isString().optional(),
		body('condition').isString().notEmpty(),
		body('companyProduct').isString().notEmpty(),
		body('idCardType').isString().notEmpty(),
		body('payAdvance').isString().optional(),
	];

	static getDataCondition = [body('conditionCode').isString().notEmpty(), body('location').isString().optional()];
}
