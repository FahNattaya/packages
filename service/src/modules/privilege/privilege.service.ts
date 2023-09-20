import axios from 'axios';
import { URLConfig } from '../../config/url.config';
import { PromotionService } from '../promotion/promotion.service';
export class PrivilegeService {
	static async getTokenPrivilege(body: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.authGenerate, body);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async checkPrivilege(body: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.campaignCheck, body, {
				headers: {
					Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQxNTc2NDksImlhdCI6MTY4ODM3ODg0OSwiaXNzIjoiaHR0cHM6Ly9zaXQtcHJjLWFwaS5hei5pbnRyYS5haXMiLCJzdWIiOiJtY1VzZXIiLCJ1c2VySUQiOjExMSwidXNlcm5hbWUiOiJtY1VzZXIifQ.pmOSx1P79NKYxQji81Egodpa5vKe9KzR-GBVNdI9QZ5jhTX4iANeRkVvx8MpuiXMxhs5dClTWooN44ApfXcVI-sUhpUlGutLwZmWKNoGPaGdhLaZE-bCTjj8pIl5Ad1mWIQopOOjd21hV0NJg4_rLNVCmaZQPCNsT52GmFG_Ur14DtTJUYhUgJviZjETb_zs2tSarOI4P-d3agXziyqtj3gBDuj8c4lgt3bgoaV3N5m0rfNPhOhc3kG4adgBT3224dQu9yv3o8VnEf1iVj0qlb02cvyA-FFdLPqKegKB53wjo7KYx-gvoJ1b6p8azM5mFi-sjVJ9VUKs0JTa3hHUog`,
				},
			});
			if (response.data) {
				if (response.data.status && response.data.status != '20000') {
					const responseMap = PromotionService.mapErrorCode({
						errorCode: response.data.status,
						httpStatus: response.data.httpStatus,
						description: response.data.description,
						nodeNo: '36',
						apiNo: '2',
						nodeName: 'privilege-sales-portal',
						apiName: 'checkPrivilege',
						errorDescription: response.data.msg,
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

	static async requestPrivilegeBarCode(body: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.campaignRedeem, body, {
				headers: {
					Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQxNTc2NDksImlhdCI6MTY4ODM3ODg0OSwiaXNzIjoiaHR0cHM6Ly9zaXQtcHJjLWFwaS5hei5pbnRyYS5haXMiLCJzdWIiOiJtY1VzZXIiLCJ1c2VySUQiOjExMSwidXNlcm5hbWUiOiJtY1VzZXIifQ.pmOSx1P79NKYxQji81Egodpa5vKe9KzR-GBVNdI9QZ5jhTX4iANeRkVvx8MpuiXMxhs5dClTWooN44ApfXcVI-sUhpUlGutLwZmWKNoGPaGdhLaZE-bCTjj8pIl5Ad1mWIQopOOjd21hV0NJg4_rLNVCmaZQPCNsT52GmFG_Ur14DtTJUYhUgJviZjETb_zs2tSarOI4P-d3agXziyqtj3gBDuj8c4lgt3bgoaV3N5m0rfNPhOhc3kG4adgBT3224dQu9yv3o8VnEf1iVj0qlb02cvyA-FFdLPqKegKB53wjo7KYx-gvoJ1b6p8azM5mFi-sjVJ9VUKs0JTa3hHUog`,
				},
			});
			if (response.data) {
				if (response.data.status && response.data.status != '20000') {
					const responseMap = PromotionService.mapErrorCode({
						errorCode: response.data.status,
						httpStatus: response.data.httpStatus,
						description: response.data.description,
						nodeNo: '36',
						apiNo: '3',
						nodeName: 'privilege-sales-portal',
						apiName: 'requestPrivilegeBarcode',
						errorDescription: response.data.msg,
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

	static async checkDeviceTrans(body: any): Promise<any> {
		try {
			const response = await axios.post(URLConfig.getTransaction, body, {
				headers: {
					Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQxNTc2NDksImlhdCI6MTY4ODM3ODg0OSwiaXNzIjoiaHR0cHM6Ly9zaXQtcHJjLWFwaS5hei5pbnRyYS5haXMiLCJzdWIiOiJtY1VzZXIiLCJ1c2VySUQiOjExMSwidXNlcm5hbWUiOiJtY1VzZXIifQ.pmOSx1P79NKYxQji81Egodpa5vKe9KzR-GBVNdI9QZ5jhTX4iANeRkVvx8MpuiXMxhs5dClTWooN44ApfXcVI-sUhpUlGutLwZmWKNoGPaGdhLaZE-bCTjj8pIl5Ad1mWIQopOOjd21hV0NJg4_rLNVCmaZQPCNsT52GmFG_Ur14DtTJUYhUgJviZjETb_zs2tSarOI4P-d3agXziyqtj3gBDuj8c4lgt3bgoaV3N5m0rfNPhOhc3kG4adgBT3224dQu9yv3o8VnEf1iVj0qlb02cvyA-FFdLPqKegKB53wjo7KYx-gvoJ1b6p8azM5mFi-sjVJ9VUKs0JTa3hHUog`,
				},
			});
			if (response.data) {
				if (response.data.status && response.data.status != '20000') {
					const responseMap = PromotionService.mapErrorCode({
						errorCode: response.data.status,
						httpStatus: response.data.httpStatus,
						description: response.data.description,
						nodeNo: '36',
						apiNo: '5',
						nodeName: 'privilege-sales-portal',
						apiName: 'checkDeviceTransaction',
						errorDescription: response.data.msg,
					});
					return responseMap;
				}
				return response.data;
			}
		} catch (error) {
			throw error;
		}
	}
}
