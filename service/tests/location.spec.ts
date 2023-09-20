import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { IListLocation } from '../src/interfaces/location.interface';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import { CompanyModel, LocationMcModel, LocationModel } from '../src/models/location.model';
import WhiteListLocationModel from '../src/models/whitelistlocation.model';
import router from '../src/modules/location/location.route';
import { LocationService } from '../src/modules/location/location.service';

const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MTEwOTU1IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA5MzQwMDA2MjQiLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjg5MDQ0MTEyLCJleHAiOjk5OTk5OTk5OTl9.IYWZfvvlaBn9AhpvnWz42aLFZGdu7HbLUiSA-8VsKBI';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

const mockLocation = {
	PROVINCE: 'Some Province',
	AMPHUR_TH: 'Some Amphur',
	TUMBOL_TH: 'Some Tumbol',
};

const mockDataLocation = [
	{
		LOCATION_NAME: 'Location 1',
		LOCATION_CODE: '123',
		CHN_TYPE: 'Type 1',
		AIS_STATUS: 'Active',
		DISPLAY_VAL: 'Location 1',
	},
	{
		LOCATION_NAME: 'Location 2',
		LOCATION_CODE: '456',
		CHN_TYPE: 'Type 2',
		AIS_STATUS: 'Inactive',
		DISPLAY_VAL: 'Location 2',
	},
];

const expectedListLocation: IListLocation[] = [
	{
		locationName: 'Location 1',
		locationCode: '123',
		locationType: 'Type 1',
		status: 'Active',
	},
	{
		locationName: 'Location 2',
		locationCode: '456',
		locationType: 'Type 2',
		status: 'Inactive',
	},
];

const mockQueueLocation = {
	locationCode: '1100',
	startDate: '07/19/2023',
	type: 'autoGenQueue',
	shopType: 'AIS',
};

describe('GET Location /another', () => {
	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should return Location', async () => {
		LocationModel.findOne = jest.fn().mockResolvedValueOnce(mockLocation);
		LocationModel.find = jest.fn().mockResolvedValueOnce(mockDataLocation);
		const res = await request(app)
			.get(`/another`)
			.query({ filterType: 'filterType' })
			.query({ locationCode: 'locationCode' })
			.query({ locationType: 'locationType' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual(expectedListLocation);
	});

	it('should return empty Location "[]"', async () => {
		LocationModel.findOne = jest.fn().mockResolvedValueOnce({});
		const res = await request(app)
			.get(`/another`)
			.query({ filterType: 'filterType' })
			.query({ locationCode: 'locationCode' })
			.query({ locationType: 'locationType' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual([]);
	});

	it('should return missing parameter when parameter is not valid', async () => {
		const res = await request(app).get(`/another`).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res.body).toEqual({ message: 'Missing required parameters' });
	});

	it('should handle when error accured', async () => {
		LocationModel.findOne = jest.fn().mockRejectedValueOnce(new Error('find error'));
		const res = await request(app)
			.get(`/another`)
			.query({ filterType: 'filterType' })
			.query({ locationCode: 'locationCode' })
			.query({ locationType: 'locationType' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'find error', name: 'Error', success: false });
	});
});

describe('GET Location Name /getLocationName', () => {
	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should get location name', async () => {
		LocationMcModel.findOne = jest.fn().mockResolvedValueOnce(mockDataLocation[0]);
		const res = await request(app)
			.get('/getLocationName')
			.query({ locationCode: 'code' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ locationName: mockDataLocation[0].LOCATION_NAME });
	});

	it('should handle when error accured', async () => {
		LocationModel.findOne = jest.fn().mockRejectedValueOnce(new Error('find error'));
		const res = await request(app)
			.get(`/getLocationName`)
			.query({ locationCode: 'locationCode' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({
			message: `Cannot read properties of undefined (reading 'DISPLAY_VAL')`,
			success: false,
			name: 'TypeError',
		});
	});
});

describe('GET company name /get-company/:name', () => {
	it('should return response from database', async () => {
		CompanyModel.findOne = jest.fn().mockResolvedValueOnce({});
		const res = await request(app)
			.get(`/get-company/test`)
			.query({ locationCode: 'locationCode' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({});
	});

	it('should handle when error accured', async () => {
		CompanyModel.findOne = jest.fn().mockRejectedValueOnce(new Error('find error'));
		const res = await request(app)
			.get(`/get-company/test`)
			.query({ locationCode: 'locationCode' })
			.set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'find error', name: 'Error', success: false });
	});
});

describe('GET check queue location /check-queue-location', () => {
	it('should return queue type from white list model', async () => {
		WhiteListLocationModel.find = jest.fn().mockResolvedValueOnce([{ type: 'MANUAL' }]);
		const res = await request(app).get(`/check-queue-location`).send({ user: 'test' }).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ queueType: 'MANUAL' });
	});

	it('should return queue type MANUAL', async () => {
		WhiteListLocationModel.find = jest.fn().mockResolvedValueOnce([{ type: 'TEST' }]);
		const res = await request(app).get(`/check-queue-location`).send({ user: 'test' }).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ queueType: 'MANUAL' });
	});

	it('should handle when error accured', async () => {
		WhiteListLocationModel.find = jest.fn().mockRejectedValueOnce(new Error('find error'));
		const res = await request(app).get(`/check-queue-location`).send({ user: 'test' }).set('x-authorization', jwtToken);
		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ message: 'find error', name: 'Error', success: false });
	});
});

