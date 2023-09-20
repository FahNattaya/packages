import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import moment from 'moment';
import { URLConfig } from '../../config/url.config';
import { IDeviceCarePayment, IPaymentCart, IRequestCreateCompensation } from '../../interfaces/cart.interface';
import { IShareTransReq } from '../../interfaces/product.interface';
import { createStandardErrorResponse } from '../../middleware/apiResponses.middleware';
import { ICreateOrderList } from '../../models/create-order-list.model';
import ErrorApi from '../../models/error-api.model';
import { ShareTransactions, SimCardModel } from '../../models/shareTransaction.model';
export class CartService {
	static async addToCartList(body: IShareTransReq, headers: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.addCartList, body, headers);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async createSharedTransaction(body: any): Promise<any> {
		try {
			const serializedData = JSON.stringify({
				order: body.order.soId,
			});
			const transactionId = 'new' + CryptoJS.SHA256(serializedData).toString().substring(0, 15);
			body.status = {
				code: '001',
				description: 'pending',
			};
			const checkTransactions = await ShareTransactions.findOne({ TRANSACTION_ID: transactionId });
			if (checkTransactions) {
				return {
					resultCode: '20000',
					resultDescription: 'Success',
					developerMessage: 'TRANSACTION_ID already exist',
					data: checkTransactions,
				};
			}
			const transactionData = {
				TRANSACTION_ID: transactionId,
				DATA: body,
				CREATE_BY: body.CREATE_BY,
				LAST_UPDATE_BY: '',
				LAST_UPDATE_DATE: '',
			};
			const shareTransactions = await ShareTransactions.create(transactionData);
			return {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
				data: {
					isSuccess: true,
					TRANSACTION_ID: transactionId,
					_Id: shareTransactions._id,
				},
			};
		} catch (error) {
			throw error;
		}
	}

