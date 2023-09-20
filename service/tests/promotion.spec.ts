import axios from 'axios';
import { IGetAllPromotionsByShelfResponse } from '../src/interfaces/care-response.interface';
import { ICampaignResponseData, IGetAllPromotionsByShelf, IKeyShelves } from '../src/interfaces/cpc.interface';
import {
	mockBodyProductSelling,
	mockGetAllPromotionsByShalvesResponse,
	mockProductCrossSellingResponse,
} from '../src/mock/mock.data.care';
import {
	mockCampaignPromotionRequest,
	mockCampaignPromotionResponse,
	mockPaymentsByCampaignRequest,
	mockPaymentsByCampaignResponse,
	mockTradePromotionRequest,
	mockTradePromotionResponse,
} from '../src/mock/mock.data.cpc';
import { PaymentService } from '../src/modules/payment/payment.service';
import { PromotionService } from '../src/modules/promotion/promotion.service';

const mockError = new Error('Test error message');
const mockEmptyResponse = { data: null };

describe('productCrossSelling', () => {
	it('should return response data from productCrossSelling', async () => {
		const mockResponseData = { mockProductCrossSellingResponse };
		axios.post = jest.fn().mockResolvedValueOnce({ data: mockResponseData });
		const result = await PromotionService.productCrossSelling(mockBodyProductSelling);
		expect(result).toEqual(mockResponseData);
	});

	it('should throw an error when an error occurs in productCrossSelling', async () => {
		const mockError = new Error('Mocked error message');
		axios.post = jest.fn().mockRejectedValueOnce(mockError);
		await expect(PromotionService.productCrossSelling(mockBodyProductSelling)).rejects.toThrow(mockError);
	});
});

