import { body } from 'express-validator';

export class ProductValidation {
	static getProductDetail = [
		body('location').isString().optional(),
		body('brand').isString().notEmpty(),
		body('model').isString().notEmpty(),
		body('productSubtype').isString().notEmpty(),
		body('color').isString().optional(),
		body('productType').isString().optional(),
	];

	static queryStock = [
		body('stockType').isString().notEmpty(),
		body('locationCodeSource').isString().notEmpty(),
		body('locationCodeDest').isString(),
		body('productType').isString().notEmpty(),
		body('productSubType').isString(),
		body('subStock').isString().notEmpty(),
		body('brand').isString().notEmpty(),
		body('model').isString().notEmpty(),
	];

	static getProductsByMatrialCode = [
		body('products').notEmpty(),
		body('priceTypes').optional(),
		body('effectiveStartDate').isString().optional(),
		body('effectiveEndDate').isString().optional(),
	];

	static checkImeiDt = [
		body('locationCode').isString().notEmpty(),
		body('imei').isString().notEmpty(),
		body('checkType').isString().optional(),
		body('orderNo').isString().optional(),
	]
}
