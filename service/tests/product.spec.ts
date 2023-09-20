import axios from 'axios';
import { mockResponseProductByBrand } from '../src/mock/mock.data.product';
import { MapDtToResponse, ProductService } from '../src/modules/product/product.service';

import MockAdapter from 'axios-mock-adapter';
import { URLConfig } from '../src/config/url.config';

const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MTEwOTU1IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA5MzQwMDA2MjQiLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjg5MDQ0MTEyLCJleHAiOjk5OTk5OTk5OTl9.IYWZfvvlaBn9AhpvnWz42aLFZGdu7HbLUiSA-8VsKBI';

import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import router from '../src/modules/product/product.route';

const app = express();
const mock = new MockAdapter(axios);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

describe('findAllProductsByBrand', () => {
	const getProductByBrandUrl = `/product-by-brand`;
	const mockRequestBody = {
		brand: 'MockBrand',
		offset: 0,
		maxRow: 10,
	};
	it('should return product data based on brand and defaults', async () => {
		mock.onPost(URLConfig.getAllProduct).replyOnce(StatusCodes.OK, mockResponseProductByBrand);
		const result = await ProductService.findAllProductsByBrand(mockRequestBody);
		expect(result).toEqual(mockResponseProductByBrand);
	});

	it('should handle errors gracefully', async () => {
		mock.onPost(URLConfig.getAllProduct).networkErrorOnce();
		await expect(ProductService.findAllProductsByBrand(mockRequestBody)).rejects.toThrow();
	});

	// -- Test route
	it('should return current pack with status 200 when call route', async () => {
		ProductService.findAllProductsByBrand = jest.fn().mockResolvedValueOnce(mockResponseProductByBrand);
		const res = await request(app).post(getProductByBrandUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockResponseProductByBrand);
	});

	it("should return Can't find Data", async () => {
		ProductService.findAllProductsByBrand = jest.fn();
		const res = await request(app).post(getProductByBrandUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductService.findAllProductsByBrand = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(getProductByBrandUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});

describe('findAllProductsByBrands', () => {
	const getProductByBrandUrl = `/product-by-brands`;
	beforeEach(() => {
		console.log = jest.fn();
	});
	it('should return the expected response', async () => {
		const mockResponse = {
			products: [
				{ productId: 2, name: 'Product 2' },
				{ productId: 1, name: 'Product 1' },
			],
		};
		mock.onPost(URLConfig.getAllProduct).replyOnce(StatusCodes.OK, mockResponse);
		mock.onPost(URLConfig.getAllProduct).replyOnce(StatusCodes.OK, mockResponse);
		const mockRequestData = {
			brands: ['Brand1', 'Brand2'],
			offset: '0',
			maxRow: '10',
			productType: ['DEVICE'],
			productSubtype: ['HANDSET', 'HANDSET BUNDLE'],
		};
		const result = await ProductService.findAllProductsByBrands(mockRequestData);
		const expectedOutput = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: [
				{
					brand: 'Brand1',
					products: mockResponse.products,
				},
				{
					brand: 'Brand2',
					products: mockResponse.products,
				},
			],
		};
		expect(result).toEqual(expectedOutput);
		expect(result.data[0].products[0].productId).toEqual(2);
		expect(result.data[0].products[1].productId).toEqual(1);
	});

	it('should throw an error when axios.post fails', async () => {
		mock.onPost(URLConfig.getAllProduct).networkErrorOnce();
		const mockRequestData = {
			brands: ['Brand1'],
			offset: '0',
			maxRow: '10',
			productType: ['DEVICE'],
			productSubtype: ['HANDSET'],
		};
		await expect(ProductService.findAllProductsByBrands(mockRequestData)).rejects.toThrow();
	});

	// -- Test route
	const mockRequestBody = {
		brands: ['Brand1', 'Brand2'],
		offset: '0',
		maxRow: '10',
		productType: ['DEVICE'],
		productSubtype: ['HANDSET', 'HANDSET BUNDLE'],
	};
	it('should return current pack with status 200 when call route', async () => {
		const mockResponse = {
			products: [
				{ productId: 2, name: 'Product 2' },
				{ productId: 1, name: 'Product 1' },
			],
		};
		ProductService.findAllProductsByBrands = jest.fn().mockResolvedValueOnce(mockResponse);
		const res = await request(app).post(getProductByBrandUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockResponse);
	});

	it("should return Can't find Data", async () => {
		ProductService.findAllProductsByBrands = jest.fn();
		const res = await request(app).post(getProductByBrandUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductService.findAllProductsByBrands = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(getProductByBrandUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});

describe('get product detail', () => {
	const getProductDetailUrl = `/product-detail`;
	it('should return value', async () => {
		const reqbody = {
			location: '1100',
			brand: 'APPLE',
			model: 'IP12_128GB',
			color: 'BLUE',
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
		};

		const mockReturn = {
			products: [],
		};

		mock.onPost(URLConfig.getProductDetail).replyOnce(StatusCodes.OK, mockReturn);

		const productDetail = await ProductService.getProductDetail(reqbody);
		expect(productDetail).toMatchObject({ products: [] });
	});

	it('should return response.request data if response data = false', async () => {
		const reqbody = {
			location: '1100',
			brand: 'APPLE',
			model: 'IP12_128GB',
			color: 'BLUE',
			productType: 'DEVICE',
			productSubtype: 'HANDSET',
		};

		mock.onPost(URLConfig.getProductDetail).replyOnce(StatusCodes.OK, undefined);

		const result = await ProductService.getProductDetail(reqbody);
		expect(result).toBeUndefined();
	});

	it('should catch an error', async () => {
		mock.onPost(URLConfig.getProductDetail).networkErrorOnce();
		expect(ProductService.getProductDetail({})).rejects.toThrow();
	});

	// -- Test route
	const mockRequestBody = {
		location: '1100',
		brand: 'APPLE',
		model: 'IP12_128GB',
		color: 'BLUE',
		productType: 'DEVICE',
		productSubtype: 'HANDSET',
	};
	it('should return current pack with status 200 when call route', async () => {
		const mockReturn = {
			products: [],
		};
		ProductService.getProductDetail = jest.fn().mockResolvedValueOnce(mockReturn);
		const res = await request(app).post(getProductDetailUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockReturn);
	});

	it("should return Can't find Data", async () => {
		ProductService.getProductDetail = jest.fn();
		const res = await request(app).post(getProductDetailUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductService.getProductDetail = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(getProductDetailUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});

describe('Stock Response', () => {
	const queryStockOmniUrl = `/query-stock-omni`;

	beforeEach(() => {
		console.log = jest.fn();
		jest.clearAllMocks();
	});

	it('test invalid input returns error response', async () => {
		mock.onPost(URLConfig.queryStockOMNI).networkErrorOnce();
		expect(ProductService.queryStock({} as any, {})).rejects.toThrow();
	});

	it('test empty stock data return empty list', async () => {
		const expected = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			listData: [],
		};

		mock.onPost(URLConfig.queryStockOMNI).replyOnce(StatusCodes.OK, {});

		const result = await ProductService.queryStock({} as any, {});
		expect(result).toEqual(expected);
	});

	// -- Test route
	const mockRequestBody = {
		stockType: 'string',
		locationCodeSource: 'string',
		locationCodeDest: 'string',
		productType: 'string',
		productSubType: 'string',
		subStock: 'string',
		brand: 'string',
		model: 'string',
	};

	// -- Test route
	it('should return current pack with status 200 when call route', async () => {
		const mockResData = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			listData: [],
		};
		ProductService.queryStock = jest.fn().mockResolvedValueOnce(mockResData);
		const res = await request(app).post(queryStockOmniUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
	});

	it("should return Can't find Data", async () => {
		ProductService.queryStock = jest.fn();
		const res = await request(app).post(queryStockOmniUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductService.queryStock = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(queryStockOmniUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});

describe('MapDtToResponse', () => {
	it('should map response data to the expected format', () => {
		const mockResponse = {
			data: {
				listData: [
					{
						locationCode: 'LOC1',
						locationName: 'Location 1',
						brand: 'Brand 1',
						model: 'Model 1',
						productName: 'Product 1',
						productType: 'Type 1',
						productSubType: 'Subtype 1',
						company: 'Company 1',
						stockAval: '10',
						color: 'Color 1',
					},
				],
			},
		};
		const mappedResult = MapDtToResponse(mockResponse);
		const expectedMappedResult = [
			{
				locationCode: 'LOC1',
				locationName: 'Location 1',
				productStock: [
					{
						brand: 'Brand 1',
						model: 'Model 1',
						productName: 'Product 1',
						productType: 'Type 1',
						productSubType: 'Subtype 1',
						company: 'Company 1',
						totalStockAval: 10,
						colorStock: [{ color: 'Color 1', stockAval: 10 }],
					},
				],
			},
		];
		expect(mappedResult).toEqual(expectedMappedResult);
	});
});

describe('getProductsByMaterialCode', () => {
	// -- Test service
	const getProductByMatCodeUrl = `/product-by-matcode`;
	const mockRequest: any = {
		products: [
			{
				company: 'AWN',
				materialCode: 'NEW0APXM256-GD01',
			},
		],
	};
	const mockResponse = {
		products: [
			{
				materialCode: 'NEW0APXM256-GD01',
				prices: [
					{
						priceType: 'EUP',
						priceIncludeVat: 6420,
						priceExcludeVat: 6000,
						vatRate: '7.00',
						vatAmount: 420,
						effectiveDate: '2023-02-15T09:22:00.000Z',
					},
				],
			},
		],
	};

	it('should return products from the response data', async () => {
		mock.onPost(URLConfig.getProductsByMaterialCode).replyOnce(StatusCodes.OK, mockResponse);
		const result = await ProductService.productsByMaterialCode(mockRequest);
		expect(result).toEqual({
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: mockResponse.products,
		});
	});

	it('should handle error case when empty response.data.products', async () => {
		const mockRequest: any = {
			products: [
				{
					company: 'AWN',
					materialCode: 'NEW0APXM256-GD01',
				},
			],
		};
		const mockResponse = {
			statusCode: '20000',
			statusDesc: 'Success',
			data: {
				products: [],
			},
		};

		axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
		try {
			await ProductService.productsByMaterialCode(mockRequest);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual(
				JSON.stringify({
					resultCode: 'MCS027-6-500-7-undefined',
					resultDescription: 'cpc getProductsByMatetrialCode [Empty response data]',
					developerMessage: 'cpc getProductsByMatetrialCode [Empty response data]',
					Error: 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้',
				}),
			);
		}
	});

	it('should throw an error when response data is empty', async () => {
		mock.onPost(URLConfig.getProductsByMaterialCode).replyOnce(StatusCodes.OK, undefined);

		await expect(ProductService.productsByMaterialCode(mockRequest)).rejects.toThrow();
	});

	it('should throw an error when axios.post throws an error', async () => {
		mock.onPost(URLConfig.getProductsByMaterialCode).networkErrorOnce();
		await expect(ProductService.productsByMaterialCode(mockRequest)).rejects.toThrow();
	});

	// -- Test route
	it('should return current pack with status 200 when call route', async () => {
		const mockResData = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: mockResponse.products,
		};
		ProductService.productsByMaterialCode = jest.fn().mockResolvedValueOnce(mockResData);
		const res = await request(app).post(getProductByMatCodeUrl).send(mockRequest).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockResData);
	});

	it("should return Can't find Data", async () => {
		ProductService.productsByMaterialCode = jest.fn();
		const res = await request(app).post(getProductByMatCodeUrl).send(mockRequest).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductService.productsByMaterialCode = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(getProductByMatCodeUrl).send(mockRequest).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});

describe('POST /imei-dt', () => {
	const checkImeiDtUrl = `/imei-dt`;
	it('should return a successful response when status is "S"', async () => {
		const mockBody = {
			locationCode: '1006021',
			imei: '100602024073351',
		};
		const mockHeaders = {};
		const mockResponseData = {
			status: 'S',
		};
		const mockResponse = {
			status: 200,
			data: mockResponseData,
		};
		axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
		const result = await ProductService.imeiDt(mockBody, mockHeaders);
		expect(result).toEqual({
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: mockResponseData,
		});
	});

	it('should throw an error when the axios call fails', async () => {
		axios.post = jest.fn().mockRejectedValueOnce(new Error('Axios Error'));

		const requestBody = {
			locationCode: '1006021',
			imei: '100602024073351',
		};
		const headers = {};

		await expect(ProductService.imeiDt(requestBody, headers)).rejects.toThrowError('Axios Error');

		expect(axios.post).toHaveBeenCalledWith(expect.any(String), requestBody, expect.any(Object));
	});

	it('should handle error case when response.data.status is not "S"', async () => {
		const responseData = {
			status: 'Error',
			message: 'Error message',
		};
		const requestBody = {
			locationCode: '1006021',
			imei: '100602024073351',
		};
		const headers = {};

		axios.post = jest.fn().mockResolvedValueOnce({ data: responseData });
		try {
			await ProductService.imeiDt(requestBody, headers);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual(
				JSON.stringify({
					resultCode: 'MCS027-9-500-7-Error',
					resultDescription: 'dt checkSerial [Error message]',
					developerMessage: 'dt checkSerial [Error message]',
					Error: 'ไม่พบข้อมูล IMEI ในระบบ',
				}),
			);
		}
	});

	const mockRequestBody = {
		locationCode: '1006021',
		imei: '100602024083596',
	};

	// -- Test route
	it('should return current pack with status 200 when call route', async () => {
		const mockResponseData = {
			status: 'S',
		};
		const mockResData = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: mockResponseData,
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockResData);
		const res = await request(app).post(checkImeiDtUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockResData);
	});

	it("should return Can't find Data", async () => {
		ProductService.imeiDt = jest.fn();
		const res = await request(app).post(checkImeiDtUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductService.imeiDt = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(checkImeiDtUrl).send(mockRequestBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});

describe('brandModelByIMEI', () => {
	const brandModelByImeiUrl = `/brand-model-by-imei`;
	const mockIMEI = '123456789012345';
	const mockResponse = {
		data: {
			responseHeader: {
				resultCode: 'test',
				resultDesc: 'test01',
			},
			resourceItemList: [
				{
					outputDetailList: [
						{
							brandCode: 'VIVO',
							brandName: 'VIVO',
							modelCode: 'V5',
							modelName: 'V5',
							statusIMEI: 'Available',
							'digitsFlag ': 'N',
						},
					],
				},
			],
		},
	};
	// -- Test service
	it('should return brand and model data for a given IMEI', async () => {
		axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
		await ProductService.brandModelByIMEI(mockIMEI);
		expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({}));
	});

	it('should throw standard error if pgz return Dummy data', async () => {
		const mockIMEI = '123456789012345';
		const mockResponseData = {
			responseHeader: {
				resultCode: '20000',
				resultDesc: 'Success',
				message: 'Success',
			},
			resourceItemList: [
				{
					outputDetailList: [
						{
							brandCode: 'DummyBrand',
							brandName: 'DummyBrand',
							'modelCode ': 'DummyModel',
							'modelName ': 'DummyModel',
							statusIMEI: 'IMEI is not found in sff_handset',
							'digitsFlag ': 'N',
						},
					],
				},
			],
		};
		const mockResponse = {
			status: 200,
			data: mockResponseData,
		};
		axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
		try {
			await ProductService.brandModelByIMEI(mockIMEI);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual(
				JSON.stringify({
					resultCode: 'MCS027-52-500-45-20000',
					resultDescription:
						'phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is not found in sff_handset]',
					developerMessage:
						'phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is not found in sff_handset]',
					Error: 'ไม่พบข้อมูล IMEI ในระบบ',
				}),
			);
		}
	});

	it('should throw standard error if pgz return digitsFlas Y', async () => {
		const mockIMEI = '123456789012345';
		const mockResponseData = {
			responseHeader: {
				resultCode: '20000',
				resultDesc: 'Success',
				message: 'Success',
			},
			resourceItemList: [
				{
					outputDetailList: [
						{
							brandCode: 'VIVO',
							brandName: 'VIVO',
							'modelCode ': 'VIVO',
							'modelName ': 'VIVO',
							statusIMEI: 'Available',
							'digitsFlag ': 'Y',
						},
					],
				},
			],
		};
		const mockResponse = {
			status: 200,
			data: mockResponseData,
		};
		axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
		try {
			await ProductService.brandModelByIMEI(mockIMEI);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual(
				JSON.stringify({
					resultCode: 'MCS027-52-500-45-20000',
					resultDescription:
						'phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is not found in sff_handset]',
					developerMessage:
						'phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is not found in sff_handset]',
					Error: 'ไม่พบข้อมูล IMEI ในระบบ',
				}),
			);
		}
	});

	it('should throw standard error if statusIMEI is not Available', async () => {
		const mockIMEI = '123456789012345';
		const mockResponseData = {
			responseHeader: {
				resultCode: '20000',
				resultDesc: 'Success',
				message: 'Success',
			},
			resourceItemList: [
				{
					outputDetailList: [
						{
							brandCode: 'VIVO',
							brandName: 'VIVO',
							modelCode: 'V5',
							modelName: 'V5',
							statusIMEI: 'Registered',
							digitsFlag: 'N',
						},
					],
				},
			],
		};
		const mockResponse = {
			status: 200,
			data: mockResponseData,
		};
		axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
		try {
			await ProductService.brandModelByIMEI(mockIMEI);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual(
				JSON.stringify({
					resultCode: 'MCS027-52-500-45-20000',
					resultDescription: 'phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is Registered]',
					developerMessage: 'phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is Registered]',
					Error: 'ไม่พบข้อมูล IMEI ในระบบ',
				}),
			);
		}
	});

	it('should throw an error when axios.post throws an error', async () => {
		const mockIMEI = '123456789012345';
		const mockError = new Error('Network error');
		axios.post = jest.fn().mockRejectedValue(mockError);
		await expect(ProductService.brandModelByIMEI(mockIMEI)).rejects.toThrowError(mockError);
	});

	// -- Test route
	it('should return current pack with status 200 when call route', async () => {
		const mockResData = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: mockResponse.data.resourceItemList[0].outputDetailList[0],
		};
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockResData);
		const res = await request(app).post(brandModelByImeiUrl).send(mockIMEI).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockResData);
	});

	it('should handle when error accured', async () => {
		ProductService.brandModelByIMEI = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(brandModelByImeiUrl).send(mockIMEI).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});

describe('checkImei', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	const mockBody = {
		locationCode: '1006021',
		imei: '100602024083596',
	};
	const mockHeaders = {};
	const checkImeiUrl = `/check-imei`;
	const mockIscartPage = false;
	it('should return correct response for valid IMEI and matcode non-AIS if DT return price', async () => {
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'MATCODE_NON_AIS',
				price: '6420',
				priceExc: '6000',
				priceVatAmt: '420',
				statusIMEI: 'Available',
			},
		};
		const mockImeiPegasusResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				brandName: 'Brand 1',
				modelCode: 'Model 1',
				statusIMEI: 'Available',
			},
		};
		const mockProductsByMaterialCodeResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: [
				{
					materialCode: 'MATCODE_NON_AIS',
					prices: [
						{
							priceType: 'EUP',
							priceIncludeVat: 6420,
						},
					],
				},
			],
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockImeiPegasusResponse);
		ProductService.productsByMaterialCode = jest.fn().mockResolvedValueOnce(mockProductsByMaterialCodeResponse);
		const result = await ProductService.checkImei(mockBody, mockHeaders, mockIscartPage);
		expect(result).toEqual({
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: mockImeiDtResponse.data.status,
				brand: mockImeiDtResponse.data.brand,
				model: mockImeiDtResponse.data.model,
				color: mockImeiDtResponse.data.color,
				company: mockImeiDtResponse.data.company,
				matcode: mockImeiDtResponse.data.matcode,
				price: Number(mockImeiDtResponse.data.priceExc) + Number(mockImeiDtResponse.data.priceVatAmt),
				statusIMEI: mockImeiPegasusResponse.data.statusIMEI,
			},
		});
		expect(ProductService.imeiDt).toHaveBeenCalledWith(mockBody, mockHeaders);
		expect(ProductService.brandModelByIMEI).toHaveBeenCalledWith(mockBody.imei);
	});

	it('should return correct response for valid IMEI and matcode non-AIS if DT not return price', async () => {
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'MATCODE_NON_AIS',
				statusIMEI: 'Available',
			},
		};
		const mockImeiPegasusResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				brandName: 'Brand 1',
				modelCode: 'Model 1',
				statusIMEI: 'Available',
			},
		};
		const mockProductsByMaterialCodeResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: [
				{
					materialCode: 'MATCODE_NON_AIS',
					prices: [
						{
							priceType: 'EUP',
							priceIncludeVat: 6420,
						},
					],
				},
			],
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockImeiPegasusResponse);
		ProductService.productsByMaterialCode = jest.fn().mockResolvedValueOnce(mockProductsByMaterialCodeResponse);
		const result = await ProductService.checkImei(mockBody, mockHeaders, mockIscartPage);
		expect(result).toEqual({
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: mockImeiDtResponse.data.status,
				brand: mockImeiDtResponse.data.brand,
				model: mockImeiDtResponse.data.model,
				color: mockImeiDtResponse.data.color,
				company: mockImeiDtResponse.data.company,
				matcode: mockImeiDtResponse.data.matcode,
				statusIMEI: mockImeiPegasusResponse.data.statusIMEI,
			},
		});
		expect(ProductService.imeiDt).toHaveBeenCalledWith(mockBody, mockHeaders);
		expect(ProductService.brandModelByIMEI).toHaveBeenCalledWith(mockBody.imei);
	});

	it('should return correct response when matcode is not MATCODE_NON_AIS from cart page', async () => {
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'OTHER_MATCODE',
			},
		};

		const mockImeiPegasusResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				brandName: 'Brand 1',
				modelCode: 'Model 1',
				statusIMEI: 'Available',
			},
		};

		const mockProductsByMaterialCodeResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: [
				{
					materialCode: 'OTHER_MATCODE',
					prices: [
						{
							priceType: 'EUP',
							priceIncludeVat: 8000,
						},
					],
				},
			],
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockImeiPegasusResponse);
		ProductService.productsByMaterialCode = jest.fn().mockResolvedValueOnce(mockProductsByMaterialCodeResponse);
		const result = await ProductService.checkImei(mockBody, mockHeaders, mockIscartPage);
		expect(result).toEqual({
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: mockImeiDtResponse.data.status,
				brand: mockImeiDtResponse.data.brand,
				model: mockImeiDtResponse.data.model,
				color: mockImeiDtResponse.data.color,
				company: mockImeiDtResponse.data.company,
				matcode: mockImeiDtResponse.data.matcode,
				price: mockProductsByMaterialCodeResponse.data[0].prices[0].priceIncludeVat,
				statusIMEI: mockImeiPegasusResponse.data.statusIMEI,
			},
		});
		expect(ProductService.imeiDt).toHaveBeenCalledWith(mockBody, mockHeaders);
		expect(ProductService.brandModelByIMEI).toHaveBeenCalledWith(mockBody.imei);
		expect(ProductService.productsByMaterialCode).toHaveBeenCalledWith({
			products: [
				{
					company: mockImeiDtResponse.data.company,
					materialCode: mockImeiDtResponse.data.matcode,
				},
			],
		});
	});
	it('should return correct response when matcode is not MATCODE_NON_AIS from handset page', async () => {
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'OTHER_MATCODE',
			},
		};

		const mockImeiPegasusResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				brandName: 'Brand 1',
				modelCode: 'Model 1',
				statusIMEI: 'Available',
			},
		};
		const mockIsHandsetPage = true;
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockImeiPegasusResponse);
		const result = await ProductService.checkImei(mockBody, mockHeaders, mockIsHandsetPage);
		expect(result).toEqual({
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: mockImeiDtResponse.data.status,
				brand: mockImeiDtResponse.data.brand,
				model: mockImeiDtResponse.data.model,
				color: mockImeiDtResponse.data.color,
				company: mockImeiDtResponse.data.company,
				matcode: mockImeiDtResponse.data.matcode,
				statusIMEI: mockImeiPegasusResponse.data.statusIMEI,
			},
		});
		expect(ProductService.imeiDt).toHaveBeenCalledWith(mockBody, mockHeaders);
		expect(ProductService.brandModelByIMEI).toHaveBeenCalledWith(mockBody.imei);
	});

	it('should throw an error when Empty response product data', async () => {
		const mockHeaders = {};
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'OTHER_MATCODE',
			},
		};
		const mockImeiPegasusResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				brandName: 'Brand 1',
				modelCode: 'Model 1',
				statusIMEI: 'Available',
			},
		};
		const mockProductsByMaterialCodeResponse = {
			success: false,
			name: 'standard error',
			message:
				'{"resultCode":"MCS027-6-500-7-20000","resultDescription":"cpc getProductsByMatetrialCode [Empty response data]","developerMessage":"cpc getProductsByMatetrialCode [Empty response data]","Error":"ไม่พบข้อมูล IMEI ในระบบ"}',
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockImeiPegasusResponse);
		ProductService.productsByMaterialCode = jest.fn().mockResolvedValueOnce(mockProductsByMaterialCodeResponse);
		try {
			await ProductService.checkImei(mockBody, mockHeaders, mockIscartPage);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual({
				success: false,
				name: 'standard error',
				message:
					'{"resultCode":"MCS027-6-500-7-20000","resultDescription":"cpc getProductsByMatetrialCode [Empty response data]","developerMessage":"cpc getProductsByMatetrialCode [Empty response data]","Error":"ไม่พบข้อมูล IMEI ในระบบ"}',
			});
		}
	});

	it('should throw an error when imei data from DT and Pegasus not match', async () => {
		const mockHeaders = {};
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'OTHER_MATCODE',
			},
		};
		const mockImeiPegasusResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				brandName: 'Brand 2',
				modelCode: 'Model 2',
				statusIMEI: 'Available',
			},
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockImeiPegasusResponse);
		await expect(ProductService.checkImei(mockBody, mockHeaders, mockIscartPage)).rejects.toThrowError(
			'Data from DT and PGZ is not match',
		);
	});

	it('should throw an error when failed to get imei from Pegasus', async () => {
		const mockHeaders = {};
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'OTHER_MATCODE',
			},
		};
		const mockImeiPegasusResponse = {
			success: false,
			name: 'standard error',
			message:
				'{"resultCode":"MCS027-52-500-45-20000","resultDescription":"phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is Registered]","developerMessage":"phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is Registered]","Error":"ไม่พบข้อมูล IMEI ในระบบ"}',
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		ProductService.brandModelByIMEI = jest.fn().mockResolvedValueOnce(mockImeiPegasusResponse);
		try {
			await ProductService.checkImei(mockBody, mockHeaders, mockIscartPage);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual({
				success: false,
				name: 'standard error',
				message:
					'{"resultCode":"MCS027-52-500-45-20000","resultDescription":"phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is Registered]","developerMessage":"phx-pgzinv PGZInventory/synchronous/ServiceProvisioning [IMEI is Registered]","Error":"ไม่พบข้อมูล IMEI ในระบบ"}',
			});
		}
	});

	it('should throw an error when failed to get imei from DT', async () => {
		const mockHeaders = {};
		const mockImeiDtResponse = {
			success: false,
			name: 'standard error',
			message:
				'{"resultCode":"MCS027-9-500-7-F","resultDescription":"dt checkSerial [ORA-20102: IMEI ไม่ถูกต้อง (Data Not found in WDS,AWN)]","developerMessage":"dt checkSerial [ORA-20102: IMEI ไม่ถูกต้อง (Data Not found in WDS,AWN)]","Error":"ไม่พบข้อมูล IMEI ในระบบ"}',
		};
		ProductService.imeiDt = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		try {
			await ProductService.checkImei(mockBody, mockHeaders, mockIscartPage);
		} catch (error: any) {
			expect(error.name).toBe('standard error');
			expect(error.message).toEqual({
				success: false,
				name: 'standard error',
				message:
					'{"resultCode":"MCS027-9-500-7-F","resultDescription":"dt checkSerial [ORA-20102: IMEI ไม่ถูกต้อง (Data Not found in WDS,AWN)]","developerMessage":"dt checkSerial [ORA-20102: IMEI ไม่ถูกต้อง (Data Not found in WDS,AWN)]","Error":"ไม่พบข้อมูล IMEI ในระบบ"}',
			});
		}
	});

	// -- Test route
	it('should return current pack with status 200 when call route', async () => {
		const mockImeiDtResponse = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: {
				status: 'ACTIVE',
				brand: 'Brand 1',
				model: 'Model 1',
				color: 'Black',
				company: 'AWN',
				matcode: 'OTHER_MATCODE',
			},
		};
		ProductService.checkImei = jest.fn().mockResolvedValueOnce(mockImeiDtResponse);
		const res = await request(app).post(checkImeiUrl).send(mockBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(mockImeiDtResponse);
	});

	it("should return Can't find Data", async () => {
		ProductService.checkImei = jest.fn();
		const res = await request(app).post(checkImeiUrl).send(mockBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle when error accured', async () => {
		ProductService.checkImei = jest.fn().mockRejectedValueOnce(new Error('can not find data'));
		const res = await request(app).post(checkImeiUrl).send(mockBody).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'can not find data', name: 'Error', success: false });
	});
});
