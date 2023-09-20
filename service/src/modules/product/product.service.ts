import axios from 'axios';
import moment from 'moment';
import { getProductsByMaterialCodeReq, imeiCartRes, imeiDtReq } from 'src/interfaces/product.interface';
import { URLConfig } from '../../config/url.config';
import {
	IdtStockResponseData,
	IProductsByBrandRequest,
	IProductsByBrandResponse,
	IProductStockResponse,
	IStock,
	IStockResponse,
} from '../../interfaces/stock.interface';
import { createStandardErrorResponse } from '../../middleware/apiResponses.middleware';
import { IProductMaster, ProductMasterModel } from '../../models/product.model';

export class ProductService {
	static async findAllBrands(locationCode: string): Promise<any> {
		// const headers = { 'x-authorization': `Bearer ${process.env.LOCAL_CPC_TOKEN}` };
		const data = { location: locationCode };
		// const getAllBrandOfProducturl = `${process.env.LOCAL_CPC_URL}/service/salesportal/api/brands-of-product`;
		try {
			const response = await axios.post(URLConfig.getAllBrandOfProduct, data);
			if (!response.data) {
				throw Error('Empty response data');
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async findAllProductsByBrand(body: any): Promise<any> {
		const data = {
			brand: body.brand,
			offset: body.offset,
			maxRow: body.maxRow,
			productType: body.productType ? body.productType : ['DEVICE'],
			productSubtype: body.productSubtype ? body.productSubtype : ['HANDSET', 'HANDSET BUNDLE'],
		};
		try {
			const response = await axios.post(URLConfig.getAllProduct, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async findAllProductsByBrands(body: IProductsByBrandRequest): Promise<IProductsByBrandResponse> {
		const data = await Promise.all(
			body.brands.map(async (brand: string) => {
				const reqData = {
					brand: brand,
					offset: body.offset,
					maxRow: body.maxRow,
					location: body.location,
					productType: body.productType ? body.productType : ['DEVICE'],
					productSubtype: body.productSubtype ? body.productSubtype : ['HANDSET', 'HANDSET BUNDLE'],
				};
				try {
					const response = await axios.post(URLConfig.getAllProduct, reqData);

					const uniqueNameProducts: { [nameKey: string]: any } = {};
					response.data.products.forEach((product: any) => {
						const nameKey = product.name;
						if (!uniqueNameProducts[nameKey] || uniqueNameProducts[nameKey].productId < product.productId) {
							uniqueNameProducts[nameKey] = product;
						}
					});

					const filteredProducts = Object.values(uniqueNameProducts);

					filteredProducts.sort((a, b) => b.productId - a.productId);

					return {
						brand: brand,
						products: filteredProducts,
					};
				} catch (error) {
					throw error;
				}
			}),
		);
		return {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: data,
		};
	}

	static async searchProductsByKeyword(keyword: string): Promise<any> {
		try {
			const regEx = new RegExp(keyword.replace(/\s+/gi, ' ').trim(), 'i');
			const cursor = await ProductMasterModel.find(
				{
					$or: [
						{ name: regEx },
						{ brand: regEx },
						{ 'subProducts.name': regEx },
						{ 'subProducts.model': regEx },
						{ 'subProducts.sanitizedName': regEx },
					],
				},
				{ _id: false },
			).exec();

			return {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
				data: this.mapSearchedProduct(cursor.map((d) => d.toObject())),
			};
		} catch (error) {
			throw error;
		}
	}

	static mapSearchedProduct(products: IProductMaster[]) {
		const mapped: { [key: string]: any } = {};

		for (const doc of products) {
			if (!(doc.brand in mapped)) mapped[doc.brand] = [];
			doc.subProducts.forEach((d: any) => {
				d.colors = d.detail.products;
				d.image = d.detail.products.find((color: any) => color.images.thumbnail);
				d.image = d.image && d.image.images.thumbnail;
				delete d.detail;
			});

			mapped[doc.brand].push(doc);
		}

		return Object.entries(mapped).map((v) => ({ brand: v[0], products: v[1] }));
	}

	static async getProductDetail(model: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getProductDetail, model);
			if (response.data) {
				delete response.data['brand'];
				delete response.data['model'];
				delete response.data['productType'];
				delete response.data['productType'];
				delete response.data['dv'];
				return response.data;
			} else {
				return response.request['data'];
			}
		} catch (error) {
			throw error;
		}
	}

	static async productsByMaterialCode(body: getProductsByMaterialCodeReq): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getProductsByMaterialCode, body, {
				headers: {
					authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRLZXkiOiJUbTFSUmtWTGNGVkRaRFV5YlZGaGIwOHpSM2Q1WnowOUxtMTVMV05vWVc1dVpXd3RhMlY1IiwiY2xpZW50S2V5IjoibXktY2hhbm5lbC1rZXkiLCJpYXQiOjE2OTIyNjc3NDMsImV4cCI6OTk5OTk5OTk5OX0.rej9z-w2cbAhBR0SF3rPsmMFGPvGqfGRZBIpaAj62z0`,
				},
			});
			if (response.data.products && response.data.products.length > 0) {
				return {
					resultCode: '20000',
					resultDescription: 'Success',
					developerMessage: 'Success',
					data: response.data.products,
				};
			}
			const errorResponse = createStandardErrorResponse({
				errorCode: response.data.statusCode,
				httpStatus: 500,
				description: 'Empty response data',
				nodeNo: '6',
				apiNo: '7',
				nodeName: 'cpc',
				apiName: 'getProductsByMatetrialCode',
				errorDescription: 'Empty response data',
			});
			throw errorResponse;
		} catch (error) {
			throw error;
		}
	}

	static async queryStock(body: IStock, headers: any): Promise<any> {
		let result: Array<IStockResponse> = [];
		try {
			const response = await axios.post(URLConfig.queryStockOMNI, body, headers);
			result = MapDtToResponse(response);
			return {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
				listData: result,
			};
		} catch (error) {
			throw error;
		}
	}

	static async imeiDt(body: imeiDtReq, headers: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.imeiDT, body, headers);

			if (response.data) {
				if (response.data.status && response.data.status != 'S') {
					const responseMap = {
						errorCode: response.data.status,
						httpStatus: 500,
						description: response.data.message,
						nodeNo: '9',
						apiNo: '7',
						nodeName: 'dt',
						apiName: 'checkSerial',
						errorDescription: response.data.message,
						errorMessage: 'ไม่พบข้อมูล IMEI ในระบบ',
					};
					const caseError = createStandardErrorResponse(responseMap);
					throw caseError;
				}
				return {
					resultCode: '20000',
					resultDescription: 'Success',
					developerMessage: 'Success',
					data: response.data,
				};
			}
		} catch (error) {
			throw error;
		}
	}

	static async brandModelByIMEI(imei: string): Promise<any> {
		const resourceGroupId = 'evIVQueryBrandModelByIMEI_' + moment().format('YYYYMMDDHHmmSSSss');
		const reqBody = {
			requestHeader: {
				resourceGroupId: resourceGroupId,
				userSys: 'MYCHANNEL',
				reTransmit: '0',
			},
			resourceItemList: [
				{
					resourceName: 'evIVQueryBrandModelByIMEI',
					userId: 'MYCHANNEL',
					imei: imei,
				},
			],
		};
		try {
			const response: any = await axios.post(URLConfig.pgzServiceProvision, reqBody);
			const dataResponseMap = {
				errorCode: response.data.responseHeader.resultCode,
				httpStatus: 500,
				description: response.data.responseHeader.resultDesc,
				nodeNo: '52',
				apiNo: '45',
				nodeName: 'phx-pgzinv',
				apiName: 'PGZInventory/synchronous/ServiceProvisioning',
				errorDescription: response.data.responseHeader.resultDesc,
				errorMessage: 'ไม่พบข้อมูล IMEI ในระบบ',
			};
			if (response.data.resourceItemList && response.data.resourceItemList.length > 0) {
				if (
					response.data.resourceItemList[0].outputDetailList &&
					response.data.resourceItemList[0].outputDetailList.length > 0
				) {
					if (
						response.data.resourceItemList[0].outputDetailList[0].brandCode != 'DummyBrand' &&
						response.data.resourceItemList[0].outputDetailList[0].statusIMEI == 'Available' &&
						response.data.resourceItemList[0].outputDetailList[0]['digitsFlag '] == 'N'
					) {
						return {
							resultCode: '20000',
							resultDescription: 'Success',
							developerMessage: 'Success',
							data: {
								brandCode: response.data.resourceItemList[0].outputDetailList[0].brandCode,
								brandName: response.data.resourceItemList[0].outputDetailList[0].brandName,
								modelCode: response.data.resourceItemList[0].outputDetailList[0]['modelCode '],
								modelName: response.data.resourceItemList[0].outputDetailList[0]['modelName '],
								statusIMEI: response.data.resourceItemList[0].outputDetailList[0].statusIMEI,
								digitsFlag: response.data.resourceItemList[0].outputDetailList[0]['digitsFlag '],
							},
						};
					}
					dataResponseMap.description = response.data.resourceItemList[0].outputDetailList[0].statusIMEI;
					dataResponseMap.errorDescription = response.data.resourceItemList[0].outputDetailList[0].statusIMEI;
					if (
						response.data.resourceItemList[0].outputDetailList[0].brandCode != 'DummyBrand' &&
						response.data.resourceItemList[0].outputDetailList[0].statusIMEI != 'Available'
					) {
						dataResponseMap.description = 'IMEI is ' + response.data.resourceItemList[0].outputDetailList[0].statusIMEI;
						dataResponseMap.errorDescription =
							'IMEI is ' + response.data.resourceItemList[0].outputDetailList[0].statusIMEI;
					}
					if (
						response.data.resourceItemList[0].outputDetailList[0].statusIMEI == 'Available' &&
						response.data.resourceItemList[0].outputDetailList[0]['digitsFlag '] == 'Y'
					) {
						dataResponseMap.description = 'IMEI is not found in sff_handset';
						dataResponseMap.errorDescription = 'IMEI is not found in sff_handset'
					}
				}
			}
			const caseError = createStandardErrorResponse(dataResponseMap);
			throw caseError;
		} catch (error) {
			throw error;
		}
	}

	static async checkImei(body: imeiDtReq, headers: any, isCartPage: boolean): Promise<imeiCartRes> {
		try {
			const imeiDT = await ProductService.imeiDt(body, headers);
			if (imeiDT.resultDescription == 'Success') {
				const imeiPegasus = await ProductService.brandModelByIMEI(body.imei);
				if (imeiPegasus.resultDescription == 'Success') {
					if (imeiDT.data.brand == imeiPegasus.data.brandName && imeiDT.data.model == imeiPegasus.data.modelCode) {
						const response: imeiCartRes = {
							resultCode: '20000',
							resultDescription: 'Success',
							developerMessage: 'Success',
							data: {
								status: imeiDT.data.status,
								brand: imeiDT.data.brand,
								model: imeiDT.data.model,
								color: imeiDT.data.color,
								company: imeiDT.data.company,
								matcode: imeiDT.data.matcode,
								statusIMEI: imeiPegasus.data.statusIMEI,
								productType: imeiDT.data.productType,
								productSubtype: imeiDT.data.productSubtype,
							},
						};
						if (imeiDT.data.matcode == 'MATCODE_NON_AIS') {
							if (imeiDT.data.price && imeiDT.data.price != '') {
								let priceExc = parseFloat(imeiDT.data.priceExc.replace(/,/g, ''));
								let priceVatAmt = parseFloat(imeiDT.data.priceVatAmt.replace(/,/g, ''));
								response.data.price = priceExc + priceVatAmt;
							}
							return response;
						} else if (!isCartPage) {
							const reqBody = {
								products: [
									{
										company: imeiDT.data.company,
										materialCode: imeiDT.data.matcode,
									},
								],
							};
							const product = await ProductService.productsByMaterialCode(reqBody);
							if (product.data && product.data.length > 0) {
								let incPrice = null;
								for (const item of product.data) {
									const matchingPrice = item.prices.find((price: { priceType: string }) => price.priceType === 'EUP');
									if (matchingPrice) {
										incPrice = matchingPrice.priceIncludeVat;
										break;
									}
								}
								response.data.price = incPrice;
								return response;
							}
							return product;
						}
						return response;
					}
					throw new Error('Data from DT and PGZ is not match');
				}
				return imeiPegasus;
				// throw new Error("Can't find imei from PGZ");
			}
			return imeiDT;
		} catch (error) {
			throw error;
		}
	}
}
export function MapDtToResponse(response: any) {
	const locationMap: Map<string, IProductStockResponse[]> = new Map<string, IProductStockResponse[]>();

	response.data.listData?.forEach((model: IdtStockResponseData) => {
		const { locationCode, locationName } = model;
		const key = JSON.stringify({ locationCode, locationName });
		const stockValue = locationMap.get(key) || [];
		let data = stockValue.find((stock) => stock.productName === model.productName);

		if (!data) {
			data = {
				brand: model.brand,
				model: model.model,
				productName: model.productName,
				productType: model.productType,
				productSubType: model.productSubType,
				company: model.company,
				totalStockAval: 0,
				colorStock: [],
			};
			stockValue.push(data);
		}

		data.totalStockAval += +model.stockAval;
		data.colorStock.push({ color: model.color, stockAval: +model.stockAval });
		locationMap.set(key, stockValue);
	});

	const MappedResult: IStockResponse[] = [];

	locationMap.forEach((value, key) => {
		const { locationCode, locationName } = JSON.parse(key);
		const actualData: IStockResponse = {
			locationCode: locationCode,
			locationName: locationName,
			productStock: value,
		};
		MappedResult.push(actualData);
	});

	return MappedResult;
}
