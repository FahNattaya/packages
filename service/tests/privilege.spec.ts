import axios from 'axios';
import {
	mockCheckDeviceTransactionResponse,
	mockPrivilegeRequest,
	mockPrivilegeResponse,
} from '../src/mock/mock.data.cpc';
import { PrivilegeService } from '../src/modules/privilege/privilege.service';

const mockError = new Error('Test error message');

describe('privilege service', () => {
	beforeEach(() => {
		console.log = jest.fn();
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	describe('getTokenPrivilege', () => {
		it('should return response when call getTokenPrivilege success', async () => {
			const mockResponse = {
				data: {},
			};
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			const result = await PrivilegeService.getTokenPrivilege({});
			expect(result).toEqual(mockResponse.data);
		});

		it('rethrows error when an error occurs during API call', async () => {
			axios.post = jest.fn().mockRejectedValue(mockError);
			expect(PrivilegeService.getTokenPrivilege({})).rejects.toThrow(mockError);
		});
	});

	describe('checkPrivilege', () => {
		it('should return response when call checkPrivilege success', async () => {
			axios.post = jest.fn().mockResolvedValueOnce(mockPrivilegeResponse);
			const result = await PrivilegeService.checkPrivilege(mockPrivilegeRequest);
			expect(result).toEqual(mockPrivilegeResponse.data);
		});

		it('should return standard error when call checkPrivilege and status not 20000', async () => {
			const mockResponse = {
				data: {
					status: '50001',
					httpStatus: 500,
					description: 'Internal Server Error',
					msg: 'An error occurred.',
				},
			};
			const dataMockError = {
				Error: 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้',
				developerMessage: 'privilege-sales-portal checkPrivilege [Internal Server Error]',
				resultCode: 'MCS027-36-500-2-50001',
				resultDescription: 'privilege-sales-portal checkPrivilege [An error occurred.]',
			};
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			const result = await PrivilegeService.checkPrivilege({});
			expect(result).toEqual(dataMockError);
		});

		it('should return error message when an error occurs', async () => {
			axios.post = jest.fn().mockRejectedValue(mockError);
			expect(PrivilegeService.checkPrivilege({})).rejects.toThrow(mockError);
		});

		it('should return Error Empty when call checkPrivilege success and not get response', async () => {
			const mockResponse = {};
			const errorMessage = 'Empty response data';
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			expect(() => {
				throw new Error(errorMessage);
			}).toThrowError(errorMessage);
		});
	});

	describe('RequestPrivilege', () => {
		it('should return standard error when call requestPrivilegeBarCode and status not 20000', async () => {
			const mockResponse = {
				data: {
					status: '50001',
					httpStatus: 500,
					description: 'Internal Server Error',
					msg: 'An error occurred.',
				},
			};
			const dataMockError = {
				Error: 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้',
				developerMessage: 'privilege-sales-portal requestPrivilegeBarcode [Internal Server Error]',
				resultCode: 'MCS027-36-500-3-50001',
				resultDescription: 'privilege-sales-portal requestPrivilegeBarcode [An error occurred.]',
			};
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			const result = await PrivilegeService.requestPrivilegeBarCode(mockPrivilegeRequest);
			expect(result).toEqual(dataMockError);
			axios.post = jest.fn().mockClear();
		});

		it('should return error message when call requestPrivilegeBarCode an error occurs', async () => {
			axios.post = jest.fn().mockRejectedValue(mockError);
			expect(PrivilegeService.requestPrivilegeBarCode(mockPrivilegeRequest)).rejects.toThrow(mockError);
		});

		it('should return Error Empty when call requestPrivilegeBarCode success and not get response', async () => {
			const mockResponse = {
				data: {
					status: '50001',
					httpStatus: 500,
					description: 'Internal Server Error',
					msg: 'An error occurred.',
				},
			};
			const errorMessage = 'Empty response data';
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			await PrivilegeService.requestPrivilegeBarCode(mockPrivilegeRequest);
			expect(() => {
				throw new Error(errorMessage);
			}).toThrowError(errorMessage);
		});

		it('should return response when call RequestPrivilege success', async () => {
			const mockResponse = {
				data: {},
			};
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			const result = await PrivilegeService.requestPrivilegeBarCode(mockPrivilegeRequest);
			expect(result).toEqual(mockResponse.data);
		});
	});

	describe('checkDeviceTrans', () => {
		it('should return response when call checkDeviceTran success', async () => {
			axios.post = jest.fn().mockResolvedValueOnce(mockCheckDeviceTransactionResponse);
			const result = await PrivilegeService.checkDeviceTrans(mockPrivilegeRequest);
			expect(result).toEqual(mockCheckDeviceTransactionResponse.data);
		});

		it('should return standard error when call checkDeviceTran and status not 20000', async () => {
			const mockResponse = {
				data: {
					status: '50001',
					httpStatus: 500,
					description: 'Internal Server Error',
					msg: 'An error occurred.',
				},
			};
			const dataMockError = {
				Error: 'ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้',
				developerMessage: 'privilege-sales-portal checkDeviceTransaction [Internal Server Error]',
				resultCode: 'MCS027-36-500-5-50001',
				resultDescription: 'privilege-sales-portal checkDeviceTransaction [An error occurred.]',
			};
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			const result = await PrivilegeService.checkDeviceTrans({});
			expect(result).toEqual(dataMockError);
		});

		it('should return Error Empty when call checkDeviceTran success and not get response', async () => {
			const mockResponse = {};
			const errorMessage = 'Empty response data';
			axios.post = jest.fn().mockResolvedValueOnce(mockResponse);
			expect(() => {
				throw new Error(errorMessage);
			}).toThrowError(errorMessage);
		});
	});
});