describe('check function getPromotionShelves', () => {
	let postMock: any;
	beforeEach(() => {
		postMock = jest.spyOn(axios, 'post');
		console.log = jest.fn();
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should get the shelf keys when call getPromotionShelves', async () => {
		const mockPromotionShelvesRequest = {
			brand: 'APPLE',
			model: 'IP14P_256',
			color: 'RED',
			productType: 'DEVICE',
			productSubType: 'HANDSET',
			userId: '1vP1Qbr1T6svJISttRAoZ0y95OsYxxh7bUnfMOAV8LmjpsVStlifT3fquoatH2JUz4LpfsD4tVY2p0LR',
			language: 'EN',
			endUserPrice: '1000',
		};
		const mockPromotionShelvesResponse = {
			statusCode: '2000',
			statusDesc: 'Success',
			data: [
				{
					id: 1507143,
					title: 'Change/Replace Device Package',
					titleEn: 'Change/Replace Device Package',
					icon: null,
					sanitizedName: 'myChannel-new-care-plus',
					publish: true,
					priority: 0,
					lastUpdated: 1660787671,
					tags: 'NONE',
					type: null,
					conditionCode: null,
					subShelves: [],
					items: [],
				},
			],
		};
		const mockPostResponse = {
			data: mockPromotionShelvesResponse,
		};
		const expectedStructure: Partial<IGetAllPromotionsByShelfResponse> = {
			statusCode: expect.any(String),
			statusDesc: expect.any(String),
			data: expect.arrayContaining<IKeyShelves>([]),
		};
		postMock.mockResolvedValueOnce(mockPostResponse);
		const result = await PromotionService.getPromotionShelves(mockPromotionShelvesRequest);
		expect(result).toMatchObject(expectedStructure);
	});

	it('should throw an error for empty response data', async () => {
		const mockPromotionShelvesRequest = {
			brand: 'APPLE',
			model: 'IP14P_256',
			color: 'RED',
			productType: 'DEVICE',
			productSubType: 'HANDSET',
			userId: '1vP1Qbr1T6svJISttRAoZ0y95OsYxxh7bUnfMOAV8LmjpsVStlifT3fquoatH2JUz4LpfsD4tVY2p0LR',
			language: 'EN',
			endUserPrice: '1000',
		};
		axios.post = jest.fn().mockResolvedValueOnce(mockEmptyResponse);
		expect(PromotionService.getPromotionShelves(mockPromotionShelvesRequest)).rejects.toThrow('Empty response data');
	});

	it('should map error code and return the responseMap when status code is not 2000', async () => {
		const mockRequest = {
			brand: 'APPLE',
			model: 'IP14P_256',
			color: 'RED',
			productType: 'DEVICE',
			productSubType: 'HANDSET',
			userId: '1vP1Qbr1T6svJISttRAoZ0y95OsYxxh7bUnfMOAV8LmjpsVStlifT3fquoatH2JUz4LpfsD4tVY2p0LR',
			language: 'EN',
			endUserPrice: '1000',
		};
		const mockResponse = {
			data: {
				statusCode: '4040',
				statusDesc: 'Not found',
			},
		};
		axios.post = jest.fn().mockResolvedValue(mockResponse);
		PromotionService.mapErrorCode = jest.fn().mockReturnValue('Mapped Error');
		const result = await PromotionService.getPromotionShelves(mockRequest);
		expect(result).toEqual('Mapped Error');
		expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({}));
		expect(PromotionService.mapErrorCode).toHaveBeenCalledWith({
			errorCode: '4040',
			httpStatus: '4040',
			description: 'Not found',
			nodeNo: '6',
			apiNo: '2',
			nodeName: 'CPC',
			apiName: 'getPromotionShelves',
			errorDescription: 'Not found',
		});
	});
});
describe('check function getAllPromotionsByShelf', () => {
	let postMock: any;
	beforeEach(() => {
		postMock = jest.spyOn(axios, 'post');
		console.log = jest.fn();
	});
	afterEach(() => {
		jest.resetAllMocks();
	});
	it('should get all promotions when call getAllPromotionsByShelf', async () => {
		const mockCarePromotionRequest: IGetAllPromotionsByShelf = {
			userId: '1vP1Qbr1T6svJISttRAoZ0y95OsYxxh7bUnfMOAV8LmjpsVStlifT3fquoatH2JUz4LpfsD4tVY2p0LR',
			sanitizedName: 'myChannel-new-care-plus',
			parameters: [
				{
					name: 'Brand',
					value: 'Samsung',
				},
			],
		};
		const mockPostResponse = { data: mockGetAllPromotionsByShalvesResponse };
		postMock.mockResolvedValueOnce(mockPostResponse);
		const result = await PromotionService.getAllPromotionsByShelf(mockCarePromotionRequest);
		expect(result).toEqual(mockGetAllPromotionsByShalvesResponse);
	});

	it('should throw an error for empty response data', async () => {
		const mockCarePromotionRequest: IGetAllPromotionsByShelf = {
			userId: '1vP1Qbr1T6svJISttRAoZ0y95OsYxxh7bUnfMOAV8LmjpsVStlifT3fquoatH2JUz4LpfsD4tVY2p0LR',
			sanitizedName: 'myChannel-new-care-plus',
			parameters: [
				{
					name: 'Brand',
					value: 'Samsung',
				},
			],
		};
		axios.post = jest.fn().mockResolvedValueOnce(mockEmptyResponse);
		expect(PromotionService.getAllPromotionsByShelf(mockCarePromotionRequest)).rejects.toThrow('Empty response data');
	});

	it('should map error code and return the responseMap when status code is not 2000', async () => {
		const mockRequest: IGetAllPromotionsByShelf = {
			userId: '1vP1Qbr1T6svJISttRAoZ0y95OsYxxh7bUnfMOAV8LmjpsVStlifT3fquoatH2JUz4LpfsD4tVY2p0LR',
			sanitizedName: 'myChannel-new-care-plus',
			parameters: [
				{
					name: 'Brand',
					value: 'Samsung',
				},
			],
		};
		const mockResponse = {
			data: {
				statusCode: '404',
				statusDesc: 'Not found',
			},
		};
		axios.post = jest.fn().mockResolvedValue(mockResponse);
		PromotionService.mapErrorCode = jest.fn().mockReturnValue('Mapped Error');
		const result = await PromotionService.getAllPromotionsByShelf(mockRequest);
		expect(result).toEqual('Mapped Error');
		expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({}));
		expect(PromotionService.mapErrorCode).toHaveBeenCalledWith({
			errorCode: '404',
			httpStatus: 404,
			description: 'Not found',
			nodeNo: '6',
			apiNo: '3',
			nodeName: 'cpc',
			apiName: 'getAllPromotionsByShelf',
			errorDescription: 'Not found',
		});
	});
});

describe('check function getCampaignPromotion', () => {
	it('should return success if call getCampaignPromotion', async () => {
		axios.post = jest.fn().mockResolvedValueOnce({ data: mockCampaignPromotionResponse });
		const result = await PromotionService.getCampaignPromotion(mockCampaignPromotionRequest);
		expect(result.data).toEqual(mockCampaignPromotionResponse.campaigns);
	});

	it('should return error message when call getCampaignPromotion an error occurs', async () => {
		axios.post = jest.fn().mockRejectedValue(mockError);
		expect(PromotionService.getCampaignPromotion(mockCampaignPromotionRequest)).rejects.toThrow(mockError);
	});

	it('should throw an error for empty response data', async () => {
		axios.post = jest.fn().mockResolvedValueOnce(mockEmptyResponse);
		expect(PromotionService.getCampaignPromotion(mockCampaignPromotionRequest)).rejects.toThrow('Empty response data');
	});
});

