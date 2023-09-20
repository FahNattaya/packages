import { PrivilegeService } from './privilege.service';
import {
  ICheckPrivilegeRequest,
  IPrivilegeResponse,
} from '../model/privilege.model';
import { SharedService } from './shared.service';
import { of } from 'rxjs';

const httpMock = {
  post: jest.fn()
};

describe('PrivilegeService', () => {
  let service: PrivilegeService;

  beforeEach(() => {
    service = new PrivilegeService(httpMock as any, new SharedService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve privilege data from the given url', () => {
    const mockResponse: any = {
      transactionID: 'string',
      httpStatus: 0,
      status: 'string',
      description: 'string',
      msg: 'string',
      regId: 'string',
      msgBarcode: 'string',
      barcodeType: 'string',
      ssid: 'string',
    };
    const mockReq: ICheckPrivilegeRequest = {
      transactionID: '12345',
      username: 'admin',
      password: 'admin',
      ipAddress: '172.0.0.1',
      msisdn: 'msisdn',
      shortcode: '007',
    };
    const mockUrlName: string = 'urlTest';

    httpMock.post.mockReturnValueOnce(of(mockResponse));

    service
      .getPrivilege(mockReq, mockUrlName)
      .subscribe((data: IPrivilegeResponse) => {
        expect(data).toEqual(mockResponse);
      });
  });
});
