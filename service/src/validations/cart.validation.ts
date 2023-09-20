import { body, param, query } from 'express-validator';

export class CartValidation {
	static cartListByMobileNo = [
		param('mobileNo').isLength({ min: 9 }).isString().notEmpty(),
		query('locationCode').isString().notEmpty(),
	];

	static addToCartList = [
		body('locationSource').isString().notEmpty(),
		body('locationReceipt').isString().notEmpty(),
		body('userId').isString().notEmpty(),
		body('cusNameOrder').isString().notEmpty(),
		body('soChannelType').isString().notEmpty(),
		body('soDocumentType').isString().notEmpty(),
		body('productList').isArray().notEmpty(),
		body('productList.*.soCompany').isString().optional(),
		body('productList.*.productType').isString().optional(),
		body('productList.*.productSubType').isString().optional(),
		body('productList.*.brand').isString().optional(),
		body('productList.*.model').isString().optional(),
		body('productList.*.color').isString().optional(),
		body('productList.*.qty').isString().optional(),
		body('productList.*.matCode').isString().optional(),
		body('productList.*.priceDiscountAmt').isString().optional(),
		body('productList.*.priceDiscountAmt').isString().optional(),
		body('productList.*.matAirTime').isString().optional(),
		body('productList.*.listMatFreeGoods.*.matCodeFG').isString().optional(),
		body('productList.*.listMatFreeGoods.*.qtyFG').isString().optional(),
		body('productList.*.listMatFreeGoods.*.tradeFreeGoodsId').isString().optional(),
		body('grandTotalAmt').isString().optional(),
		body('preBookingNo').isString().optional(),
		body('depositAmt').isString().optional(),
		body('reserveNo').isString().optional(),
		body('subStockDestination').isString().optional(),
		body('storeName').isString().optional(),
	];

	static validateDeleteTransaction = [
		body('transactionId').isArray().notEmpty(),
		body('soId').isString().notEmpty(),
		body('userId').isString().notEmpty(),
	];

	static createCompensation = [body('transactionId').isString().notEmpty()];
}
