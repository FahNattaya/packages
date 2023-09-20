import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProductMaster, IProducts } from '../src/interfaces/stock.interface';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import { mockAllBrandsData, mockAllProductsData, mockAllSubProductsData } from '../src/mock/mock.data.product';
import { ProductMasterModel } from '../src/models/product.model';
import router, { mapProductMaster, updateHandsetMaster } from '../src/modules/product/product.route';

const app = express();
const mock = new MockAdapter(axios);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

describe('product data updating batch', () => {
	describe('mapProductMaster', () => {
		it('should map data to expect body', async () => {
			const locationCode = '1100';
			mock
				.onGet(`https://dev-mychannel.cdc.ais.th/api/device-sales/v1/product/all-brands/${locationCode}`)
				.reply(StatusCodes.OK, mockAllBrandsData);
			mock
				.onPost(`https://dev-mychannel.cdc.ais.th/api/device-sales/v1/product/product-by-brands`)
				.reply(StatusCodes.OK, mockAllProductsData);
			mock
				.onPost(`https://dev-mychannel.cdc.ais.th/api/device-sales/v1/product/product-detail`)
				.reply(StatusCodes.OK, mockAllSubProductsData);
			const result = await mapProductMaster();
			result.forEach((item: IProductMaster) => {
				expect(item).toMatchObject<IProductMaster>({
					brand: expect.any(String),
					products: expect.arrayContaining<IProducts>([]),
				});
			});
		});
	});

	describe('updateHandsetMaster', () => {
		const FIRST_INDEX = 0;
		const testData = [
			{
				brand: 'APPLE',
				products: [
					{
						productId: 13691868,
						brand: 'APPLE',
						name: 'IPHONEXSM512',
						model: null,
						imageUrl: '',
						itemType: null,
						flag5G: 'N',
						dv: [],
						productType: 'DEVICE',
						productSubtype: 'HANDSET',
						normalPrice: {
							min: '57900',
							max: '57900',
						},
						promotionPrice: {
							min: '55900',
							max: '57900',
						},
						subProducts: [
							{
								productId: 13691868,
								name: 'IPHONEXSM512',
								model: 'IPHONEXSM512',
								imageUrl: 'N/A',
								normalPrice: {
									min: '57900',
									max: '57900',
								},
								promotionPrice: {
									min: '55900',
									max: '57900',
								},
								detail: {
									name: 'IPHONEXSM512',
									products: [
										{
											colorName: 'GOLD',
											colorCode: 'FBD7BD',
											sku: ['NEW0APXM512-GD01', 'NEW0APXM512-GD01W'],
											images: {
												thumbnail:
													'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png',
												baseView: [
													{
														imageUrl:
															'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/content/dam/ais/en/tata-test/iphone12pormax/th-iphone_12_pro_max_gold_296x416_1.png',
													},
												],
											},
										},
										{
											colorName: 'SPACE GREY',
											colorCode: '4E4F54',
											sku: ['NEW0APXM512-SG01'],
											images: {
												thumbnail:
													'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_3.jpg',
												baseView: [
													{
														imageUrl:
															'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_3.jpg',
													},
													{
														imageUrl:
															'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-2_2.jpg',
													},
													{
														imageUrl:
															'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-3_2.jpg',
													},
												],
											},
										},
										{
											colorName: 'SILVER',
											colorCode: 'D1D3D2',
											sku: ['NEW0APXM512-SV01'],
											images: {
												thumbnail:
													'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_2.jpg',
												baseView: [
													{
														imageUrl:
															'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_2.jpg',
													},
													{
														imageUrl:
															'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-2_1.jpg',
													},
													{
														imageUrl:
															'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-3_1.jpg',
													},
												],
											},
										},
									],
								},
							},
						],
					},
				],
			},
		];
		it('should call ProductMasterModel.create with the given product master data', async () => {
			ProductMasterModel.create = jest.fn().mockResolvedValueOnce({ test: 'test' });
			await updateHandsetMaster(testData);
			expect(ProductMasterModel.create).toHaveBeenCalledWith(testData[FIRST_INDEX].products[FIRST_INDEX]);
		});
	});

	 
});
