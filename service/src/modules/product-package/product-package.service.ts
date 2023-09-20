import axios from 'axios';
import { URLConfig } from '../../config/url.config';
import { IDataPromotionsByShelfResponse } from '../../interfaces/care-response.interface';
import {
	IConditiontFirstPack,
	IContractFirstPackReq,
	IMinimumPackageRequest,
	IMobileParameter,
} from '../../interfaces/package.interface';
import {
	ICurrentPackage,
	IMobilePackageCurrentRoot,
	IQueryPromotionCurrentPack,
} from '../../interfaces/queryPromotionCurrentPack.interface';
import { PromotionService } from '../promotion/promotion.service';

export class ProductPackageService {
	static async contractFirstPack(body: IContractFirstPackReq) {
		try {
			const response = await axios.post(URLConfig.trn, body, {
				headers: {
					'x-ssb-origin': 'myChannel',
					'x-ssb-service-origin': 'mychannel-sales-portal',
					'x-ssb-order-channel': 'WEB',
					'x-ssb-version': 'v1',
					'x-ssb-command-name': 'queryContract',
					'x-ssb-transaction-id': '20230717205904741000',
				},
			});
			if (response.data) {
				if (response.data.status && response.data.status != '20000') {
					const responseMap = PromotionService.mapErrorCode({
						errorCode: response.data.resultCode,
						httpStatus: PromotionService.formatHttpErrorCode(response.data.developerMessage),
						description: response.data.developerMessage,
						nodeNo: '46',
						apiNo: '62',
						nodeName: 'ssb-it-transform',
						apiName: 'queryContract',
						errorDescription: response.data.developerMessage,
					});
					return responseMap;
				}
				return response.data;
			} else {
				throw new Error('Empty response data');
			}
		} catch (error) {
			throw error;
		}
	}

	static async mapQueryPromotionCurrentPack(body: IQueryPromotionCurrentPack): Promise<any> {
		try {
			const response = await ProductPackageService.queryPromotionCurrentPack(body);
			if (response.resultData !== undefined) {
				const mappedData = await ProductPackageService.mapDataCurrentPack(response, body.language);
				return {
					statusCode: '2000',
					statusDesc: 'Success',
					data: mappedData,
				};
			}
			if (response.messageError.status === 404 && response.messageError.status !== undefined) {
				const mapError = PromotionService.mapErrorCode({
					errorCode: response.messageError.status || '',
					httpStatus: response.messageError.status || '',
					description: 'ไม่พบเบอร์ในระบบ',
					nodeNo: '33',
					apiNo: '13',
					nodeName: 'PHX_ATN',
					apiName: 'mobilePackageCurrent',
					errorDescription: response.messageError.message,
				});
				return mapError;
			}
			const mapError = PromotionService.mapErrorCode({
				errorCode: response.messageError.status || '',
				httpStatus: response.messageError.status || '',
				description: response.messageError.message,
				nodeNo: '33',
				apiNo: '13',
				nodeName: 'PHX_ATN',
				apiName: 'mobilePackageCurrent',
				errorDescription: response.messageError.message,
			});
			return mapError;
		} catch (error) {
			throw error;
		}
	}

