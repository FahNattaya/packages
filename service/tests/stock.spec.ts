// import axios from 'axios';
// import { MapDtToResponse, queryStock } from '../../src/stock/stock.service';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// const response = {
// 	data: {
// 		resultCode: '20000',
// 		resultDescription: 'Success',
// 		developerMessage: 'Success',
// 		listData: [
// 			{
// 				locationCode: '1100',
// 				locationName: 'สาขาอาคารเอไอเอส 2',
// 				company: 'AWN',
// 				subStockCode: 'BRN',
// 				productType: 'DEVICE',
// 				productSubType: 'HANDSET',
// 				brand: 'APPLE',
// 				model: 'IPHONEXSM256',
// 				color: 'GOLD',
// 				stockAval: '202',
// 				productName: 'APPLE IPHONEXSM256',
// 			},
// 			{
// 				locationCode: '1100',
// 				locationName: 'สาขาอาคารเอไอเอส 2',
// 				company: 'AWN',
// 				subStockCode: 'BRN',
// 				productType: 'DEVICE',
// 				productSubType: 'HANDSET',
// 				brand: 'APPLE',
// 				model: 'IPHONEXSM256',
// 				color: 'SILVER',
// 				stockAval: '113',
// 				productName: 'APPLE IPHONEXSM256',
// 			},
// 			{
// 				locationCode: '1100',
// 				locationName: 'สาขาอาคารเอไอเอส 2',
// 				company: 'AWN',
// 				subStockCode: 'BRN',
// 				productType: 'DEVICE',
// 				productSubType: 'HANDSET',
// 				brand: 'APPLE',
// 				model: 'IPHONEXSM256',
// 				color: 'SPACE GREY',
// 				stockAval: '716',
// 				productName: 'APPLE IPHONEXSM256',
// 			},
// 			{
// 				locationCode: '9999',
// 				locationName: 'สาขาอาคารเอไอเอส 2',
// 				company: 'AWN',
// 				subStockCode: 'BRN',
// 				productType: 'DEVICE',
// 				productSubType: 'HANDSET',
// 				brand: 'APPLE',
// 				model: 'IPHONEXSM256',
// 				color: 'SPACE GREY',
// 				stockAval: '716',
// 				productName: 'APPLE IPHONEXSM256',
// 			},
// 			{
// 				locationCode: '9999',
// 				locationName: 'สาขาอาคารเอไอเอส 2',
// 				company: 'AWN',
// 				subStockCode: 'BRN',
// 				productType: 'DEVICE',
// 				productSubType: 'HANDSET',
// 				brand: 'APPLE',
// 				model: 'IPHONEXSM256',
// 				color: 'SPACE GREY',
// 				stockAval: '716',
// 				productName: 'APPLE IPHONEXSM256',
// 			},
// 		],
// 	},
// };

// describe('Stock Response', () => {
// 	beforeEach(() => {
// 		console.log = jest.fn();
// 		jest.clearAllMocks();
// 	});

// 	it('test invalid input returns error response', async () => {
// 		const expected = {
// 			resultCode: '20000',
// 			resultDescription: 'Success',
// 			developerMessage: 'ERROR',
// 			listData: [],
// 		};
// 		mockedAxios.post = jest.fn().mockImplementation(() => {
// 			throw new Error('ERROR');
// 		});

// 		const result = await queryStock({} as any, {});
// 		expect(result).toEqual(expected);
// 	});

// 	it('test empty stock data return empty list', async () => {
// 		const expected = {
// 			resultCode: '20000',
// 			resultDescription: 'Success',
// 			developerMessage: 'Success',
// 			listData: [],
// 		};
// 		const axiosResponse = {
// 			data: {},
// 		};
// 		jest.spyOn(axios, 'post').mockResolvedValueOnce(axiosResponse);

// 		const result = await queryStock({} as any, {});
// 		expect(result).toEqual(expected);
// 	});

// 	it('mapping dt data to mc FE', () => {
// 		const mappedResponse = MapDtToResponse(response);
// 		expect(mappedResponse.length).toBe(2);
// 		const stock1100 = mappedResponse.find((data) => data.locationCode === '1100');
// 		expect(stock1100?.productStock.length).toBe(1);
// 		expect(stock1100?.productStock[0].colorStock.length).toBe(3);
// 		const stock9999 = mappedResponse.find((data) => data.locationCode === '9999');
// 		expect(stock9999?.productStock.length).toBe(1);
// 		let total = 0;

// 		mappedResponse.find((data) => {
// 			total = data.productStock[0].totalStockAval;
// 		});
// 		expect(total).toEqual(1432);
// 	});

// 	it('mapping da data to MC FE with empty list', () => {
// 		const mappedResponse = MapDtToResponse({ data: { listData: null } } as any);
// 		expect(mappedResponse).toEqual([]);
// 	});
// });

describe('test', () => {
	it('test', () => {

	})
})