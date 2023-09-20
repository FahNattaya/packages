import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { StatusCodes } from 'http-status-codes';
import { URLConfig } from '../src/config/url.config';
import { ServiceCareService } from '../src/modules/service-care/service-care.service';
import express from 'express';
import bodyParser from 'body-parser';
import router from '../src/modules/service-care/service-care.route';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import request from 'supertest';

const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MjUxNjU5IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA5MzQwMDA2MjQiLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjkwMjc5MTgwLCJleHAiOjk5OTk5OTk5OTl9.21PhEJXNrN7zGWCtyzYl7JAKbJ0T_v3sGAnIG0gJMoQ';

const app = express();
const mock = new MockAdapter(axios);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

describe('mobileCareService', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should sort array in ascending order by priceInclVat', () => {
		const array = [
			{ customAttributes: { priceInclVat: 100 } },
			{ customAttributes: { priceInclVat: 75 } },
			{ customAttributes: { priceInclVat: 150 } },
			{ customAttributes: { priceInclVat: 50 } },
		];

		const sortedArray = ServiceCareService.sortByPrice(array, 'asc');

		// Check if the sortedArray is sorted correctly in ascending order
		for (let i = 0; i < sortedArray.length - 1; i++) {
			expect(sortedArray[i].customAttributes.priceInclVat).toBeLessThanOrEqual(
				sortedArray[i + 1].customAttributes.priceInclVat,
			);
		}
	});

	it('should get lovVal1 from maximum care service config', async () => {
		const mockConfig = {
			resultCode: '20000',
			developerMessage: 'Success',
			data: {
				ExecuteServiceResponse: {
					return: {
						ParameterList: {
							Parameter: [{ Name: 'resultFlag', Value: 'Y' }],
							ParameterList: [
								{
									Parameter: [
										{ Name: 'lovVal1', Value: '3' },
										{ Name: 'lovType', Value: 'MOBILE_CARE_CONFIG' },
										{ Name: 'lovName', Value: 'LIMIT_IMEI' },
									],
								},
							],
						},
					},
				},
			},
		};
		const expectMaximumCare = '3';
		mock.onPost(URLConfig.ssbTransform).replyOnce(StatusCodes.OK, mockConfig);
		const maximumCareResponse = await ServiceCareService.getMaxLimitMobileCare();
		expect(maximumCareResponse.mobileCareLimit).toEqual(expectMaximumCare);
	});

	test('filter ais promotion', () => {
		const inputData = [
			{ customAttributes: { priceType: 'C' } },
			{ customAttributes: { priceType: 'A' } },
			{ customAttributes: { priceType: 'C' } },
			{ customAttributes: { priceType: 'A' } },
			{ customAttributes: { priceType: 'B' } },
		];
		const expectData = [
			{ customAttributes: { priceType: 'A' } },
			{ customAttributes: { priceType: 'A' } },
			{ customAttributes: { priceType: 'C' } },
			{ customAttributes: { priceType: 'C' } },
			{ customAttributes: { priceType: 'B' } },
		];
		const sortedData = ServiceCareService.filterAisPromotions(inputData, 'A');
		expect(sortedData).toEqual(expectData);
	});

	test('filter end user price', () => {
		const inputData = [
			{ customAttributes: { startDevicePrice: '100', endDevicePrice: '900' } },
			{ customAttributes: { startDevicePrice: '150', endDevicePrice: '9800' } },
			{ customAttributes: { startDevicePrice: '900', endDevicePrice: '1900' } },
			{ customAttributes: { startDevicePrice: '1650', endDevicePrice: '1000' } },
		];
		const expectData = [
			{ customAttributes: { startDevicePrice: '150', endDevicePrice: '9800' } },
			{ customAttributes: { startDevicePrice: '900', endDevicePrice: '1900' } },
		];
		const sortedData = ServiceCareService.filterEndUserPrice(inputData, '1000');
		expect(sortedData).toEqual(expectData);
	});

	test('sort by price descending order', () => {
		const inputData = [
			{ customAttributes: { priceInclVat: '100' } },
			{ customAttributes: { priceInclVat: '10023' } },
			{ customAttributes: { priceInclVat: '160' } },
			{ customAttributes: { priceInclVat: '20.5' } },
			{ customAttributes: { priceInclVat: '500.9' } },
		];
		const expectData = [
			{ customAttributes: { priceInclVat: '10023' } },
			{ customAttributes: { priceInclVat: '500.9' } },
			{ customAttributes: { priceInclVat: '160' } },
			{ customAttributes: { priceInclVat: '100' } },
			{ customAttributes: { priceInclVat: '20.5' } },
		];
		const sortedData = ServiceCareService.sortByPrice(inputData, 'desc');
		expect(sortedData).toEqual(expectData);
	});

	test('sort by price ascending order', () => {
		const inputData = [
			{ customAttributes: { priceInclVat: '100' } },
			{ customAttributes: { priceInclVat: '10023' } },
			{ customAttributes: { priceInclVat: '160' } },
			{ customAttributes: { priceInclVat: '20.5' } },
			{ customAttributes: { priceInclVat: '500.9' } },
		];
		const expectData = [
			{ customAttributes: { priceInclVat: '20.5' } },
			{ customAttributes: { priceInclVat: '100' } },
			{ customAttributes: { priceInclVat: '160' } },
			{ customAttributes: { priceInclVat: '500.9' } },
			{ customAttributes: { priceInclVat: '10023' } },
		];
		const sortedData = ServiceCareService.sortByPrice(inputData, 'asc');
		expect(sortedData).toEqual(expectData);
	});

	test('sort by price invalid order', () => {
		console.error = jest.fn();
		const inputData = [
			{ customAttributes: { priceInclVat: '100' } },
			{ customAttributes: { priceInclVat: '10023' } },
			{ customAttributes: { priceInclVat: '160' } },
			{ customAttributes: { priceInclVat: '20.5' } },
			{ customAttributes: { priceInclVat: '500.9' } },
		];
		const sortedData = ServiceCareService.sortByPrice(inputData, 'down');
		expect(sortedData).toEqual(inputData);
	});
});


describe('POST /payment/sky-auth', () => {
    it('should return data when a successful request is made', async () => {
        mock.onPost(URLConfig.skyAuthentication).reply(StatusCodes.OK, {
            token: '123',
        });
        const res = await request(app).post(`/sky-auth`).set('x-authorization', jwtToken);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body).toEqual({
            resultCode: '20000',
			resultDescription: 'Success',
	        developerMessage: 'Success',
			data: '123',
        });
    });

	it('should return standard error when call sky-auth empty data ', async () => {
     mock.onPost(URLConfig.skyAuthentication).reply(StatusCodes.OK, {});
     const res = await request(app).post(`/sky-auth`).set('x-authorization', jwtToken);
     expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
     expect(res.body).toEqual({ 
	  success: false,
      name: 'standard error',
      message: '{"resultCode":"MCS027-41-500-1-undefined","resultDescription":"sky /sky-auth/v1/user/authenticate [Empty response data]","developerMessage":"sky /sky-auth/v1/user/authenticate [Empty response data]","Error":"ระบบไม่สามารถแสดงข้อมูลได้ในขณะนี้"}'
	  });
     });

	it('should return error call sky-auth ', async () => {
		mock.onPost(URLConfig.skyAuthentication).networkError();
		const res = await request(app).post(`/sky-auth`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Network Error' });
	});
});