	static async listTransaction(transactionId: string): Promise<any> {
		const filter: object = {
			TRANSACTION_ID: transactionId,
		};
		const option: object = {
			_id: 0,
			__v: 0,
		};
		try {
			const result = await ShareTransactions.find(filter, option);
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async cartListByMobileNo(mobileNo: string, locationCode: string): Promise<any> {
		const shareTransactionSimCard = SimCardModel;
		const queryDataMobile = new shareTransactionSimCard({ mobileNo: mobileNo });
		queryDataMobile.encryptFieldsSync();
		const filter: object = {
			'DATA.sim_card.mobileNo': queryDataMobile.mobileNo,
			'DATA.status.code': '001',
			'DATA.seller.locationCode': locationCode,
		};
		const option: object = {
			_id: 0,
		};
		const data: any = [];
		try {
			await ShareTransactions.find(filter, option)
				.then((dataTransaction) => {
					dataTransaction.forEach((element: any) => {
						const mobileCare = element.DATA.device_care_package.isBuyDeviceCare
							? element.DATA.device_care_package
							: element.DATA.mobile_care_package;
						data.push({
							transactionId: element.TRANSACTION_ID,
							device: element.DATA.device,
							simCard: element.DATA.sim_card,
							payment: element.DATA.payment,
							device_care_payment: element.DATA.device_care_payment,
							main_promotion: element.DATA.main_promotion,
							package: element.DATA.package,
							mobileCare: mobileCare,
							soId: element.DATA.order.soId,
							customer: element.DATA.customer,
							order: element.DATA.order,
							seller: element.DATA.seller,
							transactionType: element.DATA.transactionType,
						});
					});
				});

			return data.length > 0 ? data : '';
		} catch (error) {
			throw error;
		}
	}

	static async createOrderListService(body: ICreateOrderList): Promise<any> {
		try {
			const response = await axios.post(URLConfig.createOrderList, body);

			if (!response.data || response.data.resultCode !== 'S') {
				const responseMap = {
					errorCode: response.data.resultCode,
					httpStatus: 500,
					description: response.data.resultMessage,
					nodeNo: '9',
					apiNo: '2',
					nodeName: 'DT',
					apiName: 'createOrderList',
					errorDescription: response.data.resultMessage,
				};
				const caseError = createStandardErrorResponse(responseMap);
				throw caseError;
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async updateShareTransactions(transactionId: string, data: any): Promise<any> {
		try {
			const filter = {
				TRANSACTION_ID: transactionId,
			};
			let result = (await ShareTransactions.findOne(filter)) as any;
			if (result) {
				let currents: any = result;
				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						const keys = key.split('.');
						let current = result;
						for (let i = 0; i < keys.length - 1; i++) {
							const nestedKey = keys[i];
							current = current[nestedKey];
						}
						const finalKey = keys[keys.length - 1];
						current[finalKey] = data[key];
					}
					[];
				}
				result = currents;
				try {
					await result.save();
					return { message: 'Success' };
				} catch (error) {
					return { error: 'Failed to save the result.' };
				}
			} else {
				return { message: 'No transaction found for the given transactionId' };
			}
		} catch (error) {
			throw error;
		}
	}

	static async removeShareTransactions(transactionId: any[], body: any): Promise<any> {
		try {
			const filter = {
				TRANSACTION_ID: { $in: transactionId },
			};
			const data = {
				$set: {
					'DATA.status.code': '003',
					'DATA.status.description': 'Manual Cancel',
				},
			};
			await axios.get(URLConfig.removeCart(body.soId, body.userId));
			await ShareTransactions.updateMany(filter, data);
			return { message: 'Success' };
		} catch (error) {
			throw error;
		}
	}

	static async updatePaymentShareTransactions(
		transactionId: string,
		payments: {
			payment: IPaymentCart;
			deviceCarePayment: IDeviceCarePayment;
		},
	): Promise<any> {
		try {
			const filter = {
				TRANSACTION_ID: transactionId,
			};
			const cartList: any = await ShareTransactions.findOne(filter);

			const updatePayments = {
				$set: {
					'DATA.payment': payments.payment,
					'DATA.device_care_payment': {
						...cartList.DATA.device_care_payment,
						...payments.deviceCarePayment,
					},
				},
			};
			const result = await ShareTransactions.updateOne(filter, updatePayments);
			if (result) {
				return { message: 'update success' };
			}
		} catch (error) {
			throw error;
		}
	}

	static async createCompensation(transactionId: string): Promise<any> {
		try {
			const dataTransaction = await ShareTransactions.findOne({
				TRANSACTION_ID: transactionId,
			});
			const body = bodyCreateCompensationByDT(dataTransaction?.DATA, dataTransaction?.CREATE_BY as string);
			const response = await axios.post(URLConfig.createCompensation, body);
			if (response.data.resultCode === '20000') {
				return response.data;
			}
			const errorResponse = createStandardErrorResponse({
				errorCode: response.data.resultStatus,
				httpStatus: 500,
				description: response.data.resultDescription,
				nodeNo: '9',
				apiNo: '7',
				nodeName: 'dt',
				apiName: 'CreateCompensation',
				errorDescription: response.data.resultDescription,
				errorMessage: 'Create compensation ไม่สำเร็จ',
			});
			throw errorResponse;
			// throw new Error(JSON.stringify(response.data));
		} catch (error) {
			throw error;
		}
	}
}

async function FindConfigFlowItem(repo: string, errorCodeData: string): Promise<any> {
	try {
		const errorApi: any | null = await ErrorApi.findOne({ nameConfig: 'error_api' });
		return errorApi.configFlow.find((item: any) => item.repo === repo && item.errorCode === errorCodeData);
	} catch (error) {
		throw error;
	}
}

function bodyCreateCompensationByDT(data: any, userId: string) {
	try {
		let preBooking: any = data['preBooking'] || {};

		let requestBody: IRequestCreateCompensation = {
			requestChannel: 'MC',
			compensationType: '',
			soId: data['order']['soId'],
			company: data['device']['company'] || 'AWN',
			saleEntryDt: moment().format('DD/MM/YYYY'),
			receiptNo: data['receipt']['receiptNo'] || '',
			receiptDt: data['receipt']['receiptDate'] || moment().format('DD/MM/YYYY'),
			advancePackReceiptNo: '',
			saleLocationCode: data['seller']['locationCode'] || '',
			ascCode: data['seller']['ascCode'].trim(),
			customerName: `${data['customer']['firstName']}  ${data['customer']['lastName']}`,
			mobileNo: data['sim_card']['mobileNo'],
			networkType: '3G POSTPAID',
			productType: data['main_promotion']['trade']['productType'] || 'DEVICE',
			productSubtype: data['main_promotion']['trade']['productSubtype'] || 'HANDSET',
			brand: data['device']['brand'],
			model: data['device']['model'],
			color: data['device']['colorName'],
			materialCode: data['device']['matCode'] || '',
			imei: data['device']['imei'],
			tradeNo: data['main_promotion']['trade']['tradeNo'],
			tradeDiscountId:
				data['main_promotion']['trade']['discount']['tradeDiscountId'] &&
				data['main_promotion']['trade']['discount']['tradeDiscountId'] !== 0
					? data['main_promotion']['trade']['discount']['tradeDiscountId']
					: '',
			tradeOption: '',
			ussdCode: data['main_promotion']['trade']['ussdCode'],
			returnCode: '',
			focCode: data['main_promotion']['trade']['focCode'],
			eupInc: data['main_promotion']['trade']['normalPrice'],
			saleAmt: data['main_promotion']['trade']['promotionPrice'],
			discountExc:
				data['main_promotion']['trade']['discount']['discountExcludeVat'] &&
				data['main_promotion']['trade']['discount']['discountExcludeVat'] !== 0
					? data['main_promotion']['trade']['discount']['discountExcludeVat']
					: '',
			refMobileNo: data['sim_card']['moblieNoTypeA'],
			refUssdCode: '',
			refReturnCode: '',
			prebookingNo: preBooking['preBookingNo'] || '',
			prebookingAmt: preBooking['depositAmt'] || '',
			prebookingReceiptNo: preBooking['receiptNum'] || '',
			cardHolder: data['payment']['creditCardName'] || '',
			cardNo: data['payment']['creditCardNo'] || '',
			monthlyInstallments: data['payment']['installmentMonth'] || '',
			cardOwner: data['payment']['creditCardBank'] || '',
			bankAbbr: data['payment']['creditCardBank'] || '',
			tidTerm: '',
			traceNumber: '',
			compensationReasonDesc: '',
			installmentReasonDesc: '',
			email: data['customer']['emailAddress'] || '',
			userId: userId,
		};

		if (
			!!data['main_promotion']['trade']['installmentOnBillAmount'] &&
			!!data['main_promotion']['trade']['installmentOnBillTerm']
		) {
			requestBody = {
				...requestBody,
				saleAmt:
					data['main_promotion']['trade']['promotionPrice'] +
					data['main_promotion']['trade']['installmentOnBillAmount'],
			};
		}

		if (data['device']['matCode'] === 'MATCODE_NON_AIS') {
			requestBody = {
				...requestBody,
				imeiNonAis: 'Y',
			};
		}

		if (data['payment']['remark']) {
			requestBody = {
				...requestBody,
				screenRemark: data['payment']['remark'],
			};
		}

		return requestBody;
	} catch (error) {
		throw error;
	}
}
