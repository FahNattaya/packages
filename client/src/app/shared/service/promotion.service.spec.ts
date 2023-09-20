import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PromotionService } from './promotion.service';
import {
  ICampaignRequest,
  ICampaignResponse,
  IResponseData,
  ITradeRequest,
  ITradeResponse,
} from '../model/promotion.model';
import { IPromotionShelvesReq } from '../model/product-package.model';

describe('PromotionService', () => {
  let service: PromotionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PromotionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('getCampaignPromotion', () => {
    it('should get reponse from campaign promotion', (done) => {
      const mockCampaignReq: ICampaignRequest = {
        locationCode: '1100',
        saleChannels: ['AIS', 'BRN'],
        brand: 'APPLE',
        model: 'IP14P_256',
        color: 'RED',
        productType: 'DEVICE',
        productSubtype: 'HANDSET',
        customerGroup: 'New Registration',
        regularPrice: 25000,
        company: 'AWN',
        offset: 1,
        max: 10,
        flow:"AIS"
      };
      const mockCampaignRes: ICampaignResponse = {
        resultCode: '20000',
        resultDescription: 'Success',
        developerMessage: 'Success',
        data: [
          {
            campaignId: 1090792,
            campaignName: 'AIS Best Buy 12M',
            campaignDesc: 'AIS Best Buy 12M_Existing Customer',
            imageUrl: 'https://abc.com/image/yourimagehere.jpg',
            icon: 'https://abc.com/image/youriconhere.jpg',
            recommendFlag: true,
            payAdvanceFlag: false,
            installmentFlag: true,
            fullPaymentFlag: true,
            maximumContract: 12,
            customerGroup: 'Existing',
            conditionCode: 'CONDITION_1'
          },
          {
            campaignId: 1090791,
            campaignName: 'Hot Deal New',
            campaignDesc: 'Hot Deal New description',
            imageUrl: 'https://abc.com/image/yourimagehere1.jpg',
            icon: 'https://abc.com/image/youriconhere.jpg',
            recommendFlag: true,
            payAdvanceFlag: true,
            installmentFlag: true,
            fullPaymentFlag: true,
            maximumContract: 10,
            customerGroup: 'Existing',
            conditionCode: 'CONDITION_2'
          },
        ],
      };

      service.getCampaignPromotion(mockCampaignReq).subscribe((data) => {
        expect(data).toMatchObject(mockCampaignRes);
        done();
      });
      const req = httpMock.expectOne(
        '/api/device-sales/v1/promotion/campaign-and-payments'
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockCampaignReq);
      req.flush(mockCampaignRes);
    });
  });
  describe('getTradePromotion', () => {
    it('should retrieve tradePromotion data from the given url', () => {
      const mockResponse: Partial<ITradeResponse> = {
        resultCode: '1111',
        resultDescription: 'decs',
        developerMessage: 'decs',
        data: {} as IResponseData,
      };
      const mockReq: ITradeRequest = {
        campaignId: 12345,
        locationCode: '1100',
        saleChannels: ['AIS', 'BRN'],
        brand: 'APPLE',
        model: 'IP14P_256',
        color: 'RED',
        productType: 'DEVICE',
        productSubtype: 'HANDSET',
        customerGroup: 'New Registration',
        regularPrice: 25000,
        company: 'AWN',
      };

      service.getTradePromotion(mockReq).subscribe((data: ITradeResponse) => {
        expect(data).toEqual(mockResponse);
      });

      const mockRequest = httpMock.expectOne(
        '/api/device-sales/v1/promotion/trade-promotion'
      );
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(mockReq);
      mockRequest.flush(mockResponse);
    });
  });
  describe('checkDeviceContract', () => {
    it('should retrieve deviceContract data from the given url', () => {
      const mockResponse: any = {};
      const mockReq: any = {};

      service.checkDeviceContract(mockReq).subscribe((data: any) => {
        expect(data).toEqual(mockResponse);
      });

      const mockRequest = httpMock.expectOne(
        '/api/device-sales/v1/privilege/check-device-transaction'
      );
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(mockReq);
      mockRequest.flush(mockResponse);
    });
  });

  describe('getPromotionShelves', () => {
    it('should make a call to the given url ', () => {
      const mockResponse: any = {};
      const mockReq: IPromotionShelvesReq = {
        userId:
          '8UZfqMT8bItbwuzxILsmQHkpO4EnliZCHg9ANU7IzsAqBjnnfot2QawD0TNBeJk6YrQEjuIsiYaiufsh',
        language: 'EN',
      };

      service.getPromotionShelves(mockReq).subscribe((data: any) => {
        expect(data).toEqual(mockResponse);
      });

      const mockRequest = httpMock.expectOne(
        '/api/device-sales/v1/promotion/promotion-shelves'
      );
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(mockReq);
      mockRequest.flush(mockResponse);
    });
  });
});
