import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { URLConfig } from '../src/config/url.config';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import router from '../src/modules/customer/customer.route';
import { CustomerService } from '../src/modules/customer/customer.service';

const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MTEwOTU1IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA5MzQwMDA2MjQiLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjg5MDQ0MTEyLCJleHAiOjk5OTk5OTk5OTl9.IYWZfvvlaBn9AhpvnWz42aLFZGdu7HbLUiSA-8VsKBI';

const app = express();
const mock = new MockAdapter(axios);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

describe('Customer Services', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('GET /subscription/:msisdn', () => {
		it('should return "Can\'t find Data" if there is no subscription data', async () => {
			const msisdn = '0912345678';
			CustomerService.subscriptionMobileNo = jest.fn().mockResolvedValue(null);
			const res = await request(app).get(`/subscription/${msisdn}`);

			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({ message: "Can't find Data" });
		});

		it('should return subscribed mobile data if any', async () => {
			const responseData = { response: 'true' };
			const msisdn = '0912345678';

			CustomerService.subscriptionMobileNo = jest.fn().mockResolvedValue(responseData);
			const res = await request(app).get(`/subscription/${msisdn}`);

			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({ response: 'true' });
		});

		it('should return error subscribed mobile no with status 501', async () => {
			const msisdn = '0912345678';
			CustomerService.subscriptionMobileNo = jest.fn().mockRejectedValueOnce(new Error('Network Error'));

			const res = await request(app).get(`/subscription/${msisdn}`);

			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ success: false, name: 'Error', message: 'Network Error' });
		});
	});

	describe('POST /query-contract-mobile', () => {
		it('should return query contract by mobile', async () => {
			const responseData = { data: [{ mock: 'true' }] };

			mock.onPost(URLConfig.queryContractMobile).reply(StatusCodes.OK, responseData);
			const res = await request(app)
				.post(`/query-contract-mobile`)
				.send({
					option: '1234',
					idCardNo: '1234',
					profileType: '1234',
					sourceSystem: '1234',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Success',
			});
		});

		it('should return "Can\'t find Data"  query contract by mobile no', async () => {
			CustomerService.fetchData = jest.fn().mockReturnValue(null);

			const res = await request(app)
				.post(`/query-contract-mobile`)
				.send({
					option: '1234',
					idCardNo: '1234',
					profileType: '1234',
					sourceSystem: '1234',
				})
				.set('x-authorization', jwtToken);

			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({ message: "Can't find Data" });
		});

		it('should return error query contract by mobile no status 501', async () => {
			CustomerService.fetchData = jest.fn().mockRejectedValue(new Error('Mocked error'));

			const res = await request(app)
				.post(`/query-contract-mobile`)
				.send({
					option: '1234',
					idCardNo: '1234',
					profileType: '1234',
					sourceSystem: '1234',
				})
				.set('x-authorization', jwtToken);

			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
		});
	});

	describe('POST /otp/send', () => {
		it('should return send otp success', async () => {
			const responseData = {
				sendOneTimePWResponse: {
					transactionID: 'test1234',
					isSuccess: true,
					description: 'test',
					code: '2000',
				},
			};

			mock.onPost(URLConfig.sendOneTimePW).reply(StatusCodes.OK, responseData);
			const res = await request(app)
				.post(`/otp/send`)
				.send({
					msisdn: '123456789',
				})
				.set('x-authorization', jwtToken);

			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				transactionID: 'test1234',
				isSuccess: true,
				description: 'test',
				code: '2000',
			});
		});

		it('should return send otp error', async () => {
			mock.onPost(URLConfig.sendOneTimePW).networkError();
			const res = await request(app)
				.post(`/otp/send`)
				.send({
					msisdn: '123456789',
				})
				.set('x-authorization', jwtToken);

			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ message: 'Network Error', name: 'Error', success: false });
		});
	});

	describe('POST /otp/verify', () => {
		it('should return not verify otp success', async () => {
			const responseData = {
				confirmOneTimePWResponse: {
					transactionID: 'test1234',
					isSuccess: true,
					description: 'test',
					code: '2000',
				},
			};

			mock.onPost(URLConfig.confirmOneTimePassword).reply(StatusCodes.OK, responseData);

			const res = await request(app)
				.post(`/otp/verify`)
				.send({
					transactionID: '123456789',
					msisdn: '123456789',
					pwd: '1234',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				isSuccess: true,
				description: 'test',
				transactionID: 'test1234',
				code: '2000',
			});
		});

		it('should return not verify otp error', async () => {
			mock.onPost(URLConfig.confirmOneTimePassword).networkError();

			const res = await request(app)
				.post(`/otp/verify`)
				.send({
					transactionID: '123456789',
					msisdn: '123456789',
					pwd: '1234',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ message: 'Network Error', name: 'Error', success: false });
		});
	});

	describe('GET /get-existing-mobile-care/:mobileNo', () => {
		it('should return existing mobile care ', async () => {
			const responseData = {
				message: 'test',
			};
			const mobileNo = '12345678';

			mock.onPost(URLConfig.personalInformationQuery).reply(StatusCodes.OK, responseData);

			const res = await request(app).get(`/get-existing-mobile-care/${mobileNo}`);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				message: 'test',
			});
		});

		it('should return existing mobile care error', async () => {
			const mobileNo = '12345678';

			mock.onPost(URLConfig.personalInformationQuery).networkError();

			const res = await request(app).get(`/get-existing-mobile-care/${mobileNo}`);
			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ message: 'Network Error', name: 'Error', success: false });
		});

		it("should return existing mobile care Can't find Data", async () => {
			const mobileNo = '12345678';

			CustomerService.queryPersonalInformationMobileCareAndHandset = jest.fn().mockResolvedValue(null);

			const res = await request(app).get(`/get-existing-mobile-care/${mobileNo}`);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({ message: "Can't find Data" });
		});
	});

	describe('GET /billing/:mobileNo', () => {
		const mobileNo = '12345678';
		afterEach(() => {
			jest.clearAllMocks();
		});
		it('should return the valid response', async () => {
			const responseData = {
				message: 'test-billing',
			};
			CustomerService.queryBillingAddress = jest.fn().mockResolvedValue(responseData);

			mock.onPost(URLConfig.personalInformationQuery).reply(StatusCodes.OK, responseData);
			const res = await request(app).get(`/billing/${mobileNo}`);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				message: 'test-billing',
			});
		});

		it('should handling error', async () => {
			CustomerService.queryBillingAddress = jest.fn().mockResolvedValue(null);
			const res = await request(app).get(`/billing/${mobileNo}`);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				message: "Can't find Data",
			});
		});
	});

	describe('GET /listMobileNo/:idCard', () => {
		const idCard = '1320700236312';
		const mockSSB = {
			resultCode: '20000',
			developerMessage: 'SFF:Success, SGSCP:Success, SFF_QryPersonalInfo:Success',
			idCard: '1320700236312',
			totalMobile: '7',
			mobileList: [
				{
					mobileNo: '0611755220',
					chargeType: 'Pre-paid',
					statusId: '000',
					status: '1',
					servicePackageId: '8',
					cos: '602',
				},
				{
					mobileNo: '0910021880',
					chargeType: 'Pre-paid',
					statusId: '377',
					status: '0',
					servicePackageId: '8',
					cos: '602',
				},
				{
					mobileNo: '0910021994',
					chargeType: 'Pre-paid',
					statusId: '378',
					status: '2',
					servicePackageId: '8',
					cos: '602',
				},
				{
					mobileNo: '0935880648',
					chargeType: 'Pre-paid',
					statusId: '384',
					status: '0',
					servicePackageId: '8',
					cos: '602',
				},
				{
					mobileNo: '0610190194',
					chargeType: 'Post-paid',
					statusId: '000',
					status: '1',
					billingSystem: 'IRB',
				},
				{
					mobileNo: '0910021884',
					chargeType: 'Post-paid',
					statusId: '377',
					status: '0',
					billingSystem: 'IRB',
				},
				{
					mobileNo: '0614142850',
					chargeType: 'Post-paid',
					statusId: '378',
					status: '2',
					billingSystem: 'IRB',
				},
			],
		};

		const mockNetworkType = {
			resultCode: '20000',
			developerMessage: 'Ntype Match Success.',
			detail: {
				networkType: 'CPE',
				mobileLocation: 'CBS',
				spName: 'awn',
				chargeMode: '1',
				groupCode: 'R',
				corperateType: 'THA',
				subNetworkType: 'Pre-paid',
				cosId: '160680',
				cbpId: '159',
				scpId: '109',
				mobileStatus: 'Active',
				state: '1',
				language: '1',
				servicePackageId: '8',
				brandId: '5',
				cfAddress: '3CBCB159',
				customerId: '667490121664144',
				gprsTbcf: '0',
				customerSegment: 'classic',
			},
		};

		it('should return list mobileNo', async () => {
			const mockMapData = {
				prepaidMobileList: [
					{
						mobileNo: '0611755220',
						chargeType: 'Pre-paid',
						specialSim: '',
					},
					{
						mobileNo: '0910021880',
						chargeType: 'Pre-paid',
						specialSim: '',
					},
					{
						mobileNo: '0910021994',
						chargeType: 'Pre-paid',
						specialSim: '',
					},
					{
						mobileNo: '0935880648',
						chargeType: 'Pre-paid',
						specialSim: '',
					},
				],
				postpaidMobileList: [
					{
						mobileNo: '0610190194',
						chargeType: 'Post-paid',
					},
					{
						mobileNo: '0910021884',
						chargeType: 'Post-paid',
					},
					{
						mobileNo: '0614142850',
						chargeType: 'Post-paid',
					},
				],
			};
			mock.onPost(`${URLConfig.queryListMobileNo}`).reply(StatusCodes.OK, mockSSB);
			mock.onPost(`${URLConfig.getNetworkType}`).reply(StatusCodes.OK, mockNetworkType);
			const res = await request(app).get(`/listMobileNo/${idCard}`).set('x-authorization', jwtToken);

			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual(mockMapData);
		});

		it('should return error case', async () => {});
	});

	describe('POST /customer-profile', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should return customer information', async () => {
			const mockResAtn = {
				resultCode: '20000',
				resultDescription: 'Success',
				developerMessage: 'Request successful',
				resultData: {
					customer: {
						accountState: 'Active',
						accountStateDate: '27/04/2022 09:55:06',
						accountSegment: '',
						accountCategory: 'R',
						accountSubCategory: 'THA',
						accountGroupCode: '',
						accountGroupName: '',
						accountSpecialGroup: '',
						title: 'คุณ',
						customerName: 'บัช เทส',
						idCardNo: '2663027249666',
						idCardType: 'ID_CARD',
						idCardTypeDesc: 'บัตรประชาชน',
						idCardTypeNo: '',
						birthday: '12/01/1991 00:00:00',
						email: '',
						address: [
							{
								engFlag: 'N',
								houseNo: '99',
								moo: '',
								mooban: 'ais',
								building: 'วังขนาน',
								floor: '',
								room: '',
								soi: '',
								street: '',
								amphur: 'ดอนเมือง',
								tumbol: 'ดอนเมือง',
								province: 'กรุงเทพ',
								zipCode: '10210',
							},
						],
						caId: '32200050388558',
						nationality: 'Thailand',
						billCycle: '16',
						blacklistStatus: '',
						serviceLevel: '',
						gender: '',
						cardIssueDate: '',
						cardExpired: '',
						hobby: [],
						titleEng: '',
						customerNameEng: '',
						serviceSubtype: '',
						titleCode: '',
						creditLimit: '',
						billingSystem: '',
						masterAccount: '8a7cc0198066bb30018068f16b6c0057',
						parentAccount: '',
						registerDate: '27/04/2022 00:00:00',
						watchlistStatus: '',
						customerAccount: {
							remark: '',
						},
						billingAccount: {
							remark: '',
						},
						serviceAccount: {
							remark: '',
						},
					},
				},
			};

			mock.onGet(`${URLConfig.customerProfile}?idCardNo=8760167013181`).reply(StatusCodes.OK, mockResAtn);

			const body = {
				identityCard: '8760167013181',
				channel: 'MyChannel',
				username: 'sasithth',
			};

			const res = await request(app).post(`/customer-profile`).send(body).set('x-authorization', jwtToken);

			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual(mockResAtn);
		});

		it('should return error if customer information not found', async () => {
			const mockResAtn = {
				resultCode: '40401',
				resultDescription: 'Data not found',
				developerMessage: 'DB_SFF QUERY getGomoCustomer Data not found',
				resultData: {},
			};

			mock.onGet(`${URLConfig.customerProfile}?idCardNo=A5740402`).reply(StatusCodes.OK, mockResAtn);

			const body = {
				identityCard: 'A5740402',
				channel: 'MyChannel',
				username: 'sasithth',
			};

			const mapError = {
				success: false,
				name: 'standard error',
				message:
					'{"resultCode":"MCS027-33-200-18-40401","resultDescription":"phx-atn customerInfo [DB_SFF QUERY getGomoCustomer Data not found]","developerMessage":"phx-atn customerInfo [Data not found]","Error":"ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้"}',
			};

			const res = await request(app).post(`/customer-profile`).send(body).set('x-authorization', jwtToken);

			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual(mapError);
		});
	});
});