	static async queryPromotionCurrentPack(body: IQueryPromotionCurrentPack): Promise<any> {
		try {
			const response = await axios.get(URLConfig.mobilePackageCurrent(body.mobileNo));
			if (response.data) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async getPackagesByConditionData(body: IMinimumPackageRequest): Promise<any> {
		try {
			const conditionMiniPack = body.contractPack;
			const allPromotionsByShelfRequest = {
				userId: `${process.env.USERID_PACKAGES}`,
				sanitizedName: body.sanitizedName,
				parameters: [
					{
						name: 'billingSystem',
						value: body.billingSystem || '',
					},
					{
						name: 'location',
						value: body.location || '',
					},
					{
						name: 'orderType',
						value: body.orderType || '',
					},
					{
						name: 'productClass',
						value: body.productClass || '',
					},
					{
						name: 'province',
						value: body.province || '',
					},
					{
						name: 'disctrict',
						value: body.disctrict || '',
					},
					{
						name: 'subDisctrict',
						value: body.subDistrict || '',
					},
				],
			};
			const allPackagesData = await PromotionService.getAllPromotionsByShelf(allPromotionsByShelfRequest);
			if (allPackagesData.statusCode != '2000') {
				const errorNoPackages = PromotionService.mapErrorCode({
					errorCode: allPackagesData.statusCode,
					httpStatus: PromotionService.formatHttpErrorCode(allPackagesData.statusCode),
					description: allPackagesData.statusDesc,
					nodeNo: '6',
					apiNo: '4',
					nodeName: 'cpc',
					apiName: 'getPackagesByCondition',
					errorDescription: allPackagesData.statusDesc,
				});
				return errorNoPackages;
			}

			const allPackages = allPackagesData.data || [];
			const inPackage = conditionMiniPack.inPackage || [];
			let packages = [];

			const minimumPrice = Math.max(conditionMiniPack.minPrice, body.minimumPackagePrice);
			let filteredPackages = [];
			const filteredByPricePackages = filterPackages(minimumPrice, allPackages);
			if (inPackage.length > 0) {
				const filteredByInPackages = filterInPackages(inPackage, filteredByPricePackages);
				filteredPackages = filteredByInPackages;
			} else {
				filteredPackages = filteredByPricePackages;
			}

			const sortedPackages = await ProductPackageService.sortPackages(filteredPackages);
			packages = await ProductPackageService.mapPackages(sortedPackages);

			return {
				statusCode: '2000',
				statusDesc: 'Success',
				data: packages,
			};
		} catch (error) {
			return { message: `Error ${error}` };
		}
	}

	static async queryContractFirstPack(body: IContractFirstPackReq): Promise<any> {
		const responseFirstPack = await ProductPackageService.contractFirstPack(body);
		if (!responseFirstPack) {
			return { message: 'Error responseContractFirstPack' };
		}
		const parameterListData: any = responseFirstPack.data?.ExecuteServiceResponse?.return?.ParameterList || {
			Parameter: [],
		};
		const error: any = parseNameValuePair(parameterListData.Parameter);
		const resultContract: IConditiontFirstPack = {
			firstPackage: 0,
			minPrice: 0,
			initialPackage: 0,
			inPackage: [],
		};
		if (error === '') {
			return {
				resultCode: '20000',
				developerMessage: 'Success',
				data: resultContract,
			};
		} else if (error.errorMessage.match(/Data Not Found/)) {
			return {
				resultCode: '20000',
				developerMessage: 'Success',
				data: resultContract,
			};
		}
		if (error.errorMessage === '') {
			const dataList: any = parameterListData.ParameterList[0].ParameterList;
			if (dataList.length > 0) {
				const responseData: IConditiontFirstPack = {
					firstPackage: ['0'],
					minPrice: ['0'],
					initialPackage: ['0'],
					inPackage: [],
				};
				let mapFirstPack = 0;
				dataList.map((parameterList: any) => {
					if (parameterList['ParameterList']) {
						parameterList.ParameterList.map((parameter: any) => {
							if (parameter['ParameterList']) {
								let isFirstPack = 0;
								const mapping: IConditiontFirstPack = {
									firstPackage: ['0'],
									minPrice: ['0'],
									initialPackage: ['0'],
									inPackage: [],
								};
								parameter.ParameterList.map((result: any) => {
									if (result.Parameter[0].Value === 'in_package') {
										const inPackages: any = parseNameValuePair(result.Parameter);
										responseData.inPackage.push(inPackages.contractRuleValue || '');
										mapping.inPackage.push(inPackages.contractRuleValue || '');
									}
									if (result.Parameter[0].Value === 'First Package') {
										const firstPackage: any = parseNameValuePair(result.Parameter);
										responseData.firstPackage.push(firstPackage.contractRuleValue || '0');
										mapping.firstPackage.push(firstPackage.contractRuleValue || '0');
									}
									if (result.Parameter[0].Value === 'Min Price') {
										const minPrice: any = parseNameValuePair(result.Parameter);
										responseData.minPrice.push(minPrice.contractRuleValue || '0');
										mapping.minPrice.push(minPrice.contractRuleValue || '0');
									}
									if (result.Parameter[0].Value === 'Initial Package') {
										const initialPackage: any = parseNameValuePair(result.Parameter);
										responseData.initialPackage.push(initialPackage.contractRuleValue || '0');
										mapping.initialPackage.push(initialPackage.contractRuleValue || '0');
									}
								});

								mapFirstPack = Math.max(
									...responseData.firstPackage,
									...responseData.minPrice,
									...responseData.initialPackage,
								);
								isFirstPack = Math.max(...mapping.firstPackage, ...mapping.minPrice, ...mapping.initialPackage);
								if (isFirstPack >= mapFirstPack) {
									resultContract.inPackage = responseData.inPackage;
								}
							}
						});
					} else {
						return {
							resultCode: '40000',
							developerMessage: 'Error',
							data: 'Can not find data',
						};
					}
					resultContract.firstPackage = Math.max(...responseData.firstPackage);
					resultContract.minPrice = Math.max(...responseData.minPrice);
					resultContract.initialPackage = Math.max(...responseData.initialPackage);
				});
				return {
					resultCode: '20000',
					developerMessage: 'Success',
					data: resultContract,
				};
			}
		}
	}

	static async mapDataCurrentPack(data: IMobilePackageCurrentRoot, language: string): Promise<ICurrentPackage> {
		const iCurrentPackage: ICurrentPackage = {
			name:
				language === 'EN'
					? data.resultData.mobilePackageCurrent.main.shortenedNameEN || ''
					: data.resultData.mobilePackageCurrent.main.shortenedNameTH || '',
			price: data.resultData.mobilePackageCurrent.main.priceIncludeVat
				? data.resultData.mobilePackageCurrent.main.priceIncludeVat
				: 'null',
			description:
				language === 'EN'
					? data.resultData.mobilePackageCurrent.main.descriptionEN || ''
					: data.resultData.mobilePackageCurrent.main.descriptionEN || '',
			endDate:
				language === 'EN'
					? data.resultData.mobilePackageCurrent.main.cbsProductExpireTime || '-'
					: data.resultData.mobilePackageCurrent.main.productExpireTime || '-',
		};
		return iCurrentPackage;
	}

	static sortPackages(packagePromotions: IDataPromotionsByShelfResponse[]): any {
		let result: any = [];
		const groupedPackages = packagePromotions.reduce(
			(priorityGroup: any, packagePromotion: IDataPromotionsByShelfResponse) => {
				const priority = Number(packagePromotion.priority);
				priorityGroup[priority] = priorityGroup[priority] || [];
				priorityGroup[priority].push(packagePromotion);
				return priorityGroup;
			},
			{},
		);
		const prioritySoretedPackages = ProductPackageService.sortByPriority(groupedPackages, 'asc') || [];
		for (const priority in prioritySoretedPackages) {
			const priorityGroup = prioritySoretedPackages[priority] || [];
			const sortedByPricePackages = ProductPackageService.sortByExcludeVatPrice(priorityGroup, 'asc');
			result = [...result, ...sortedByPricePackages];
		}
		let index = 1;
		result = result.map((packagePromotion: any) => {
			packagePromotion.orderNo = index + '';
			index++;
			return packagePromotion;
		});

		return result;
	}

	static async runOrderNo(dataObject: any) {
		let orderNo = 1;
		for (const key in dataObject) {
			const group = dataObject[key] || [];
			group.forEach((item: any) => {
				item.orderNo = orderNo + '';
				orderNo++;
			});
		}
	}

	static mapPackages(array: any): any {
		const mappedArray = array.map((item: any) => {
			const customAttributes = item.customAttributes || {};
			return {
				orderNo: item.orderNo || '',
				priority: item.priority,
				title: item.title || '',
				promotionCode: customAttributes.promotionCode || '',
				detailTH: customAttributes.descriptionThai || '',
				offeringCode: customAttributes.offeringCode || '',
			};
		});
		return mappedArray;
	}

	static sortByPriority(dataObject: any, sortKey: string): any {
		const sortedKeys = Object.keys(dataObject)
			.map(Number)
			.sort((a, b) => (sortKey == 'asc' ? a - b : b - a));
		const sortedObject: { [key: number]: any[] } = {};

		for (const key of sortedKeys) {
			sortedObject[key] = dataObject[key];
		}

		return sortedObject;
	}

	static sortByExcludeVatPrice(array: any, order = 'asc'): any {
		let sortedArray = [];
		if (order === 'asc') {
			sortedArray = array.sort(
				(ref: any, comparer: any) => ref.customAttributes.priceExclVat - comparer.customAttributes.priceExclVat,
			);
			return sortedArray;
		} else if (order === 'desc') {
			sortedArray = array.sort(
				(ref: any, comparer: any) => comparer.customAttributes.priceExclVat - ref.customAttributes.priceExclVat,
			);
			return sortedArray;
		} else {
			console.error('Invalid order parameter. Please provide either "asc" or "desc".');
			return array;
		}
	}
}

function filterInPackages(
	inPackages: string[],
	packageAllPromotion: IDataPromotionsByShelfResponse[],
): IDataPromotionsByShelfResponse[] {
	return packageAllPromotion.filter((packagePromotion: IDataPromotionsByShelfResponse) => {
		return inPackages.includes(packagePromotion.customAttributes.productPkg);
	});
}
function filterPackages(minimumPrice: number, packageAllPromotion: IDataPromotionsByShelfResponse[]): any {
	return packageAllPromotion.filter((item: any) => {
		const customAttributes = item.customAttributes;
		return Number(customAttributes.priceInclVat) >= minimumPrice;
	});
}

function parseNameValuePair(parameter: Array<IMobileParameter>): Record<string, any> {
	const paramObj: Record<string, any> = {};
	if (Array.isArray(parameter)) {
		for (const mobileParam of parameter) {
			paramObj[mobileParam['Name']] = mobileParam['Value'] || '';
		}
	}
	return paramObj;
}
