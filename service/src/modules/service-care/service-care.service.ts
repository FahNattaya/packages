import axios from 'axios';
import moment from 'moment';
import { URLConfig } from '../../config/url.config';
import {
	IDataPromotionsByShelfResponse,
	IGetAllPromotionsByShelfResponse,
	IOrderFees,
} from '../../interfaces/care-response.interface';
import {
	ICarePlus,
	ICarePlusBody,
	IGetAllPromotionsByShelf,
	IGetPromotionShelvesResponse,
	IOptionServiceType,
} from '../../interfaces/cpc.interface';
import { createStandardErrorResponse } from '../../middleware/apiResponses.middleware';
import ConfigMenuModel from '../../models/configMC.model';
import { ShareTransactions } from '../../models/shareTransaction.model';
import { PromotionService } from '../promotion/promotion.service';
export class ServiceCareService {
	static async getCarePromotionsByShelf(body: ICarePlusBody, locationCode: string): Promise<any> {
		try {
			const serviceCareData = [];
			const FIRST_INDEX = 0;
			const SUCCESS_STATUS = '2000';
			const FILTER_KEY = 'Recurring';
			const isPartner = locationCode != '1100' ? true : false;
			const userIdAppleCare = isPartner ? process.env.USER_ID_APPLE_CARE_PARTNER : process.env.USER_ID_APPLE_CARE_SHOP;

			const responseGetPromotionShelves: IGetPromotionShelvesResponse = await PromotionService.getPromotionShelves({
				userId: process.env.USERID_AIS_CARE,
				language: body.language,
			});
			if (responseGetPromotionShelves.statusCode !== SUCCESS_STATUS) {
				return responseGetPromotionShelves;
			}

			const bodyGetAllPromotion: IGetAllPromotionsByShelf = {
				userId: process.env.USERID_AIS_CARE,
				sanitizedName: responseGetPromotionShelves.data[FIRST_INDEX].sanitizedName,
				parameters: [
					{ name: 'title', value: responseGetPromotionShelves.data[FIRST_INDEX].title },
					{ name: 'location', value: locationCode },
				],
			};
			console.log('AIS care req ==>', bodyGetAllPromotion);

			const getAllPromotion: IGetAllPromotionsByShelfResponse = await PromotionService.getAllPromotionsByShelf(
				bodyGetAllPromotion,
			);

			if (getAllPromotion.statusCode !== SUCCESS_STATUS) {
				return responseGetPromotionShelves;
			}

			const sortEndUserPrice = await ServiceCareService.filterEndUserPrice(getAllPromotion.data, body.handsetPrice);
			const filteredAisCares = await ServiceCareService.filterAisPromotions(sortEndUserPrice, FILTER_KEY);
			const sortedAisCares = await ServiceCareService.sortByPrice(filteredAisCares, 'asc');
			const mapMobileCareRes = await ServiceCareService.mapMobileCare(sortedAisCares, body);
			serviceCareData.push(mapMobileCareRes);

			if (body.brand === 'APPLE') {
				const responseGetPromotionShelves: IGetPromotionShelvesResponse = await PromotionService.getPromotionShelves({
					userId: userIdAppleCare,
					language: body.language,
				});

				if (responseGetPromotionShelves.statusCode !== SUCCESS_STATUS) {
					return responseGetPromotionShelves;
				}

				const bodyGetAllPromotion: IGetAllPromotionsByShelf = {
					userId: userIdAppleCare,
					sanitizedName: responseGetPromotionShelves.data[FIRST_INDEX].sanitizedName,
					parameters: [{ name: 'title', value: responseGetPromotionShelves.data[FIRST_INDEX].title }],
				};
				const allPromotion = await PromotionService.getAllPromotionsByShelf(bodyGetAllPromotion);
				const filteredAppleCares = await ServiceCareService.filterApplePromotions(body, allPromotion, isPartner);
				serviceCareData.unshift(filteredAppleCares);
			}

			return {
				statusCode: SUCCESS_STATUS,
				statusDesc: `SUCCESS`,
				data: serviceCareData,
			};
		} catch (error) {
			return `Error function getCarePromotionsByShelf ${error}`;
		}
	}

