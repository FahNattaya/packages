import { of } from 'rxjs';
import { ServiceCareService } from './service-care.service';
import { HttpClient } from '@angular/common/http';
import { IMobileCareRequest } from '../model/service-care.model';
import { SharedService } from './shared.service';

describe('MobileCareService', () => {
  let service: ServiceCareService;
  const mockHttpClient: Partial<HttpClient> = {
    post: jest.fn(() => of({} as any)),
  };

  
  let sharedService: SharedService;
  sharedService = new SharedService();
  service = new ServiceCareService(mockHttpClient as HttpClient, sharedService);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMobileCare', () => {
    it('should make a post call with the given url', () => {
      const mockRequest: IMobileCareRequest = {
        brand: 'APPLE',
        model: 'IPHONE_X256',
      };
 
      service.getMobileCare(mockRequest);
      expect(mockHttpClient.post).toBeCalledWith(
        "/api/device-sales/v1/service-care/care-promotions", {"brand": "APPLE", "model": "IPHONE_X256"}
      );
    });
  });
});
