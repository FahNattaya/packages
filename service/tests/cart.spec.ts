import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { ShareTransactions } from '../src/models/shareTransaction.model';
import request from 'supertest';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import router from '../src/modules/cart/cart.route';
import { CartService } from '../src/modules/cart/cart.service';
const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MTEwOTU1IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA5MzQwMDA2MjQiLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjg5MDQ0MTEyLCJleHAiOjk5OTk5OTk5OTl9.IYWZfvvlaBn9AhpvnWz42aLFZGdu7HbLUiSA-8VsKBI';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

jest.mock('../src/modules/cart/cart.service');

describe('GET /list/:mobileNo', () => {
	it('should return "Can\'t find Data" when token is valid', async () => {
		ShareTransactions.find = jest.fn();
		const mobileNo = '0912345678';
		const res = await request(app)
			.get(`/list/${mobileNo}`)
			.query({ locationCode: '1100' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should validation errors invalid locationCode ', async () => {
		const mobileNo = '0612345678';
		const res = await request(app).get(`/list/${mobileNo}`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toEqual({ message: 'Validation errors', errors: `Invalid value locationCode` });
	});

	it('should validation errors invalid mobileNo ', async () => {
		const mobileNo = '134';
		const res = await request(app).get(`/list/${mobileNo}`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toEqual({ message: 'Validation errors', errors: `Invalid value mobileNo` });
	});

	it('should cartListByMobileNo errors ', async () => {
		CartService.cartListByMobileNo = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const mobileNo = '0912345678';
		const res = await request(app)
			.get(`/list/${mobileNo}`)
			.query({ locationCode: '1100' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});

	it('should cartListByMobileNo show list number ', async () => {
		CartService.cartListByMobileNo = jest.fn().mockResolvedValue({ mobileNo: '1234' });
		const mobileNo = '0912345678';
		const res = await request(app)
			.get(`/list/${mobileNo}`)
			.query({ locationCode: '1100' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ mobileNo: '1234' });
	});
});

describe('POST /add-cart-list', () => {
	it('should return "Can\'t find Data" when token is valid', async () => {
		const res = await request(app)
			.post(`/add-cart-list`)
			.send({
				locationSource: '123',
				locationReceipt: '123',
				userId: '123',
				cusNameOrder: '123',
				soChannelType: '123',
				soDocumentType: '123',
				productList: ['123'],
				grandTotalAmt: '123',
				preBookingNo: '123',
				reserveNo: '123',
				subStockDestination: '123',
				storeName: '123',
			})
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't find Data" });
	});

	it('should validation error retrun ', async () => {
		const res = await request(app)
			.post(`/add-cart-list`)
			.send({
				locationSource: '',
				locationReceipt: '123',
				userId: '123',
				cusNameOrder: '123',
				soChannelType: '123',
				soDocumentType: '123',
				productList: ['123'],
				grandTotalAmt: '123',
				preBookingNo: '123',
				reserveNo: '123',
				subStockDestination: '123',
				storeName: '123',
			})
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toEqual({ message: 'Validation errors', errors: `Invalid value locationSource` });
	});

	it('should return add to cart list success', async () => {
		CartService.addToCartList = jest.fn().mockResolvedValue({ soid: '1234' });
		const res = await request(app)
			.post(`/add-cart-list`)
			.send({
				locationSource: '123',
				locationReceipt: '123',
				userId: '123',
				cusNameOrder: '123',
				soChannelType: '123',
				soDocumentType: '123',
				productList: ['123'],
				grandTotalAmt: '123',
				preBookingNo: '123',
				reserveNo: '123',
				subStockDestination: '123',
				storeName: '123',
			})
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({
			resultCode: '2000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: { soid: '1234' },
		});
	});

	it('should add cart list error status 501 ', async () => {
		CartService.addToCartList = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const res = await request(app)
			.post(`/add-cart-list`)
			.send({
				locationSource: '123',
				locationReceipt: '123',
				userId: '123',
				cusNameOrder: '123',
				soChannelType: '123',
				soDocumentType: '123',
				productList: ['123'],
				grandTotalAmt: '123',
				preBookingNo: '123',
				reserveNo: '123',
				subStockDestination: '123',
				storeName: '123',
			})
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});
});

describe('POST /create-transaction', () => {
	it('should return "Can\'t create transaction" ', async () => {
		const res = await request(app)
			.post(`/create-transaction`)
			.send({
				soid: '123',
			})
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't create transaction" });
	});

	it('should return create transaction status code 501" ', async () => {
		CartService.createSharedTransaction = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const res = await request(app)
			.post(`/create-transaction`)
			.send({
				soid: '123',
			})
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});

	it('should return create transaction success" ', async () => {
		CartService.createSharedTransaction = jest.fn().mockResolvedValue({
			TRANSACTION_ID: 'new3a705da797782b5',
			DATA: {
				soid: '123',
			},
			CREATE_BY: 'Jest test',
			CREATE_DATE: '2023-08-23T07:15:16.427Z',
			LAST_UPDATE_BY: '',
			LAST_UPDATE_DATE: '',
		});
		const res = await request(app)
			.post(`/create-transaction`)
			.send({
				soid: '123',
			})
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({
			TRANSACTION_ID: 'new3a705da797782b5',
			DATA: {
				soid: '123',
			},
			CREATE_BY: 'Jest test',
			CREATE_DATE: '2023-08-23T07:15:16.427Z',
			LAST_UPDATE_BY: '',
			LAST_UPDATE_DATE: '',
		});
	});
});

describe('POST /create-order-list', () => {
	it('should return "Can\'t create order list" when token is valid', async () => {
		const res = await request(app).post(`/create-order-list`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't create order list" });
	});

	it('should return create create order list success', async () => {
		CartService.createOrderListService = jest.fn().mockResolvedValue({
			status: '2000',
			statusTest: '500',
			client: 'DT',
			nodeName: 'DT',
			apiName: 'createOrderList',
		});
		const res = await request(app).post(`/create-order-list`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({
			status: '2000',
			statusTest: '500',
			client: 'DT',
			nodeName: 'DT',
			apiName: 'createOrderList',
		});
	});

	it('should return errro create order list status 501', async () => {
		CartService.createOrderListService = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const res = await request(app).post(`/create-order-list`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});
});

describe('POST /update/:transactionId', () => {
	it('should return "Can\'t find Data" when token is valid', async () => {
		const transactionId = '1234123';
		const res = await request(app).post(`/update/${transactionId}`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't update transaction" });
	});

	it('should return update  transactionId', async () => {
		const transactionId = '1234123';
		CartService.updateShareTransactions = jest.fn().mockResolvedValue({ transactionId: '1234' });
		const res = await request(app).post(`/update/${transactionId}`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ transactionId: '1234' });
	});

	it('should return error  update transactionId status 501', async () => {
		const transactionId = '1234123';
		CartService.updateShareTransactions = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const res = await request(app).post(`/update/${transactionId}`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});
});

describe('POST /delete/transactions', () => {
	it('should return "Can\'t find Data" when token is valid', async () => {
		const res = await request(app)
			.post(`/delete/transactions`)
			.send({ transactionId: ['123'], soId: '123', userId: '12312' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't update transaction" });
	});

	it('should return remove share transactions success', async () => {
		CartService.removeShareTransactions = jest.fn().mockResolvedValue({ message: 'Success' });
		const res = await request(app)
			.post(`/delete/transactions`)
			.send({ transactionId: ['123'], soId: '123', userId: '12312' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: 'Success' });
	});

	it('should return errro create order list status 501', async () => {
		CartService.removeShareTransactions = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const res = await request(app)
			.post(`/delete/transactions`)
			.send({ transactionId: ['123'], soId: '123', userId: '12312' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});
});

describe('POST /updatePayments/:transactionId', () => {
	it('should return "Can\'t update transaction" ', async () => {
		const transactionId = '1234';
		const res = await request(app)
			.post(`/updatePayments/${transactionId}`)
			.send({ data: 'test' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: "Can't update transaction" });
	});

	it('should return update payment share transactions success', async () => {
		CartService.updatePaymentShareTransactions = jest.fn().mockResolvedValue({ message: 'Success' });
		const transactionId = '1234';
		const res = await request(app)
			.post(`/updatePayments/${transactionId}`)
			.send({ data: 'test' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ message: 'Success' });
	});

	it('should return errro update payment share transactions status 501', async () => {
		CartService.updatePaymentShareTransactions = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const transactionId = '1234';
		const res = await request(app)
			.post(`/updatePayments/${transactionId}`)
			.send({ data: 'test' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});
});