describe('GET query all addresses /addresses', () => {
	it('return addresse data', () => {});
	it('should return an error if any', () => {});
});

describe('GET /get-provinces', () => {
	const mockZipCodeResposne = [
		{
			ROW_ID: '6A3C56EE2B5C61C0E0440000BEA816B7',
			ZIPCODE: '93000',
			ZIPCODE_ENG_FLAG: 'N',
			CITY: 'กงหรา',
			PROVINCE_ID: 'PLG',
			TUMBOL: 'ชะรัด',
			COUNTRY: 'Thailand',
			USE_FLAG: 'Y',
			BUSINESS_TYPE: '',
		},
		{
			ROW_ID: '6A3C56EE2B5D61C0E0440000BEA816B7',
			ZIPCODE: '93000',
			ZIPCODE_ENG_FLAG: 'N',
			CITY: 'กงหรา',
			PROVINCE_ID: 'PLG',
			TUMBOL: 'สมหวัง',
			COUNTRY: 'Thailand',
			USE_FLAG: 'Y',
			BUSINESS_TYPE: '',
		},
	];
	const mockProvincesResposne = [
		{
			ROW_ID: '14',
			PROVINCE_ROWID: '28',
			PROVINCE_ID: 'KBI',
			PROVINCE_NAME: 'กระบี่',
			PROVINCE_SUP_TYPE: 'THA',
			PROVINCE_USE_FLAG: 'Y',
			BUSINESS_TYPE: '',
			REGION: 'S3',
			FBB_REGION: 'ROS',
		},
		{
			ROW_ID: '4',
			PROVINCE_ROWID: '7',
			PROVINCE_ID: 'BKK',
			PROVINCE_NAME: 'กรุงเทพ',
			PROVINCE_SUP_TYPE: 'THA',
			PROVINCE_USE_FLAG: 'Y',
			BUSINESS_TYPE: '',
			REGION: 'C3',
			FBB_REGION: 'BKK',
		},
	];
	it('should return zipcode and provinces', async () => {
		LocationService.getZipCode = jest
			.fn()
			.mockResolvedValue({ zipCodes: mockZipCodeResposne, provinces: mockProvincesResposne });
		const res = await request(app).get('/get-provinces');
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ zipCodes: mockZipCodeResposne, provinces: mockProvincesResposne });
	});

	it('should return query by zipcode', async () => {
		LocationService.getZipCode = jest
			.fn()
			.mockResolvedValue({ zipCodes: mockZipCodeResposne, provinces: mockProvincesResposne });
		const res = await request(app).get('/get-provinces').query({ zipCode: '93000' });
		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({ zipCodes: mockZipCodeResposne, provinces: mockProvincesResposne });
	});

	it('should return Error ', async () => {
		LocationService.getZipCode = jest.fn().mockRejectedValue(new Error('Mocked error'));
		const res = await request(app).get('/get-provinces').query({ zipCode: '93000' });

		expect(res.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
		expect(res.body).toEqual({ success: false, name: 'Error', message: 'Mocked error' });
	});
});

describe('GET /zip-code', () => {
	it('should return zipCode by tumbol', async () => {
		LocationService.getZipCodeByTumbol = jest.fn().mockResolvedValue({
			ROW_ID: '6A3C56EE17FD61C0E0440000BEA816B7',
			ZIPCODE: '10200',
			ZIPCODE_ENG_FLAG: 'N',
			CITY: 'พระนคร',
			PROVINCE_ID: 'BKK',
			TUMBOL: 'บางขุนพรหม',
			COUNTRY: 'Thailand',
			USE_FLAG: 'Y',
			BUSINESS_TYPE: '',
		});
		const res = await request(app).get('/zip-code').query({ tumbol: 'บางขุนพรหม' });

		expect(res.statusCode).toEqual(StatusCodes.OK);
		expect(res.body).toEqual({
			ROW_ID: '6A3C56EE17FD61C0E0440000BEA816B7',
			ZIPCODE: '10200',
			ZIPCODE_ENG_FLAG: 'N',
			CITY: 'พระนคร',
			PROVINCE_ID: 'BKK',
			TUMBOL: 'บางขุนพรหม',
			COUNTRY: 'Thailand',
			USE_FLAG: 'Y',
			BUSINESS_TYPE: '',
		});
	});
});