describe('check function getTradePromotion', () => {
	it('should return success if call getTradePromotion', async () => {
		axios.post = jest.fn().mockResolvedValueOnce({ data: mockTradePromotionResponse });
		const result = await PromotionService.getTradePromotion(mockTradePromotionRequest);
		expect(result.data).toEqual(mockTradePromotionResponse.data);
	});

	it('should return error message when call getTradePromotion an error occurs', async () => {
		axios.post = jest.fn().mockRejectedValue(mockError);
		expect(PromotionService.getTradePromotion(mockTradePromotionRequest)).rejects.toThrow(mockError);
	});

	it('should throw an error for empty response data', async () => {
		axios.post = jest.fn().mockResolvedValueOnce(mockEmptyResponse);
		expect(PromotionService.getTradePromotion(mockTradePromotionRequest)).rejects.toThrow('Empty response data');
	});
});

describe('formatHttpErrorCode', () => {
	it('should format HTTP status code correctly', () => {
		const mockStatusCode = '404';
		const formattedStatusCode = PromotionService.formatHttpErrorCode(mockStatusCode);
		expect(formattedStatusCode).toEqual(404);
	});

	it('should handle short input gracefully', () => {
		const mockShortStatusCode = '12';
		const formattedStatusCode = PromotionService.formatHttpErrorCode(mockShortStatusCode);
		expect(formattedStatusCode).toEqual(12);
	});
});

describe('check function getPaymentsByCampaign', () => {
	it('should return success if call getPaymentsByCampaign', async () => {
		axios.post = jest.fn().mockResolvedValueOnce({ data: mockPaymentsByCampaignResponse });
		const result = await PromotionService.getPaymentsByCampaign(mockPaymentsByCampaignRequest);
		expect(result.data).toEqual(mockPaymentsByCampaignResponse.payments);
	});

	it('should return error message when call getPaymentsByCampaign an error occurs', async () => {
		axios.post = jest.fn().mockRejectedValue(mockError);
		expect(PromotionService.getPaymentsByCampaign(mockPaymentsByCampaignRequest)).rejects.toThrow(mockError);
	});

	it('should throw an error for empty response data', async () => {
		axios.post = jest.fn().mockResolvedValueOnce(mockEmptyResponse);
		expect(PromotionService.getPaymentsByCampaign(mockPaymentsByCampaignRequest)).rejects.toThrow(
			'Empty response data',
		);
	});
});

describe('check function getCampaignAndPayments', () => {
	it('should return campaign data with payments if installmentFlag is true', async () => {
		axios.post = jest
			.fn()
			.mockResolvedValueOnce({ data: mockCampaignPromotionResponse })
			.mockResolvedValueOnce({ data: { payments: [] } });
		PaymentService.getPaymentPartnerByCampaign = jest.fn();
		const result = await PromotionService.getCampaignAndPayments({ locationCode: '', saleChannels: [] } as any, '');

		result.data.forEach((campaign: ICampaignResponseData) => {
			if (campaign.installmentFlag == true) expect('payments' in campaign).toBe(true);
		});
	});

	it('should return campaign data with payments if installmentFlag is false', async () => {
		axios.post = jest
			.fn()
			.mockResolvedValueOnce({ data: mockCampaignPromotionResponse })
			.mockResolvedValueOnce({ data: { payments: [] } });
		PaymentService.getPaymentPartnerByCampaign = jest.fn();
		const result = await PromotionService.getCampaignAndPayments({ locationCode: '', saleChannels: [] } as any, '');

		result.data.forEach((campaign: ICampaignResponseData) => {
			if (campaign.installmentFlag == false) expect('payments' in campaign).toBe(false);
		});
	});

	it('should throw an error if PromotionService.getCampaignPromotion throws an error', async () => {
		const mockRequest: any = {
			locationCode: 'LOC1',
			saleChannels: ['Online', 'In-store'],
		};
		const mockCampaignData = {
			campaigns: [
				{
					installmentFlag: false,
				},
			],
		};
		PromotionService.getCampaignPromotion = jest.fn().mockResolvedValue(mockCampaignData);
		const result = await PromotionService.getCampaignAndPayments(mockRequest, '');
		expect(result).toEqual(mockCampaignData);

		const mockError = new Error('Failed to fetch campaign data');
		PromotionService.getCampaignPromotion = jest.fn().mockRejectedValue(mockError);
		await expect(PromotionService.getCampaignAndPayments(mockRequest, '')).rejects.toThrowError(mockError);
	});
});
