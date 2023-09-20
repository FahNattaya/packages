import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { URLConfig } from '../../config/url.config';
import { ICustomerProfile, IGetCustProfile, IMobileResult, IVerifyOTP } from '../../interfaces/customer.interface';
import { createStandardErrorResponse } from '../../middleware/apiResponses.middleware';
import { MCConfigService } from '../mc-config/mc-config.service';
const cache: { [url: string]: any } = {};

export class CustomerService {
	static async subscriptionMobileNo(msisdn: string): Promise<any> {
		try {
			const response = await axios.get(URLConfig.subscriptionAccount(msisdn), {
				headers: { username: 'MC', channel: 'channel' },
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async queryContractByMobileNo(body: any, headers: any): Promise<any> {
		try {
			const data = await CustomerService.fetchData(URLConfig.queryContractMobile, body, headers);
			return data;
		} catch (error) {
			throw error;
		}
	}

	static async sendOTP(msisdn: string): Promise<any> {
		try {
			const sendOTP = await axios.post(URLConfig.sendOneTimePW, {
				sendOneTimePW: {
					msisdn: '66' + msisdn,
					otpChannel: 'sms',
					service: 'MyChannel',
					accountType: 'all',
					lifeTimeoutMins: '5',
					otpDigit: '4',
					refDigit: '4',
				},
			});
			const response = sendOTP.data.sendOneTimePWResponse;
			if (response.code === '2000') {
				return {
					transactionID: response.transactionID,
					isSuccess: response.isSuccess,
					description: response.description,
					code: '2000',
				};
			}
			return response;
		} catch (error) {
			throw error;
		}
	}

	static async verifyOTP(verifyOTP: IVerifyOTP): Promise<any> {
		try {
			const confirmOneTimePW = {
				msisdn: '66' + verifyOTP.msisdn,
				pwd: verifyOTP.pwd,
				transactionID: verifyOTP.transactionID,
				service: 'MyChannel',
			};
			const confirmationTime = await axios.post(URLConfig.confirmOneTimePassword, { confirmOneTimePW });
			const response = confirmationTime.data.confirmOneTimePWResponse;
			if (response.code === '2000') {
				return {
					isSuccess: response.isSuccess,
					description: response.description,
					transactionID: response.transactionID,
					code: '2000',
				};
			}
			return response;
		} catch (error) {
			throw error;
		}
	}

	static async queryPersonalInformationMobileCareAndHandset(mobileNo: string) {
		try {
			const msisdn = mobileNo.substring(1);
			const transactionId = moment().format('YYYYMMDDHHmmssSSS') + uuidv4().substring(0, 4);
			const body = {
				user: {
					userIdType: '0',
					userIdData: '66' + msisdn,
				},
				optionQueryPersonalInfo: [
					{
						option: '2',
					},
					{
						option: '12',
					},
				],
			};
			const response = await axios.post(URLConfig.personalInformationQuery, body, {
				headers: {
					'x-ssb-transaction-id': transactionId,
					'x-ssb-service-origin': 'mychannel-device-sales',
					'x-ssb-origin': 'myChannel',
					'x-ssb-order-channel': 'WEB',
					'x-ssb-version': 'v1',
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async queryBillingAddress(mobileNo: string) {
		mobileNo = mobileNo.replace('0', '66');
		const response = await this.queryPersonalInformation(mobileNo, ['5']);
		const billingAddress = response.personalInfomation.opt_5;
		return {
			resultCode: response.resultCode,
			developerMessage: response.developerMessage,
			resultData: {
				billingAddress: {
					engFlag: 'N',
					houseNo: billingAddress.houseNo,
					moo: billingAddress.moo || '',
					mooban: billingAddress.mooBan,
					building: billingAddress.buildingName,
					floor: billingAddress.floor || '',
					room: billingAddress.room || '',
					soi: billingAddress.soi || '',
					street: billingAddress.streetName || '',
					amphur: billingAddress.amphur,
					tumbol: billingAddress.tumbol,
					province: billingAddress.provinceName,
					zipCode: billingAddress.zipCode,
				},
			},
		};
	}

	static async queryPersonalInformation(data: string, options: string[]) {
		const transactionId = moment().format('YYYYMMDDHHmmssSSS') + uuidv4().substring(0, 4);
		const body = {
			user: {
				userIdType: '0',
				userIdData: data,
			},
			optionQueryPersonalInfo: options.map((opt) => ({
				option: opt,
			})),
		};
		const response = await axios.post(URLConfig.personalInformationQuery, body, {
			headers: {
				'x-ssb-transaction-id': transactionId,
				'x-ssb-service-origin': 'mychannel-device-sales',
				'x-ssb-origin': 'myChannel',
				'x-ssb-order-channel': 'WEB',
				'x-ssb-version': 'v1',
			},
		});
		return response.data;
	}

	static async fetchData(url: string, body: any, headers: any): Promise<any> {
		const keys = url + body.idCardNo + body.mobileNo;
		if (cache[keys]) {
			return {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
				data: cache[keys][0],
			};
		} else {
			try {
				const response = await axios.post(url, body, headers);
				const data = response.data;
				cache[keys] = data;
				return {
					resultCode: '20000',
					resultDescription: 'Success',
					developerMessage: 'Success',
					data: data[0],
				};
			} catch (error) {
				throw error;
			}
		}
	}

	static async queryListMobileNo(req: any, headers: any): Promise<any> {
		const { idCard } = req.params ? req.params : '';
		const transactionId = moment().format('YYYYMMDDHHmmssSSS') + uuidv4().substring(0, 4);
		try {
			const paramObj = {
				idCard: idCard,
				reqTotalMobile: '50',
				userName: req?.user?.username,
				channel: 'MyChannel',
				isMobileStatusFlag: 'true',
				option: '1',
			};
			const listMobileNoHeaders = getCommonHeaders(transactionId, 'v2');
			const getNetworkTypeHeaders = getCommonHeaders(transactionId, 'v1');
			const res = await performAxiosPost(URLConfig.queryListMobileNo, paramObj, listMobileNoHeaders);
			if (['20000', '20001'].includes(res?.data?.resultCode)) {
				const mobileList = res?.data?.mobileList;
				const mobileNoList = await mapMobileAllData(mobileList);
				const mobileNoPostpaidList = await mapMobilePostpaidAllData(mobileList);
				const changePrefix = (phoneNumber: string) =>
					phoneNumber.startsWith('09') ? '66' + phoneNumber.substring(2) : phoneNumber;
				const promises = mobileNoList.map((mobilePrepaid: any) => {
					const newPhoneNumber = changePrefix(mobilePrepaid?.mobileNo);
					const mobileNo = { msisdn: newPhoneNumber };
					return performAxiosPost(URLConfig.getNetworkType, mobileNo, getNetworkTypeHeaders);
				});

				const allResponses = await Promise.all(promises);
				updateSpecialSimType(mobileNoList, allResponses);

				return {
					prepaidMobileList: mobileNoList,
					postpaidMobileList: mobileNoPostpaidList,
				};
			}
			return res?.data
				? {
						resultCode: res.data.resultCode,
						developerMessage: res.data.developerMessage,
						idCard: res.data.idCard,
						totalMobile: res.data.totalMobile,
				  }
				: null;
		} catch (error) {
			throw error;
		}
	}

	static async getCustomerProfile(body: IGetCustProfile): Promise<ICustomerProfile> {
		const response = await axios.get(`${URLConfig.customerProfile}?idCardNo=${body.identityCard}`, {
			headers: {
				channel: body.channel,
				username: body.username,
			},
		});
		try {
			if (response.data?.resultCode === '40401') {
				const errorResponse = createStandardErrorResponse({
					errorCode: response.data?.resultCode,
					httpStatus: response.status,
					description: response.data?.resultDescription,
					nodeNo: '33',
					apiNo: '18',
					nodeName: 'phx-atn',
					apiName: 'customerInfo',
					errorDescription: response.data?.developerMessage,
				});
				throw errorResponse;
			}

			return response.data;
		} catch (error) {
			if (response.data?.resultCode === '40401') {
				const errorResponse = createStandardErrorResponse({
					errorCode: response.data?.resultCode,
					httpStatus: response.status,
					description: response.data?.resultDescription,
					nodeNo: '33',
					apiNo: '18',
					nodeName: 'phx-atn',
					apiName: 'customerInfo',
					errorDescription: response.data?.developerMessage,
				});
				throw errorResponse;
			}
			throw error;
		}
	}
}

async function mapMobileAllData(mobileList: Array<any>): Promise<IMobileResult[]> {
	let mobileDataResult: Array<IMobileResult> = [];
	let specialSim: string = '';
	if (Array.isArray(mobileList)) {
		mobileList.forEach((mobileData: any = {}) => {
			if (mobileData.chargeType !== 'Pre-paid') {
				return;
			}
			let mobileResult: IMobileResult = {
				mobileNo: mobileData.mobileNo,
				chargeType: mobileData.chargeType,
				mobileSegment: mobileData.mobileSegment,
				status: mobileData.mobileStatus,
				specialSim: specialSim,
			};
			mobileDataResult.push(mobileResult);
		});
	}
	return mobileDataResult;
}

async function mapMobilePostpaidAllData(mobileList: Array<any>): Promise<IMobileResult[]> {
	let mobileDataResult: Array<IMobileResult> = [];
	if (Array.isArray(mobileList)) {
		mobileList.forEach((mobileData: any) => {
			if (mobileData.chargeType === 'Post-paid') {
				let mobileResult: IMobileResult = {
					mobileNo: mobileData.mobileNo,
					chargeType: mobileData.chargeType,
					mobileSegment: mobileData.mobileSegment,
					status: mobileData.mobileStatus,
				};
				mobileDataResult.push(mobileResult);
			}
		});
	}
	return mobileDataResult;
}

async function mathTravellerSim(cosId: any): Promise<boolean> {
	const travellerSIMCOSIds = await getCosId('Traveller');
	return travellerSIMCOSIds.includes(cosId);
}

async function mathSim2Fly(cosId: any): Promise<boolean> {
	const sim2FlyCOSIds = await getCosId('SIM2Fly');
	return sim2FlyCOSIds.includes(cosId);
}

async function getCosId(type: string) {
	let sim2FlyCOSIds: any[] = [];
	let travellerSIMCOSIds: any[] = [];
	await MCConfigService.getConfigMenu('listValidateSim').then((response: any) => {
		response.config.data.map((data: any) => {
			if (data.type === 'SIM2Fly') {
				data.listData.map((codeData: any) => {
					sim2FlyCOSIds.push(codeData.code);
				});
			} else {
				data.listData.map((codeData: any) => {
					travellerSIMCOSIds.push(codeData.code);
				});
			}
		});
	});
	if (type === 'SIM2Fly') {
		return sim2FlyCOSIds;
	} else {
		return travellerSIMCOSIds;
	}
}

async function performAxiosPost(url: string, data: any, headers: any) {
	return axios.post(url, data, { headers });
}

async function updateSpecialSimType(prepaidMobileItemList: any[], allResponses: any[]) {
	const updateMobileItemList = allResponses.map(async (responseItem, index) => {
		if (responseItem?.body?.detail?.cosId) {
			if (await mathTravellerSim(responseItem.body.detail.cosId)) {
				prepaidMobileItemList[index].specialSim = 'TravellerSim';
			} else if (await mathSim2Fly(responseItem.body?.detail?.cosId)) {
				prepaidMobileItemList[index].specialSim = 'Sim2Fly';
			}
		} else {
			prepaidMobileItemList[index].specialSim = '';
		}
	});
	await Promise.all(updateMobileItemList);
}

const getCommonHeaders = (transactionId: string, version: string) => {
	return {
		'x-ssb-transaction-id': transactionId,
		'x-ssb-service-origin': 'mychannel-customer-portal',
		'x-ssb-origin': 'myChannel',
		'x-ssb-order-channel': 'WEB',
		'x-ssb-version': version,
	};
};
