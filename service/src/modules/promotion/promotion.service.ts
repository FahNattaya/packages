import axios from 'axios';
import { URLConfig } from '../../config/url.config';
import {
	ICampaignPaymentReq,
	ICampaignRequest,
	ICampaignResponseData,
	ICarePlusBody,
	IGetAllPromotionsByShelf,
	IGetPaymentsByCampaign,
	IGetPromotionShelves,
	IGetTradePromotion,
} from '../../interfaces/cpc.interface';
import { PaymentService } from '../payment/payment.service';

export class PromotionService {
	static async productCrossSelling(body: ICarePlusBody) {
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
			throw error;
		}
	}

	static async getPromotionShelves(body: IGetPromotionShelves): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getPromotionShelves, body);
			if (!response.data) {
				throw new Error('Empty response data');
			}
			if (response.data.statusCode !== '2000') {
				const responseMap = PromotionService.mapErrorCode({
					errorCode: response.data.statusCode,
					httpStatus: response.data.statusCode,
					description: response.data.statusDesc,
					nodeNo: '6',
					apiNo: '2',
					nodeName: 'CPC',
					apiName: 'getPromotionShelves',
					errorDescription: response.data.statusDesc,
				});
				return responseMap;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async getAllPromotionsByShelf(body: IGetAllPromotionsByShelf): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getAllPromotionsByShelf, body);
			if (!response.data) {
				throw new Error('Empty response data');
			}
			if (response.data.statusCode != '2000') {
				const responseMap = PromotionService.mapErrorCode({
					errorCode: response.data.statusCode,
					httpStatus: PromotionService.formatHttpErrorCode(response.data.statusCode),
					description: response.data.statusDesc,
					nodeNo: '6',
					apiNo: '3',
					nodeName: 'cpc',
					apiName: 'getAllPromotionsByShelf',
					errorDescription: response.data.statusDesc,
				});
				return responseMap;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async getCampaignPromotion(body: ICampaignRequest): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getCampaignPromotions, body, {
				headers: {
					authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRLZXkiOiJUbTFSUmtWTGNGVkRaRFV5YlZGaGIwOHpSM2Q1WnowOUxtMTVMV05vWVc1dVpXd3RhMlY1IiwiY2xpZW50S2V5IjoibXktY2hhbm5lbC1rZXkiLCJpYXQiOjE2OTIyNjc3NDMsImV4cCI6OTk5OTk5OTk5OX0.rej9z-w2cbAhBR0SF3rPsmMFGPvGqfGRZBIpaAj62z0`,
				},
			});
			if (!response.data) {
				throw Error('Empty response data');
			}

			return {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
				data: response.data.campaigns,
			};
		} catch (error) {
			throw error;
		}
	}

	static async getTradePromotion(body: IGetTradePromotion): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getTradePromotions, body, {
				headers: {
					authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRLZXkiOiJUbTFSUmtWTGNGVkRaRFV5YlZGaGIwOHpSM2Q1WnowOUxtMTVMV05vWVc1dVpXd3RhMlY1IiwiY2xpZW50S2V5IjoibXktY2hhbm5lbC1rZXkiLCJpYXQiOjE2OTIyNjc3NDMsImV4cCI6OTk5OTk5OTk5OX0.rej9z-w2cbAhBR0SF3rPsmMFGPvGqfGRZBIpaAj62z0`,
				},
			});
			if (!response.data) {
				throw Error('Empty response data');
			}
			return {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
				data: response.data.data,
			};
		} catch (error) {
			throw error;
		}
	}

	static mapErrorCode(errorData: any): any {
		const resultCode = `MCS027-${errorData.nodeNo}-${errorData.httpStatus}-${errorData.apiNo}-${errorData.errorCode}`;
		const resultDescription = `${errorData.nodeName} ${errorData.apiName} [${errorData.errorDescription}]`;
		const developerMessage = `${errorData.nodeName} ${errorData.apiName} [${errorData.description}]`;
		return {
			resultCode: resultCode,
			resultDescription: resultDescription,
			developerMessage: developerMessage,
			Error: 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้',
		};
	}
	static formatHttpErrorCode(statusCode: string): number {
		const FIRST_INDEX = 0;
		const LAST_INDEX = 3;
		let httpStatus: string = statusCode;
		httpStatus = httpStatus.substring(FIRST_INDEX, LAST_INDEX);
		return Number(httpStatus);
	}

	static async getPaymentsByCampaign(body: IGetPaymentsByCampaign): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getPaymentsByCampaign, body, {
				headers: {
					authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRLZXkiOiJUbTFSUmtWTGNGVkRaRFV5YlZGaGIwOHpSM2Q1WnowOUxtMTVMV05vWVc1dVpXd3RhMlY1IiwiY2xpZW50S2V5IjoibXktY2hhbm5lbC1rZXkiLCJpYXQiOjE2OTIyNjc3NDMsImV4cCI6OTk5OTk5OTk5OX0.rej9z-w2cbAhBR0SF3rPsmMFGPvGqfGRZBIpaAj62z0`,
				},
			});

			if (!response.data) {
				throw Error('Empty response data');
			}
			return {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
				data: response.data.payments,
			};
		} catch (error) {
			throw error;
		}
	}

	static async getCampaignAndPayments(body: ICampaignPaymentReq, header: any): Promise<any> {
		try {
			const campaignData = await PromotionService.getCampaignPromotion(body);

			if (campaignData.data && campaignData.data.length > 0) {
				const data = await Promise.all(
					campaignData.data.map(async (campaign: ICampaignResponseData) => {
						if (campaign.installmentFlag) {
							if (body.flow !== 'AIS') {
								const reqPaymentPartNer = {
									brand: body.brand,
									model: body.model,
									color: body.color,
								};

								const paymentPartner = await PaymentService.getPaymentPartnerByCampaign(reqPaymentPartNer, header);

								return {
									...campaign,
									payments: [paymentPartner],
								};
							}
							const reqPayment = {
								campaignId: campaign.campaignId,
								locationCode: body.locationCode.toString(),
								saleChannels: body.saleChannels,
							};
							const payment = await PromotionService.getPaymentsByCampaign(reqPayment);

							return {
								...campaign,
								payments: payment.data,
							};
						} else {
							return campaign;
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

			return campaignData;
		} catch (error) {
			throw error;
		}
	}
}
