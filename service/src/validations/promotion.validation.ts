import { body } from 'express-validator';

export class PromotionValidation {
	static productCrossSelling = [
		body('projectGroup').notEmpty().withMessage('projectGroup is required'),
		body('productType').notEmpty().withMessage('productType is required'),
		body('productSubType').notEmpty().withMessage('productSubType is required'),
		body('brand').notEmpty().withMessage('brand is required'),
		body('model').notEmpty().withMessage('model is required'),
	];

	static getCampaignPromotion = [
		body('locationCode').notEmpty().withMessage('locationCode is required'),
		body('saleChannels').notEmpty().withMessage('saleChannels is required'),
		body('company').notEmpty().withMessage('company is required'),
		body('brand').notEmpty().withMessage('brand is required'),
		body('model').notEmpty().withMessage('model is required'),
		body('color').notEmpty().withMessage('color is required'),
		body('productType').notEmpty().withMessage('productType is required'),
		body('productSubtype').notEmpty().withMessage('productSubtype is required'),
		body('offset').notEmpty().withMessage('offset is required'),
		body('customerGroup').optional().isString(),
		body('max').notEmpty().withMessage('max is required'),
		body('flow').notEmpty().withMessage('flow is required'),
	];

	static getTradePromotion = [
		body('locationCode').isString().notEmpty().withMessage('locationCode is required'),
		body('saleChannels').notEmpty().withMessage('saleChannels is required'),
		body('company').isString().notEmpty().withMessage('company is required'),
		body('brand').isString().notEmpty().withMessage('brand is required'),
		body('model').isString().notEmpty().withMessage('model is required'),
		body('matcode').isString().optional(),
		body('color').isString().notEmpty().withMessage('color is required'),
		body('productType').isString().notEmpty().withMessage('productType is required'),
		body('productSubtype').isString().notEmpty().withMessage('productSubtype is required'),
		body('customerGroup').isString().optional(),
		body('campaignId').isNumeric().notEmpty().withMessage('campaignId is required'),
		body('regularPrice').isNumeric().optional(),
	];

	static getPromotionShelves = [body('userId').notEmpty().withMessage('userId is required')];

	static getAllPromotionsByShelf = [
		body('userId').notEmpty().withMessage('User ID is required'),
		body('sanitizedName').notEmpty().withMessage('sanitizedName Name is required'),
	];

	static getPaymentsByCampaign = [
		body('campaignId').isString().notEmpty().withMessage('campaignId is required'),
		body('locationCode').isNumeric().notEmpty().withMessage('locationCode is required'),
		body('saleChannels').notEmpty().withMessage('saleChannels is required'),
	];
}
