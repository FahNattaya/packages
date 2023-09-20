import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { URLConfig } from '../src/config/url.config';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import ConfigMenuModel from '../src/models/configMC.model';
import { LoanAddressModel } from '../src/models/payment.model';
import router from '../src/modules/payment/payment.route';
import { PaymentService } from '../src/modules/payment/payment.service';

const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MjUxNjU5IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA5MzQwMDA2MjQiLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjkwMjc5MTgwLCJleHAiOjk5OTk5OTk5OTl9.21PhEJXNrN7zGWCtyzYl7JAKbJ0T_v3sGAnIG0gJMoQ';

const app = express();
const mock = new MockAdapter(axios);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

describe('payment service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('POST /', () => {
		it('should return create QR Code success', async () => {
			const res = await request(app).post(`/`).set('x-authorization', jwtToken).send({
				test: '123',
			});
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				test: '123',
			});
		});
	});

	describe('POST /getPaymentsByTrade', () => {
		it('should return "Can\'t find Data" get payments by trade ', async () => {
			mock.onPost(URLConfig.getPayments).replyOnce(StatusCodes.OK, undefined);
			const res = await request(app).post(`/getPaymentsByTrade`).set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({ message: "Can't find Data" });
		});

		it('should return get payments by trade success', async () => {
			mock.onPost(URLConfig.getPayments).replyOnce(StatusCodes.OK, {
				test: '123',
			});
			const res = await request(app).post(`/getPaymentsByTrade`).set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				test: '123',
			});
		});

		it('should return error get payments by trade ', async () => {
			mock.onPost(URLConfig.getPayments).networkErrorOnce();
			const res = await request(app).post(`/getPaymentsByTrade`).set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ success: false, name: 'Error', message: 'Network Error' });
		});
	});

	describe('POST /getBankPromotion', () => {
		it('should return "Can\'t find Data" get bank promotion', async () => {
			mock.onPost(URLConfig.getBanksPromotion).replyOnce(StatusCodes.OK, undefined);
			const res = await request(app)
				.post(`/getBankPromotion`)
				.send({
					location: '1100',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({ message: "Can't find Data" });
		});

		it('should return get bank promotion success', async () => {
			mock.onPost(URLConfig.getBanksPromotion).replyOnce(StatusCodes.OK, {
				test: '123',
			});
			const res = await request(app)
				.post(`/getBankPromotion`)
				.send({
					location: '1100',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({
				test: '123',
			});
		});

		it('should return error get bank promotion', async () => {
			mock.onPost(URLConfig.getBanksPromotion).networkErrorOnce();
			const res = await request(app)
				.post(`/getBankPromotion`)
				.send({
					location: '1100',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ success: false, name: 'Error', message: 'Network Error' });
		});
	});

	describe('POST /getPaymentsByTradeWithCondition', () => {
		it('should return "Can\'t find Data" get payment by tradeWith Condition', async () => {
			mock.onPost(URLConfig.getPayments).replyOnce(StatusCodes.OK, undefined);
			const res = await request(app)
				.post(`/getPaymentsByTradeWithCondition`)
				.send({
					location: '1100',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toEqual({ message: "Can't find Data" });
		});

		it('should return get payment by tradeWith Condition success', async () => {
			const paymentData = {
				statusCode: '20000',
				statusDesc: 'Success',
				payments: [
					{
						cardType: null,
						method: 'CA',
						banks: [],
					},
					{
						cardType: null,
						method: 'CC',
						banks: [],
					},
					{
						cardType: null,
						method: 'DC',
						banks: [],
					},
					{
						cardType: null,
						method: 'LS',
						banks: [],
					},
					{
						cardType: null,
						method: 'PB',
						banks: [],
					},
					{
						cardType: null,
						method: 'RL',
						banks: [],
					},
					{
						cardType: 'MASTER',
						method: 'CC',
						banks: [
							{
								bankAbbr: 'BAY',
								bankDescEn: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
								bankDescTh: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
								imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
								installments: [],
							},
							{
								bankAbbr: 'BBL',
								bankDescEn: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
								bankDescTh: 'กรุงเทพ จำกัด (มหาชน)',
								imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
								installments: [
									{
										installmentId: '339',
										installmentRate: '0',
										installmentTerms: '6',
										balloonMonth: null,
									},
								],
							},
						],
					},
					{
						cardType: 'OTHER',
						method: 'CC',
						banks: [
							{
								bankAbbr: 'BAY',
								bankDescEn: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
								bankDescTh: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
								imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
								installments: [
									{
										installmentId: '283',
										installmentRate: '0',
										installmentTerms: '6',
										balloonMonth: null,
									},
								],
							},
							{
								bankAbbr: 'BBL',
								bankDescEn: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
								bankDescTh: 'กรุงเทพ จำกัด (มหาชน)',
								imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
								installments: [
									{
										installmentId: '339',
										installmentRate: '0',
										installmentTerms: '6',
										balloonMonth: null,
									},
								],
							},
						],
					},
					{
						cardType: 'VISA',
						method: 'CC',
						banks: [
							{
								bankAbbr: 'BAY',
								bankDescEn: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
								bankDescTh: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
								imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
								installments: [
									{
										installmentId: '270',
										installmentRate: '0',
										installmentTerms: '20',
										balloonMonth: null,
									},
									{
										installmentId: '274',
										installmentRate: '0',
										installmentTerms: '18',
										balloonMonth: null,
									},
									{
										installmentId: '283',
										installmentRate: '0',
										installmentTerms: '6',
										balloonMonth: null,
									},
								],
							},
							{
								bankAbbr: 'BBL',
								bankDescEn: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
								bankDescTh: 'กรุงเทพ จำกัด (มหาชน)',
								imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
								installments: [
									{
										installmentId: '339',
										installmentRate: '0',
										installmentTerms: '6',
										balloonMonth: null,
									},
								],
							},
							{
								bankAbbr: 'UOBCASHP',
								bankDescEn: 'UNITED OVERSEAS BANK(THAI)PUBLIC COMPANY LIMITED',
								bankDescTh: 'UOB Cash Plus',
								imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOBCASHP_UOB CashPlus.png',
								installments: [
									{
										installmentId: '701',
										installmentRate: '0',
										installmentTerms: '20',
										balloonMonth: null,
									},
									{
										installmentId: '702',
										installmentRate: '0',
										installmentTerms: '18',
										balloonMonth: null,
									},
								],
							},
						],
					},
				],
			};
			const bankPromotion = {
				statusCode: '20000',
				statusDesc: 'success',
				banks: [
					{
						name: 'ซิตี้แบงก์',
						abb: 'CITI',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITI_CITI.png',
					},
					{
						name: 'ซิตี้แบงก์ เรดดี้เครดิต',
						abb: 'CITIREADY',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITIREADY_citibank02.jpg',
					},
					{
						name: 'ไทยพาณิชย์ จำกัด (มหาชน)',
						abb: 'SCB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCB_SCB02.png',
					},
					{
						name: 'กสิกรไทย จำกัด (มหาชน)',
						abb: 'KBNK',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
					},
					{
						name: 'อยุธยาคาร์ด เซอร์วิสเซส',
						abb: 'ACS',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ACS_ACS_BAY03.png',
					},
					{
						name: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
						abb: 'BAY',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
					},
					{
						name: 'บริษัทอิออนธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)',
						abb: 'AEON',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/AEON_AEON-logo.png',
					},
					{
						name: 'กรุงเทพ จำกัด (มหาชน)',
						abb: 'BBL',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
					},
					{
						name: 'แห่งประเทศจีน',
						abb: 'BOC',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BOC_BOC.png',
					},
					{
						name: 'ซีไอเอ็มบี ไทย จำกัด (มหาชน)',
						abb: 'CIMB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CIMB_CIMB.png',
					},
					{
						name: 'แคปปิตอล โอเค',
						abb: 'COK',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/COK_capOK.png',
					},
					{
						name: 'เซ็นทรัล',
						abb: 'CT',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CT_centralThe1.png',
					},
					{
						name: 'บัตรเครดิต เฟิร์สช้อยส์',
						abb: 'FCC',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/FCC_FCC.png',
					},
					{
						name: 'ออมสิน',
						abb: 'GSB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/GSB_GSB.png',
					},
					{
						name: 'ฮ่องกงแอนด์เซี่ยงไฮ้',
						abb: 'HKSH',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/HKSH_HSBC.png',
					},
					{
						name: 'กรุงไทย จำกัด (มหาชน)',
						abb: 'KTB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
					},
					{
						name: 'SCB Speedy Cash',
						abb: 'SCBSPEEDY',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCBSPEEDY_SCB Speedy.png',
					},
					{
						name: 'สแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)',
						abb: 'SCN',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCN_scn-logo.jpg',
					},
					{
						name: 'บัตรเครดิต เทสโก้ โลตัส วีซ่า',
						abb: 'TCS',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/TCS_TescoLotus-CreditCard.png',
					},
					{
						name: 'ยูโอบี จำกัด (มหาชน)',
						abb: 'UOB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOB_UOB-bank.png',
					},
					{
						name: 'UOB Cash Plus',
						abb: 'UOBCASHP',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOBCASHP_UOB CashPlus.png',
					},
					{
						name: 'ธนาคารทหารไทยธนชาต จำกัด (มหาชน)',
						abb: 'TTB',
						imageUrl:
							'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/997f660d-2074-464c-b963-6d23284bdcdb.jpeg',
					},
				],
			};
			ConfigMenuModel.findOne = jest.fn().mockResolvedValue({
				nameConfig: 'name_method_payment',
				configFlow: [
					{
						method: 'CA',
						cardType: '',
						methodName: 'cash',
						methodNameTh: 'เงินสด',
						details: [],
					},
					{
						method: 'CC',
						cardType: 'MIXED',
						methodName: 'Credit Card',
						methodNameTh: 'บัตรเครดิต',
						details: [],
					},
					{
						method: 'AP',
						cardType: '',
						methodName: 'AIS Point',
						methodNameTh: 'AIS Point',
						details: [],
					},
					{
						method: 'MP',
						cardType: '',
						methodName: 'mPay',
						methodNameTh: 'mPay',
						details: [],
					},
					{
						method: 'V1',
						cardType: '',
						methodName: '',
						methodNameTh: 'Voucher(V1)',
						details: [],
					},
					{
						method: 'CP',
						cardType: '',
						methodName: 'Coupon',
						methodNameTh: 'คูปอง',
						details: [],
					},
					{
						method: 'PB',
						cardType: '',
						methodName: '',
						methodNameTh: 'PromptPay',
						details: [],
					},
					{
						method: 'RL',
						cardType: '',
						methodName: 'test',
						methodNameTh: 'Rabbit Line Pay',
						details: [],
					},
					{
						method: 'WC',
						cardType: '',
						methodName: '',
						methodNameTh: 'WeChat Pay',
						details: [],
					},
					{
						method: 'PC',
						cardType: '',
						methodName: '',
						methodNameTh: 'PromptPay Credit Card',
						details: [],
					},
					{
						method: 'PD',
						cardType: '',
						methodName: '',
						methodNameTh: 'PromptPay Debit Card',
						details: [],
					},
					{
						method: 'DC',
						cardType: '',
						methodName: '',
						methodNameTh: 'บัตรเดบิต(จ่ายเต็ม)',
						details: [],
					},
					{
						method: 'V2',
						cardType: '',
						methodName: '',
						methodNameTh: 'Voucher Trade in',
						details: [],
					},
					{
						method: 'PR',
						cardType: '',
						methodName: '',
						methodNameTh: 'ตัดบัญชีเงินเดือนพนักงาน',
						details: [],
					},
					{
						method: 'GV',
						cardType: '',
						methodName: '',
						methodNameTh: 'G-Voucher',
						details: [],
					},
					{
						method: 'GW',
						cardType: '',
						methodName: '',
						methodNameTh: 'G-Wallet',
						details: [],
					},
					{
						method: 'HI',
						cardType: '',
						methodName: '',
						methodNameTh: 'Handset Installment On Bill',
						details: [],
					},
					{
						method: 'AB',
						cardType: '',
						methodName: '',
						methodNameTh: 'สินเชื่อ AISCB',
						details: [],
					},
					{
						method: 'QP',
						cardType: '',
						methodName: '',
						methodNameTh: 'คิวอาร์โค้ด พร้อมเพย์ ผ่าน EDC BBL',
						details: [],
					},
					{
						method: 'LS',
						cardType: '',
						methodName: '',
						methodNameTh: 'Leasing',
						details: [],
					},
					{
						method: 'AE',
						cardType: '',
						methodName: '',
						methodNameTh: 'สินเชื่อ AISCB - แอปพลิเคชั่นป๊อป',
						details: [],
					},
					{
						method: 'AL',
						cardType: '',
						methodName: '',
						methodNameTh: 'Alipay',
						details: [],
					},
					{
						method: 'AT',
						cardType: '',
						methodName: '',
						methodNameTh: 'ATM',
						details: [],
					},
					{
						method: 'C1',
						cardType: '',
						methodName: '',
						methodNameTh: 'Cash On Delivery',
						details: [],
					},
					{
						method: 'C3',
						cardType: '',
						methodName: '',
						methodNameTh: 'Payment Lazada',
						details: [],
					},
					{
						method: 'C4',
						cardType: '',
						methodName: '',
						methodNameTh: 'mPay',
						details: [],
					},
					{
						method: 'C5',
						cardType: '',
						methodName: '',
						methodNameTh: '123 Service',
						details: [],
					},
					{
						method: 'CI',
						cardType: '',
						methodName: '',
						methodNameTh: 'Pay In Bank',
						details: [],
					},
					{
						method: 'CQ',
						cardType: '',
						methodName: '',
						methodNameTh: 'Cheque',
						details: [],
					},
					{
						method: 'CS',
						cardType: '',
						methodName: '',
						methodNameTh: 'Cashier Cheque',
						details: [],
					},
					{
						method: 'EP',
						cardType: '',
						methodName: '',
						methodNameTh: 'E-Coupon',
						details: [],
					},
					{
						method: 'MB',
						cardType: '',
						methodName: '',
						methodNameTh: 'Internet Banking',
						details: [],
					},
					{
						method: 'PP',
						cardType: '',
						methodName: '',
						methodNameTh: 'Point Credit Card',
						details: [],
					},
					{
						method: 'TS',
						cardType: '',
						methodName: '',
						methodNameTh: 'Thisshop',
						details: [],
					},
					{
						method: 'VC',
						cardType: '',
						methodName: '',
						methodNameTh: 'Voucher',
						details: [],
					},
				],
			});

			mock.onPost(URLConfig.getPayments).replyOnce(StatusCodes.OK, paymentData);
			mock.onPost(URLConfig.getBanksPromotion).replyOnce(StatusCodes.OK, bankPromotion);
			const res = await request(app)
				.post(`/getPaymentsByTradeWithCondition`)
				.send({
					tradeProductId: '148545',
					tradeNo: 'TP23085208',
					locationCode: '1100',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toMatchObject({
				statusCode: '20000',
			});
		});

		it('should return error get bank promotion', async () => {
			mock.onPost(URLConfig.getPayments).networkErrorOnce();
			const res = await request(app)
				.post(`/getPaymentsByTradeWithCondition`)
				.send({
					location: '1100',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ success: false, name: 'Error', message: 'Network Error' });
		});
	});

	describe('POST /getPaymentAppleCare', () => {
		it('should return "Can\'t find Data" get payment by tradeWith Condition', async () => {
			mock.onPost(URLConfig.getBanksPromotion).replyOnce(StatusCodes.OK, undefined);
			const res = await request(app).post(`/getPaymentAppleCare`).set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		});

		it('should return get payment by tradeWith Condition success', async () => {
			const bankPromotion = {
				statusCode: '20000',
				statusDesc: 'success',
				banks: [
					{
						name: 'ซิตี้แบงก์',
						abb: 'CITI',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITI_CITI.png',
					},
					{
						name: 'ซิตี้แบงก์ เรดดี้เครดิต',
						abb: 'CITIREADY',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITIREADY_citibank02.jpg',
					},
					{
						name: 'ไทยพาณิชย์ จำกัด (มหาชน)',
						abb: 'SCB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCB_SCB02.png',
					},
					{
						name: 'กสิกรไทย จำกัด (มหาชน)',
						abb: 'KBNK',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
					},
					{
						name: 'อยุธยาคาร์ด เซอร์วิสเซส',
						abb: 'ACS',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ACS_ACS_BAY03.png',
					},
					{
						name: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
						abb: 'BAY',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
					},
					{
						name: 'บริษัทอิออนธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)',
						abb: 'AEON',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/AEON_AEON-logo.png',
					},
					{
						name: 'กรุงเทพ จำกัด (มหาชน)',
						abb: 'BBL',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
					},
					{
						name: 'แห่งประเทศจีน',
						abb: 'BOC',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BOC_BOC.png',
					},
					{
						name: 'ซีไอเอ็มบี ไทย จำกัด (มหาชน)',
						abb: 'CIMB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CIMB_CIMB.png',
					},
					{
						name: 'แคปปิตอล โอเค',
						abb: 'COK',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/COK_capOK.png',
					},
					{
						name: 'เซ็นทรัล',
						abb: 'CT',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CT_centralThe1.png',
					},
					{
						name: 'บัตรเครดิต เฟิร์สช้อยส์',
						abb: 'FCC',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/FCC_FCC.png',
					},
					{
						name: 'ออมสิน',
						abb: 'GSB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/GSB_GSB.png',
					},
					{
						name: 'ฮ่องกงแอนด์เซี่ยงไฮ้',
						abb: 'HKSH',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/HKSH_HSBC.png',
					},
					{
						name: 'กรุงไทย จำกัด (มหาชน)',
						abb: 'KTB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
					},
					{
						name: 'SCB Speedy Cash',
						abb: 'SCBSPEEDY',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCBSPEEDY_SCB Speedy.png',
					},
					{
						name: 'สแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)',
						abb: 'SCN',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCN_scn-logo.jpg',
					},
					{
						name: 'บัตรเครดิต เทสโก้ โลตัส วีซ่า',
						abb: 'TCS',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/TCS_TescoLotus-CreditCard.png',
					},
					{
						name: 'ยูโอบี จำกัด (มหาชน)',
						abb: 'UOB',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOB_UOB-bank.png',
					},
					{
						name: 'UOB Cash Plus',
						abb: 'UOBCASHP',
						imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOBCASHP_UOB CashPlus.png',
					},
					{
						name: 'ธนาคารทหารไทยธนชาต จำกัด (มหาชน)',
						abb: 'TTB',
						imageUrl:
							'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/997f660d-2074-464c-b963-6d23284bdcdb.jpeg',
					},
				],
			};

			ConfigMenuModel.findOne = jest.fn();

			mock.onPost(URLConfig.getBanksPromotion).replyOnce(StatusCodes.OK, bankPromotion);
			const res = await request(app).post(`/getPaymentAppleCare`).set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.OK);
			expect(res.body).toMatchObject({
				statusCode: '20000',
			});
		});

		it('should return error get bank promotion', async () => {
			mock.onPost(URLConfig.getBanksPromotion).networkErrorOnce();
			const res = await request(app)
				.post(`/getPaymentAppleCare`)
				.send({
					location: '1100',
				})
				.set('x-authorization', jwtToken);
			expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
			expect(res.body).toEqual({ success: false, name: 'Error', message: 'Network Error' });
		});
	});
});

describe('POST /payment-for-partner', () => {
	let token: string;

	beforeEach(() => {
		token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMjA4MDExMDI4IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsIm91IjoiIiwicm9sZSI6IkFJUyIsImlhdCI6MTY1ODIwMTMzMCwiZXhwIjo5OTk5OTk5OTk5fQ.kOZBPz6u26O0AOYQR2Q8vimJxA_-plkD3x_Wk0kou2g';
	});

	afterEach(() => {
		mock.reset();
	});

	it('should return response payment for partner', async () => {
		const requestData = {
			brand: 'APPLE',
			model: 'IPHONEXSM256',
			color: 'GOLD',
			netprice: '2920',
			installment: true,
			isdevileonly: 'Y',
			tradeProductId: '148541',
			tradeNo: 'TP23085207',
			locationCode: '97439',
			outChnSalesCode: 'ASP',
		};

		const mockData = {
			statusCode: '20000',
			statusDesc: 'Success',
			payments: [
				{
					method: 'CA',
					cardType: '',
					banks: [],
					banksFullPaid: [],
					banksInstallment: [],
					methodName: 'Cash',
					methodNameTh: 'เงินสด (เต็มจำนวน)',
				},
				{
					method: 'LS',
					cardType: '',
					banks: [],
					banksFullPaid: [],
					banksInstallment: [
						{
							bankAbbr: 'AISCB',
							bankDescTh: 'AISCB',
							bankDescEn: 'AISCB',
							imageUrl: null,
							installments: [
								{
									installmentId: 161881297,
									installmentRate: 0,
									installmentTerms: '0',
									balloonMonth: null,
									minimumAmount: 1,
									cardDigits: 21,
								},
							],
						},
					],
					methodName: 'Leasing',
					methodNameTh: 'สินเชื่อ',
				},
				{
					method: 'CC',
					cardType: 'MIXED',
					banks: [],
					banksFullPaid: [
						{
							bankAbbr: 'CITI',
							bankDescTh: 'ซิตี้แบงก์',
							bankDescEn: 'ซิตี้แบงก์',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITI_CITI.png',
						},
						{
							bankAbbr: 'CITIREADY',
							bankDescTh: 'ซิตี้แบงก์ เรดดี้เครดิต',
							bankDescEn: 'ซิตี้แบงก์ เรดดี้เครดิต',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITIREADY_citibank02.jpg',
						},
						{
							bankAbbr: 'SCB',
							bankDescTh: 'ไทยพาณิชย์ จำกัด (มหาชน)',
							bankDescEn: 'ไทยพาณิชย์ จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCB_SCB02.png',
						},
						{
							bankAbbr: 'KBNK',
							bankDescTh: 'กสิกรไทย จำกัด (มหาชน)',
							bankDescEn: 'กสิกรไทย จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
						},
						{
							bankAbbr: 'ACS',
							bankDescTh: 'อยุธยาคาร์ด เซอร์วิสเซส',
							bankDescEn: 'อยุธยาคาร์ด เซอร์วิสเซส',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ACS_ACS_BAY03.png',
						},
						{
							bankAbbr: 'BAY',
							bankDescTh: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
							bankDescEn: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
						},
						{
							bankAbbr: 'AEON',
							bankDescTh: 'บริษัทอิออนธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)',
							bankDescEn: 'บริษัทอิออนธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/AEON_AEON-logo.png',
						},
						{
							bankAbbr: 'BBL',
							bankDescTh: 'กรุงเทพ จำกัด (มหาชน)',
							bankDescEn: 'กรุงเทพ จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
						},
						{
							bankAbbr: 'BOC',
							bankDescTh: 'แห่งประเทศจีน',
							bankDescEn: 'แห่งประเทศจีน',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BOC_BOC.png',
						},
						{
							bankAbbr: 'CIMB',
							bankDescTh: 'ซีไอเอ็มบี ไทย จำกัด (มหาชน)',
							bankDescEn: 'ซีไอเอ็มบี ไทย จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CIMB_CIMB.png',
						},
						{
							bankAbbr: 'COK',
							bankDescTh: 'แคปปิตอล โอเค',
							bankDescEn: 'แคปปิตอล โอเค',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/COK_capOK.png',
						},
						{
							bankAbbr: 'CT',
							bankDescTh: 'เซ็นทรัล',
							bankDescEn: 'เซ็นทรัล',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CT_centralThe1.png',
						},
						{
							bankAbbr: 'FCC',
							bankDescTh: 'บัตรเครดิต เฟิร์สช้อยส์',
							bankDescEn: 'บัตรเครดิต เฟิร์สช้อยส์',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/FCC_FCC.png',
						},
						{
							bankAbbr: 'GSB',
							bankDescTh: 'ออมสิน',
							bankDescEn: 'ออมสิน',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/GSB_GSB.png',
						},
						{
							bankAbbr: 'HKSH',
							bankDescTh: 'ฮ่องกงแอนด์เซี่ยงไฮ้',
							bankDescEn: 'ฮ่องกงแอนด์เซี่ยงไฮ้',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/HKSH_HSBC.png',
						},
						{
							bankAbbr: 'KTB',
							bankDescTh: 'กรุงไทย จำกัด (มหาชน)',
							bankDescEn: 'กรุงไทย จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
						},
						{
							bankAbbr: 'SCBSPEEDY',
							bankDescTh: 'SCB Speedy Cash',
							bankDescEn: 'SCB Speedy Cash',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCBSPEEDY_SCB Speedy.png',
						},
						{
							bankAbbr: 'SCN',
							bankDescTh: 'สแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)',
							bankDescEn: 'สแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/SCN_scn-logo.jpg',
						},
						{
							bankAbbr: 'TCS',
							bankDescTh: 'บัตรเครดิต เทสโก้ โลตัส วีซ่า',
							bankDescEn: 'บัตรเครดิต เทสโก้ โลตัส วีซ่า',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/TCS_TescoLotus-CreditCard.png',
						},
						{
							bankAbbr: 'UOB',
							bankDescTh: 'ยูโอบี จำกัด (มหาชน)',
							bankDescEn: 'ยูโอบี จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOB_UOB-bank.png',
						},
						{
							bankAbbr: 'UOBCASHP',
							bankDescTh: 'UOB Cash Plus',
							bankDescEn: 'UOB Cash Plus',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOBCASHP_UOB CashPlus.png',
						},
						{
							bankAbbr: 'TTB',
							bankDescTh: 'ธนาคารทหารไทยธนชาต จำกัด (มหาชน)',
							bankDescEn: 'ธนาคารทหารไทยธนชาต จำกัด (มหาชน)',
							imageUrl:
								'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/997f660d-2074-464c-b963-6d23284bdcdb.jpeg',
						},
					],
					banksInstallment: [
						{
							bankAbbr: 'UOBR',
							bankDescTh: 'UOB RADANASIN BANK PUBLIC COMPANY LIMITED',
							bankDescEn: 'ยูโอบี รัตนสิน จำกัด (มหาชน)',
							imageUrl: null,
							installments: [
								{
									installmentId: 9772275,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'UOB',
							bankDescTh: 'UNITED OVERSEAS BANK(THAI)PUBLIC COMPANY LIMITED',
							bankDescEn: 'ยูโอบี จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOB_UOB-bank.png',
							installments: [
								{
									installmentId: 10772275,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'RSB',
							bankDescTh: 'RADANASIN  BANK PUBLIC COMPANY LIMITED',
							bankDescEn: 'รัตนสิน จำกัด (มหาชน)',
							imageUrl: null,
							installments: [
								{
									installmentId: 11772275,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'KTB',
							bankDescTh: 'KRUNG THAI BANK PUBLIC COMPANY LIMITED',
							bankDescEn: 'กรุงไทย จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
							installments: [
								{
									installmentId: 12766274,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'KBNK',
							bankDescTh: 'KASIKORNBANK PUBLIC COMPANY LIMITED',
							bankDescEn: 'กสิกรไทย จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
							installments: [
								{
									installmentId: 14764271,
									installmentRate: 0,
									installmentTerms: '4',
									balloonMonth: null,
									minimumAmount: 2000,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'CTPL',
							bankDescTh: 'PAY LITE',
							bankDescEn: 'โครงการผ่อนชำระผ่านบัตรเครดิตCITI BANK',
							imageUrl: null,
							installments: [
								{
									installmentId: 18760268,
									installmentRate: 0,
									installmentTerms: '4',
									balloonMonth: null,
									minimumAmount: 2000,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'CITI',
							bankDescTh: 'CITIBANK N.A.',
							bankDescEn: 'ซิตี้แบงก์',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITI_CITI.png',
							installments: [
								{
									installmentId: 15760268,
									installmentRate: 0,
									installmentTerms: '4',
									balloonMonth: null,
									minimumAmount: 2000,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'CICC',
							bankDescTh: 'Citibank Clear Card',
							bankDescEn: 'บัตรเครดิต Citibank Clear Card',
							imageUrl: null,
							installments: [
								{
									installmentId: 17760268,
									installmentRate: 0,
									installmentTerms: '4',
									balloonMonth: null,
									minimumAmount: 2000,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'TAA',
							bankDescTh: 'Thai AirAsia Credit Card',
							bankDescEn: 'บัตรเครดิต ไทยแอร์เอเชีย',
							imageUrl: null,
							installments: [
								{
									installmentId: 19754267,
									installmentRate: 0,
									installmentTerms: '4',
									balloonMonth: null,
									minimumAmount: 2000,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'BBL',
							bankDescTh: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
							bankDescEn: 'กรุงเทพ จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
							installments: [
								{
									installmentId: 4754267,
									installmentRate: 0,
									installmentTerms: '4',
									balloonMonth: null,
									minimumAmount: 2000,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'TCS',
							bankDescTh: 'TESCO LOTUS VISA CARD',
							bankDescEn: 'บัตรเครดิต เทสโก้ โลตัส วีซ่า',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/TCS_TescoLotus-CreditCard.png',
							installments: [
								{
									installmentId: 22756264,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'SPV',
							bankDescTh: 'Simple Visa Credit Card',
							bankDescEn: 'บัตรเครดิตซิมเพิล วีซ่า',
							imageUrl: null,
							installments: [
								{
									installmentId: 25756264,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'ROB',
							bankDescTh: 'Robinson Visa Card',
							bankDescEn: 'บัตรเครดิต โรบินสัน คาร์ด',
							imageUrl: null,
							installments: [
								{
									installmentId: 21756264,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'HPV',
							bankDescTh: 'Home Pro Visa Credit Card',
							bankDescEn: 'บัตรเครดิตโฮมโปร วีซ่า',
							imageUrl: null,
							installments: [
								{
									installmentId: 24756264,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'CT',
							bankDescTh: 'Central',
							bankDescEn: 'เซ็นทรัล',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CT_centralThe1.png',
							installments: [
								{
									installmentId: 20756264,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'BAY',
							bankDescTh: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
							bankDescEn: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
							installments: [
								{
									installmentId: 5756264,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
						{
							bankAbbr: 'ACS',
							bankDescTh: 'Ayudlhya Card Services',
							bankDescEn: 'อยุธยาคาร์ด เซอร์วิสเซส',
							imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ACS_ACS_BAY03.png',
							installments: [
								{
									installmentId: 23756264,
									installmentRate: 0,
									installmentTerms: '3',
									balloonMonth: null,
									minimumAmount: 1500,
									cardDigits: 16,
								},
							],
						},
					],
					methodName: 'Credit Card',
					methodNameTh: 'บัตรเครดิต',
				},
			],
		};

		PaymentService.getPaymentsForPartner = jest.fn().mockResolvedValue(mockData);
		PaymentService.getPayments = jest.fn();
		ConfigMenuModel.findOne = jest.fn();

		const response = await request(app)
			.post('/payment-for-partner')
			.set('x-authorization', `Bearer ${token}`)
			.send(requestData);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual(mockData);
	});
});

describe('POST /query-card-info', () => {
	let token: string;

	beforeEach(() => {
		token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMjA4MDExMDI4IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsIm91IjoiIiwicm9sZSI6IkFJUyIsImlhdCI6MTY1ODIwMTMzMCwiZXhwIjo5OTk5OTk5OTk5fQ.kOZBPz6u26O0AOYQR2Q8vimJxA_-plkD3x_Wk0kou2g';
	});

	afterEach(() => {
		mock.reset();
	});

	it('should return queried card information', async () => {
		const mockData = {
			resultCode: '20000',
			resultDescription: 'Success',
			prefixCard: '490734',
			paymentMethod: 'CREDIT',
			cardCategory: 'CREDIT',
			bankAbbr: 'KTC',
			bankCode: '002',
			bankNameTh: 'ธนาคารกรุงไทย',
			bankNameEn: 'KRUNGTHAI BANK',
			cardType: 'VISA',
		};

		const requestData = {
			prefixCard: '490734',
			cardCategory: 'CREDIT',
		};

		mock.onPost(URLConfig.queryCardInfo).reply(StatusCodes.OK, mockData);
		const response = await request(app)
			.post(`/query-card-info`)
			.set('x-authorization', `Bearer ${token}`)
			.send(requestData);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual(mockData);
	});

	it("should return message when can't find data", async () => {
		const requestData = {
			prefixCard: '490734',
			cardCategory: 'CREDIT',
		};

		mock.onPost(URLConfig.queryCardInfo).reply(StatusCodes.OK, null);

		const response = await request(app)
			.post('/query-card-info')
			.set('x-authorization', `Bearer ${token}`)
			.send(requestData);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle errors', async () => {
		const requestData = {
			prefixCard: '490734',
			cardCategory: 'CREDIT',
		};

		mock.onPost(URLConfig.queryCardInfo).reply(StatusCodes.NOT_IMPLEMENTED, 'Error occurred');

		const response = await request(app)
			.post('/query-card-info')
			.set('x-authorization', `Bearer ${token}`)
			.send(requestData);

		expect(response.status).toBe(StatusCodes.NOT_IMPLEMENTED);
	});
});

describe('POST /installments-for-partner', () => {
	let token: string;

	beforeEach(() => {
		token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMjA4MDExMDI4IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsIm91IjoiIiwicm9sZSI6IkFJUyIsImlhdCI6MTY1ODIwMTMzMCwiZXhwIjo5OTk5OTk5OTk5fQ.kOZBPz6u26O0AOYQR2Q8vimJxA_-plkD3x_Wk0kou2g';
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return queried card information', async () => {
		const mockData = {
			statusCode: '20000',
			statusDesc: 'Success',
			data: [
				{
					bankGroupName: 'ธนาคารกรุงไทย',
					handsetOnlyFlag: 'Y',
					bankFlag: 'Y',
					campaignOnlyFlag: 'Y',
					banks: [
						{
							id: '002',
							bankAbbr: 'CT',
							bankDescitionEn: 'Central',
							bankDescitionTh: 'เซ็นทรัล',
							cardDigits: '16',
							imageUrl: 'https://cpc.ais.co.th/.../CT.jpg',
							installmentTerms: 10,
							minimumAmount: 3000.0,
						},
					],
				},
			],
		};

		const requestData = {
			brand: 'APPLE',
			model: 'IP11_128GB',
			color: 'BLUE',
		};

		mock.onPost(URLConfig.getInstallmentsForPartner).reply(StatusCodes.OK, mockData);

		const response = await request(app)
			.post('/installments-for-partner')
			.set('x-authorization', `Bearer ${token}`)
			.send(requestData);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual(mockData);
	});

	it("should return message when can't find data", async () => {
		mock.onPost(URLConfig.getInstallmentsForPartner).reply(StatusCodes.OK, null);

		const response = await request(app)
			.post('/installments-for-partner')
			.set('x-authorization', `Bearer ${token}`)
			.send({
				brand: 'APPLE',
				model: 'IP11_128GB',
				color: 'BLUE',
			});

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual({ message: "Can't find Data" });
	});

	it('should handle errors', async () => {
		mock.onPost(URLConfig.getInstallmentsForPartner).reply(StatusCodes.NOT_IMPLEMENTED, 'Error occurred');

		const response = await request(app)
			.post('/installments-for-partner')
			.set('x-authorization', `Bearer ${token}`)
			.send({
				brand: 'APPLE',
				model: 'IP11_128GB',
				color: 'BLUE',
			});

		expect(response.status).toBe(StatusCodes.NOT_IMPLEMENTED);
	});
});

describe('GET /loan-address/:name', () => {
	const mockDataLoanAddress = {
		buildingName: 'เอไอเอ แคปปิตอลเซ็นเตอร์',
		floor: '3',
		zipCode: '10400',
		homeNo: '89',
		room: '',
		mooBan: '',
		soi: '',
		street: 'รัชดาภิเษก',
		tumbol: 'ดินแดง',
		amphur: 'ดินแดง',
		province: 'กรุงเทพมหานคร',
	};

	it('should return loan address by name', async () => {
		const name = 'kbj';
		LoanAddressModel.findOne = jest.fn().mockResolvedValue(mockDataLoanAddress);
		const res = await request(app).get(`/loan-address/${name}`);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({
			name: 'kbj',
			address: {
				buildingName: 'เอไอเอ แคปปิตอลเซ็นเตอร์',
				floor: '3',
				zipCode: '10400',
				homeNo: '89',
				room: '',
				mooBan: '',
				soi: '',
				street: 'รัชดาภิเษก',
				tumbol: 'ดินแดง',
				amphur: 'ดินแดง',
				province: 'กรุงเทพมหานคร',
			},
		});
	});
});

describe('POST /payment-campaign-partner', () => {
	let token: string;

	beforeEach(() => {
		token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMjA4MDExMDI4IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsIm91IjoiIiwicm9sZSI6IkFJUyIsImlhdCI6MTY1ODIwMTMzMCwiZXhwIjo5OTk5OTk5OTk5fQ.kOZBPz6u26O0AOYQR2Q8vimJxA_-plkD3x_Wk0kou2g';
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should send brand, model and color return payment for partner', async () => {
		const mockBody = {
			brand: 'APPLE',
			model: 'IPHONEXSM256',
			color: 'GOLD',
		};

		const mockData = {
			method: 'CC',
			cardType: 'MIXED',
			banks: [
				{
					bankAbbr: 'UOBR',
					bankDescTh: 'UOB RADANASIN BANK PUBLIC COMPANY LIMITED',
					bankDescEn: 'ยูโอบี รัตนสิน จำกัด (มหาชน)',
					imageUrl: null,
					installments: [
						{
							installmentId: 9772275,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 9773275,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 9774275,
							installmentRate: 0,
							installmentTerms: '15',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 9775275,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 5400,
							cardDigits: 16,
						},
						{
							installmentId: 9776275,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 7200,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'UOB',
					bankDescTh: 'UNITED OVERSEAS BANK(THAI)PUBLIC COMPANY LIMITED',
					bankDescEn: 'ยูโอบี จำกัด (มหาชน)',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/UOB_UOB-bank.png',
					installments: [
						{
							installmentId: 10772275,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 10773275,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 10774275,
							installmentRate: 0,
							installmentTerms: '15',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 10775275,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 5400,
							cardDigits: 16,
						},
						{
							installmentId: 10776275,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 7200,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'RSB',
					bankDescTh: 'RADANASIN  BANK PUBLIC COMPANY LIMITED',
					bankDescEn: 'รัตนสิน จำกัด (มหาชน)',
					imageUrl: null,
					installments: [
						{
							installmentId: 11772275,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 11773275,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 11774275,
							installmentRate: 0,
							installmentTerms: '15',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 11775275,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 5400,
							cardDigits: 16,
						},
						{
							installmentId: 11776275,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 7200,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'THIS',
					bankDescTh: 'THIS SHOP',
					bankDescEn: 'THIS SHOP',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/THIS_thpshp-logo.jpg',
					installments: [
						{
							installmentId: 102744280,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
						{
							installmentId: 102743280,
							installmentRate: 0,
							installmentTerms: '6',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
						{
							installmentId: 102741280,
							installmentRate: 0,
							installmentTerms: '9',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
						{
							installmentId: 102746280,
							installmentRate: 0,
							installmentTerms: '12',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
						{
							installmentId: 102742280,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
					],
				},
				{
					bankAbbr: 'KTB',
					bankDescTh: 'KRUNG THAI BANK PUBLIC COMPANY LIMITED',
					bankDescEn: 'กรุงไทย จำกัด (มหาชน)',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KTB_KTB.png',
					installments: [
						{
							installmentId: 12766274,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 12767274,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'FCC',
					bankDescTh: 'Frist Choice Credit Card',
					bankDescEn: 'บัตรเครดิต เฟิร์สช้อยส์',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/FCC_FCC.png',
					installments: [
						{
							installmentId: 13758273,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 13759273,
							installmentRate: 0,
							installmentTerms: '15',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'KBJ',
					bankDescTh: 'KB J Capital',
					bankDescEn: 'KB J Capital',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBJ_logo-kashjoy.jpg',
					installments: [
						{
							installmentId: 121745279,
							installmentRate: 0,
							installmentTerms: '12',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
						{
							installmentId: 121747279,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
						{
							installmentId: 121748279,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 3000,
							cardDigits: 18,
						},
					],
				},
				{
					bankAbbr: 'KBNK',
					bankDescTh: 'KASIKORNBANK PUBLIC COMPANY LIMITED',
					bankDescEn: 'กสิกรไทย จำกัด (มหาชน)',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/KBNK_kBank02.png',
					installments: [
						{
							installmentId: 14764271,
							installmentRate: 0,
							installmentTerms: '4',
							balloonMonth: null,
							minimumAmount: 2000,
							cardDigits: 16,
						},
						{
							installmentId: 14765271,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'CTPL',
					bankDescTh: 'PAY LITE',
					bankDescEn: 'โครงการผ่อนชำระผ่านบัตรเครดิตCITI BANK',
					imageUrl: null,
					installments: [
						{
							installmentId: 18760268,
							installmentRate: 0,
							installmentTerms: '4',
							balloonMonth: null,
							minimumAmount: 2000,
							cardDigits: 16,
						},
						{
							installmentId: 18761268,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 18762268,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 5400,
							cardDigits: 16,
						},
						{
							installmentId: 18763268,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 7200,
							cardDigits: 16,
						},
						{
							installmentId: 18751268,
							installmentRate: 0,
							installmentTerms: '30',
							balloonMonth: null,
							minimumAmount: 9000,
							cardDigits: 16,
						},
						{
							installmentId: 18752268,
							installmentRate: 0,
							installmentTerms: '40',
							balloonMonth: null,
							minimumAmount: 12000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'CITI',
					bankDescTh: 'CITIBANK N.A.',
					bankDescEn: 'ซิตี้แบงก์',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CITI_CITI.png',
					installments: [
						{
							installmentId: 15760268,
							installmentRate: 0,
							installmentTerms: '4',
							balloonMonth: null,
							minimumAmount: 2000,
							cardDigits: 16,
						},
						{
							installmentId: 15761268,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 15762268,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 5400,
							cardDigits: 16,
						},
						{
							installmentId: 15763268,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 7200,
							cardDigits: 16,
						},
						{
							installmentId: 15751268,
							installmentRate: 0,
							installmentTerms: '30',
							balloonMonth: null,
							minimumAmount: 9000,
							cardDigits: 16,
						},
						{
							installmentId: 15752268,
							installmentRate: 0,
							installmentTerms: '40',
							balloonMonth: null,
							minimumAmount: 12000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'CICC',
					bankDescTh: 'Citibank Clear Card',
					bankDescEn: 'บัตรเครดิต Citibank Clear Card',
					imageUrl: null,
					installments: [
						{
							installmentId: 17760268,
							installmentRate: 0,
							installmentTerms: '4',
							balloonMonth: null,
							minimumAmount: 2000,
							cardDigits: 16,
						},
						{
							installmentId: 17761268,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 17762268,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 5400,
							cardDigits: 16,
						},
						{
							installmentId: 17763268,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 7200,
							cardDigits: 16,
						},
						{
							installmentId: 17751268,
							installmentRate: 0,
							installmentTerms: '30',
							balloonMonth: null,
							minimumAmount: 9000,
							cardDigits: 16,
						},
						{
							installmentId: 17752268,
							installmentRate: 0,
							installmentTerms: '40',
							balloonMonth: null,
							minimumAmount: 12000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'TAA',
					bankDescTh: 'Thai AirAsia Credit Card',
					bankDescEn: 'บัตรเครดิต ไทยแอร์เอเชีย',
					imageUrl: null,
					installments: [
						{
							installmentId: 19754267,
							installmentRate: 0,
							installmentTerms: '4',
							balloonMonth: null,
							minimumAmount: 2000,
							cardDigits: 16,
						},
						{
							installmentId: 19755267,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'BBL',
					bankDescTh: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
					bankDescEn: 'กรุงเทพ จำกัด (มหาชน)',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BBL_BBL.png',
					installments: [
						{
							installmentId: 4754267,
							installmentRate: 0,
							installmentTerms: '4',
							balloonMonth: null,
							minimumAmount: 2000,
							cardDigits: 16,
						},
						{
							installmentId: 4755267,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'TCS',
					bankDescTh: 'TESCO LOTUS VISA CARD',
					bankDescEn: 'บัตรเครดิต เทสโก้ โลตัส วีซ่า',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/TCS_TescoLotus-CreditCard.png',
					installments: [
						{
							installmentId: 22756264,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 22757264,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'SPV',
					bankDescTh: 'Simple Visa Credit Card',
					bankDescEn: 'บัตรเครดิตซิมเพิล วีซ่า',
					imageUrl: null,
					installments: [
						{
							installmentId: 25756264,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 25757264,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'ROB',
					bankDescTh: 'Robinson Visa Card',
					bankDescEn: 'บัตรเครดิต โรบินสัน คาร์ด',
					imageUrl: null,
					installments: [
						{
							installmentId: 21756264,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 21757264,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'HPV',
					bankDescTh: 'Home Pro Visa Credit Card',
					bankDescEn: 'บัตรเครดิตโฮมโปร วีซ่า',
					imageUrl: null,
					installments: [
						{
							installmentId: 24756264,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 24757264,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'CT',
					bankDescTh: 'Central',
					bankDescEn: 'เซ็นทรัล',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/CT_centralThe1.png',
					installments: [
						{
							installmentId: 20756264,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 20757264,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'BAY',
					bankDescTh: 'BANK OF AYUDHAYA PUBLIC COMPANY LIMITED',
					bankDescEn: 'กรุงศรีอยุธยา จำกัด (มหาชน)',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/BAY_BAY.png',
					installments: [
						{
							installmentId: 5756264,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 5757264,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'ACS',
					bankDescTh: 'Ayudlhya Card Services',
					bankDescEn: 'อยุธยาคาร์ด เซอร์วิสเซส',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/ACS_ACS_BAY03.png',
					installments: [
						{
							installmentId: 23756264,
							installmentRate: 0,
							installmentTerms: '3',
							balloonMonth: null,
							minimumAmount: 1500,
							cardDigits: 16,
						},
						{
							installmentId: 23757264,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
				{
					bankAbbr: 'AISCB',
					bankDescTh: 'AISCB',
					bankDescEn: 'AISCB',
					imageUrl: null,
					installments: [
						{
							installmentId: 161881297,
							installmentRate: 0,
							installmentTerms: '0',
							balloonMonth: null,
							minimumAmount: 1,
							cardDigits: 21,
						},
					],
				},
				{
					bankAbbr: 'AEON',
					bankDescTh: 'AEON THANA SINSAP (THAILAND) PCL.',
					bankDescEn: 'บริษัทอิออนธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)',
					imageUrl: 'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/AEON_AEON-logo.png',
					installments: [
						{
							installmentId: 141777261,
							installmentRate: 0,
							installmentTerms: '10',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 141778261,
							installmentRate: 0,
							installmentTerms: '12',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 141779261,
							installmentRate: 0,
							installmentTerms: '15',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 141749261,
							installmentRate: 0,
							installmentTerms: '18',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 141780261,
							installmentRate: 0,
							installmentTerms: '20',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
						{
							installmentId: 141750261,
							installmentRate: 0,
							installmentTerms: '24',
							balloonMonth: null,
							minimumAmount: 5000,
							cardDigits: 16,
						},
					],
				},
			],
			banksFullPaid: [],
			banksInstallment: [],
			methodName: 'Credit Card & LS',
			methodNameTh: 'บัตรเครดิต และสินเชื่อ',
		};

		PaymentService.getInstallmentsForPartner = jest.fn();
		PaymentService.getPaymentPartnerByCampaign = jest.fn().mockResolvedValue(mockData);

		const response = await request(app)
			.post('/payment-campaign-partner')
			.set('x-authorization', `Bearer ${token}`)
			.send(mockBody);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual(mockData);
	});
});