	static filterAisPromotions(dataArray: any, sortKey: string) {
		return dataArray.sort((ref: any, comparer: any) => {
			const refPriceType = ref.customAttributes.priceType;
			const comparerPriceType = comparer.customAttributes.priceType;
			if (refPriceType == sortKey && comparerPriceType != sortKey) {
				return -1;
			} else if (refPriceType != sortKey && comparerPriceType == sortKey) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	static filterEndUserPrice = (dataArray: any, handsetPrice: string) => {
		return dataArray.filter((ref: any) => {
			const endUserPrice = handsetPrice;
			const startDevicePrice = ref.customAttributes.startDevicePrice;
			const endDevicePrice = ref.customAttributes.endDevicePrice;
			if (Number(endUserPrice) >= Number(startDevicePrice) && Number(endUserPrice) <= Number(endDevicePrice)) {
				return 1;
			} else {
				return 0;
			}
		});
	};

	static sortByPrice(array: any, order = 'asc'): any {
		let sortedArray = [];
		if (order === 'asc') {
			sortedArray = array.sort(
				(ref: any, comparer: any) => ref.customAttributes.priceInclVat - comparer.customAttributes.priceInclVat,
			);
			return sortedArray;
		} else if (order === 'desc') {
			sortedArray = array.sort(
				(ref: any, comparer: any) => comparer.customAttributes.priceInclVat - ref.customAttributes.priceInclVat,
			);
			return sortedArray;
		} else {
			console.error('Invalid order parameter. Please provide either "asc" or "desc".');
			return array;
		}
	}
	static filterApplePromotions = async (body: ICarePlusBody, promotions: any, isPartner: boolean) => {
		try {
			const responseApple = await ServiceCareService.productCrossSelling(body);
			let years = isPartner ? promotions.data[0].customAttributes.duration : '-';
			let responseCarePlus: ICarePlus = {
				productType: 'AppleCare+',
				service: `ดูแลเครื่อง ${years} ปี`,
				protection: [
					{
						name: 'Hardware & Software',
						isProtect: true,
					},
					{
						name: 'เครื่องเสียจากอุบัติเหตุ',
						isProtect: true,
					},
					{
						name: 'เครื่องหาย',
						isProtect: false,
					},
				],
				condition: [
					{
						detail: 'ซ่อมหน้าจอ',
						price: '-',
					},
					{
						detail: 'เปลี่ยนเครื่อง iPhone',
						price: '-',
					},
				],
				serviceFee: 'ชำระเงินทันที',
				serviceType: {
					title: '',
					option: [],
				},
			};
			if (responseApple.listMainProduct.length === 0) {
				return responseCarePlus;
			}
			let pricefilter = responseApple.listMainProduct[0].listCrossProduct[0].priceIncVat;
			let matCodeApple = responseApple.listMainProduct[0].listCrossProduct[0].crossMatCode;
			responseCarePlus.condition[0].price = convertPrice(
				responseApple.listMainProduct[0].listCrossProduct[0].swapPrice,
			);
			responseCarePlus.condition[1].price = convertPrice(
				responseApple.listMainProduct[0].listCrossProduct[0].replacePrice,
			);
			let filterPromotionApple: any = {};
			if (isPartner) {
				promotions.data.orderFees = promotions.data[0].orderFees.filter((orderFee: IOrderFees) => {
					return +pricefilter === orderFee.priceInclVat;
				});
				filterPromotionApple = promotions.data[0].orderFees.length > 0 ? promotions.data[0] : undefined;
			} else {
				filterPromotionApple = promotions.data.find((promotion: IDataPromotionsByShelfResponse) =>
					pricefilter.includes(promotion.customAttributes.priceIncVat),
				);
			}
			if (promotions.data[0].customAttributes.duration) {
				years = (+promotions.data[0].customAttributes.duration / 12) | 0;
			}
			if (filterPromotionApple) {
				responseCarePlus = {
					...responseCarePlus,
					serviceType: {
						title: filterPromotionApple.title,
						option: [
							{
								name: 'AppleCare+' + ' for ' + body.productName,
								price: convertPrice(pricefilter),
								promotionCode: filterPromotionApple.customAttributes.promotionCode,
							},
						],
					},
					service: `ดูแลเครื่อง ${years} ปี`,
					crossMatCode: matCodeApple,
					orderFees: isPartner ? filterPromotionApple.orderFees[0] : {},
				};
				return responseCarePlus;
			} else {
				return responseCarePlus;
			}
		} catch (error) {
			const errorData: IGetAllPromotionsByShelfResponse = {
				statusCode: '4000',
				statusDesc: `Error catch filterPromotionApple ${error}`,
				data: [],
			};
			return errorData;
		}
	};

	static productCrossSelling = async (body: ICarePlusBody) => {
		try {
			const responseApple = await axios.post(URLConfig.queryProductCrossSelling, {
				productType: body.productType,
				productSubType: body.productSubType,
				brand: body.brand,
				model: body.model,
				projectGroup: 'APPLE CARE PLUS',
				matCode: body.matCode ? body.matCode : '',
				activeDate: body.activeDate,
			});

			return responseApple.data;
		} catch (error) {
			const iGetPromotionShelvesResponse: IGetPromotionShelvesResponse = {
				statusCode: '4000',
				statusDesc: `Error function productCrossSelling ${String(error)}`,
				data: [],
			};
			return iGetPromotionShelvesResponse;
		}
	};

	static async mapMobileCare(sort: any, body: any): Promise<any> {
		if (body.language === 'EN') {
			const responseData: ICarePlus = {
				productType: 'AIS Care Plus',
				service: 'Up to 4 years warranty',
				protection: [
					{
						name: 'hardware',
						isProtect: true,
					},
					{
						name: 'accident',
						isProtect: true,
					},
					{
						name: 'missing',
						isProtect: true,
					},
				],
				condition: [
					{ detail: `Exchange service 25%`, price: convertPrice(toPercentage(body.handsetPrice, 25)) },
					{
						detail: 'Exchange service 42.5%',
						price: convertPrice(toPercentage(body.handsetPrice, 42.5)),
					},
				],
				serviceFee: 'charge according to the invoice',
				serviceType: {
					title: 'AIS Mobile Care',
					option: sort.map((e: IDataPromotionsByShelfResponse) => {
						const SPLITTER = e.customAttributes.shortNameEng.includes('Monthly') ? 'Monthly' : 'One-time';
						const splitSentence =
							e.customAttributes.shortNameEng.slice(
								0,
								e.customAttributes.shortNameEng.indexOf(SPLITTER) + SPLITTER.length,
							) || '';
						const iOptionServiceType: IOptionServiceType = {
							name: e.title !== null || e.title != undefined ? splitSentence.trim() : 'null',
							price: convertPrice(e.customAttributes.priceIncVat),
							promotionCode: e.customAttributes.promotionCode || '',
						};
						return iOptionServiceType;
					}),
				},
			};
			return responseData;
		} else {
			const responseData: ICarePlus = {
				productType: 'AIS Care Plus',
				service: 'รับประกันสูงสุด 4 ปี',
				protection: [
					{
						name: 'hardware',
						isProtect: true,
					},
					{
						name: 'accident',
						isProtect: true,
					},
					{
						name: 'missing',
						isProtect: true,
					},
				],
				condition: [
					{ detail: `บริการเปลี่ยนเครื่อง 25%`, price: convertPrice(toPercentage(body.handsetPrice, 25)) },
					{
						detail: 'บริการรับเครื่องทดแทน 42.5%',
						price: convertPrice(toPercentage(body.handsetPrice, 42.5)),
					},
				],
				serviceFee: 'เรียกเก็บตามใบแจ้ง',
				serviceType: {
					title: 'AIS Mobile Care',
					option: sort.map((e: IDataPromotionsByShelfResponse) => {
						const SPLITTER = 'เดือน';
						const splitSentence = e.customAttributes.shortNameThai
							.slice(0, e.customAttributes.shortNameThai.indexOf(SPLITTER) + SPLITTER.length)
							.trim();
						const priceSentence = e.customAttributes.shortNameThai
							.slice(
								e.customAttributes.shortNameThai.indexOf(SPLITTER) + SPLITTER.length + 1,
								e.customAttributes.shortNameThai.length,
							)
							.trim();
						const iOptionServiceType: IOptionServiceType = {
							name: e.title !== null || e.title != undefined ? splitSentence : 'null',
							price: priceSentence.split(' ')[0],
							promotionCode: e.customAttributes.promotionCode || '',
						};
						return iOptionServiceType;
					}),
				},
			};
			return responseData;
		}
	}

	static async skyAuthentication(): Promise<any> {
		const request = {
			username: 'myc_usr',
			password: 'ebb1345b837c3039d16e9c0675cc449a',
		};

		try {
			const response = await axios.post(URLConfig.skyAuthentication, request);

			if (response.data.token) {
				return {
					resultCode: '20000',
					resultDescription: 'Success',
					developerMessage: 'Success',
					data: response.data.token,
				};
			}

			const errorResponse = createStandardErrorResponse({
				errorCode: response.data.statusCode,
				httpStatus: 500,
				description: 'Empty response data',
				nodeNo: '41',
				apiNo: '1',
				nodeName: 'sky',
				apiName: '/sky-auth/v1/user/authenticate',
				errorDescription: 'Empty response data',
			});

			throw errorResponse;
		} catch (error) {
			throw error;
		}
	}

	static async provisionMobileCare(transactionId: string): Promise<any> {
		try {
			const dataTransaction: any = await ShareTransactions.findOne({
				TRANSACTION_ID: transactionId,
			});
			const mcConfig: any = (await ConfigMenuModel.find(
				{ nameconfig: 'newMobileCare' },
				{
					_id: 0,
					'data._id': 0,
				},
			)) as any;
			const reqBody = await bodyProvisionMobileCare(dataTransaction, mcConfig, transactionId);
			const skyAuthenticationResponse = await ServiceCareService.skyAuthentication();
			const token = skyAuthenticationResponse.data;
			const response = await axios.post(URLConfig.provisionMobileCare, reqBody, {
				headers: {
					'error-limit': '',
					Authorization: token,
				},
			});
			return response.data;
		} catch (error: any) {
			const errorResponse = createStandardErrorResponse({
				errorCode: error.message.split(' ').pop(),
				httpStatus: 501,
				description: error.message,
				nodeNo: '41',
				apiNo: '5',
				nodeName: 'sky',
				apiName: '/mobile-postpaid/change-product/conductor/v1/order',
				errorDescription: error.message,
				errorMessage: 'Create provision mobile care fail',
			});
			throw errorResponse;
		}
	}

	static getMaxLimitMobileCare = async function () {
		try {
			const reqBody = {
				ExecuteService: {
					sffRequest: {
						Event: 'evOMQueryListLOVConfigInfo',
						ParameterList: {
							Parameter: [
								{
									Name: 'lovType',
									Value: 'MOBILE_CARE_CONFIG',
								},
								{
									Name: 'lovName',
									Value: 'LIMIT_IMEI',
								},
							],
						},
					},
				},
			};
			const response = await axios.post(URLConfig.ssbTransform, reqBody, {
				headers: {
					'x-ssb-origin': 'myChannel',
					'x-ssb-service-origin': 'mychannel-sales-portal',
					'x-ssb-order-channel': 'WEB',
					'x-ssb-version': 'v1',
					'x-ssb-command-name': 'queryListLOVConfigInfo',
					'x-ssb-transaction-id': '20230717205904741000',
				},
			});
			let lovVal1 = 0;
			response.data.data.ExecuteServiceResponse.return.ParameterList.ParameterList.forEach((parameter: any) => {
				parameter.Parameter?.forEach((lov: any) => {
					if (lov.Name == 'lovVal1') lovVal1 = lov.Value;
				});
			});
			return { mobileCareLimit: lovVal1 };
		} catch (err) {
			throw err;
		}
	};
}
function convertPrice(price: string): string {
	const inputPrice = price || '0';
	const num = parseFloat(inputPrice);
	const formattedPrice = num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
	return parseFloat(formattedPrice).toLocaleString();
}

function toPercentage(price: string, percentage: number): string {
	return (Number(price) * percentage) / 100 + '';
}

function bodyProvisionMobileCare(dataTransaction: any, mcConfig: any, transactionId: string) {
	try {
		const transactionData = dataTransaction?.DATA;
		const seller = transactionData?.seller;

		let serviceCode: any;

		let careplus: any = mcConfig[0].config ? mcConfig[0].config : [];
		let mappingCareplus: any = [];

		careplus.map((data: any) => {
			data.locations.map((m: any) => {
				if (m === seller.locationCode) {
					mappingCareplus.push(data);
				}
			});
		});

		if (mappingCareplus.length > 0) {
			serviceCode = mappingCareplus[0]['product_cd'];
		} else {
			careplus.map((data: any) => {
				data.locations.map((m: any) => {
					if (m === 'ALL') {
						mappingCareplus.push(data);
					}
				});
			});
			serviceCode = mappingCareplus[0]['product_cd'];
		}

		let productIdType = 'sffProductCode';
		let productIdValue = transactionData.mobile_care_package['customAttributes']['promotionCode'];
		if (transactionData.mobile_care_package['customAttributes']['offeringCode']) {
			productIdType = 'offeringCode';
			productIdValue = transactionData.mobile_care_package['customAttributes']['offeringCode'];
		}

		let reqBody: any = {
			customerOrderType: 'Change Product',
			publicIdType: 'mobileNo',
			publicIdValue: transactionData['sim_card']['mobileNo'] || '',
			privateIdType: 'referenceNo',
			privateIdValue: transactionId,
			orderDate: moment().format('DD/MM/YYYY HH:mm:ss'),
			channel: 'MyChannel',
			reasonCode: '109',
			productOrderItem: [
				{
					idType: productIdType,
					idValue: productIdValue,
					action: 'Add',
					effectiveType: 'I',
					characteristics: [
						{
							name: 'IMEI',
							value: transactionData['device']['imei'] || '',
							action: 'Add',
						},
					],
				},
			],
			serviceOrderItem: [
				{
					idType: 'sffProductCode',
					idValue: serviceCode,
					action: 'Add',
					effectiveType: 'I',
					characteristics: [
						{
							name: 'IMEI',
							value: transactionData['device']['imei'] || '',
							action: 'Add',
						},
						{
							name: 'Price',
							value: transactionData['main_promotion']['trade']['normalPrice'] || '',
							action: 'Add',
						},
						{
							name: 'Brand',
							value: transactionData['device']['brand'] || '',
							action: 'Add',
						},
						{
							name: 'Color',
							value: transactionData['device']['colorName'] || '',
							action: 'Add',
						},
						{
							name: 'Model',
							value: transactionData['device']['model'] || '',
							action: 'Add',
						},
						{
							name: 'Receipt_DT',
							value: moment().format('YYYYMMDD'),
							action: 'Add',
						},
						{
							name: 'email',
							value: transactionData['mobile_care_package']['email'] || '',
							action: 'Add',
						},
					],
				},
			],
			relateParty: {
				orderCreator: {
					name: dataTransaction['CREATE_BY'],
					locationCode: transactionData['seller']['locationCode'] || '',
				},
			},
		};
		return reqBody;
	} catch (error) {
		throw error;
	}
}
