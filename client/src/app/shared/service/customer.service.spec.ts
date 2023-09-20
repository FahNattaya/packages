import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  expectedAccount,
  expectedProfile,
} from '../constant/customer-expectation.constant';
import { CustomerService, mapExistingMobileCare } from './customer.service';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import {
  ISendingOtpResponse,
  IVerifyingOtpRequest,
  IVerifyingOtpResponse,
} from '../model/customer.model';
import { Observable, of } from 'rxjs';

let shared: SharedService = new SharedService();

@Injectable({
  providedIn: 'root',
})
class FakeCustomerService extends CustomerService {
  public payloadSpy = {};

  constructor(private fakeHttp: HttpClient, private fakeShared: SharedService) {
    super(fakeHttp, fakeShared);
  }

  public returnFakeShared() {
    return this.fakeShared;
  }

  public override sendOtp(msisdn: string): Observable<ISendingOtpResponse> {
    let body = {
      msisdn: msisdn,
    };
    this.payloadSpy = body;

    const SEND_OTP_PATH = `customer/otp/send`;
    const url = shared.getUrl(SEND_OTP_PATH);
    return this.fakeHttp?.post<ISendingOtpResponse>(url, body);
  }
  public override verifyOtp(
    body: IVerifyingOtpRequest
  ): Observable<IVerifyingOtpResponse> {
    const SEND_OTP_PATH = `customer/otp/verify`;
    const url = shared.getUrl(SEND_OTP_PATH);
    this.payloadSpy = body;

    return this.fakeHttp?.post(url, body) as Observable<IVerifyingOtpResponse>;
  }
}

// Mock the dependencies
let mockHttp = {
  post: jest.fn().mockReturnValue(of({} as Observable<any>)),
  get: jest.fn().mockReturnValue(of({} as Observable<any>)),
};

let mockShared = {
  getUrl: jest.fn().mockReturnValueOnce('url'),
};

let service: CustomerService;
service = new CustomerService(
  mockHttp as any as HttpClient,
  new SharedService()
);

describe('Customer Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService, FakeCustomerService],
    });

    console.log = jest.fn();
  });
  afterEach(() => {
    mockShared.getUrl.mockRestore();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('get billing address', () => {
    it('should call to the given url with input mobile number as a parameter', () => {
      const mobileNo = '0934009896';
      const expectedUrl = `/api/device-sales/v1/customer/billing/${mobileNo}`;
      service.getCustomerBillingAddress(mobileNo);
      expect(mockHttp.get).toBeCalledWith(expectedUrl);
    });
  });

  describe('ValidateCustomerService', () => {
    const testMobileNo = '0659330882';
    const testIDCard = '8954479500208';

    it(`should return subscribed profile detail belongs to number ${testMobileNo}`, () => {
      service.getSubScriptionProfile(testMobileNo).subscribe((data) => {
        expect(data).toBe(expectedProfile);
      });
    });

    it(`should return subscribed account detail belongs to number ${testMobileNo}`, () => {
      service.getSubScriptionAccount(testMobileNo).subscribe((data) => {
        expect(data).toBe(expectedAccount);
      });
    });

    it(`should return BlackListLimit detail belongs to id card ${testIDCard}`, () => {
      service.getBlackListLimit(testIDCard).subscribe((data) => {
        expect(data).toBe(expectedAccount);
      });
    });

    it(`should return QueryContractMobile detail belongs to id card ${testIDCard}`, () => {
      service.getQueryContractMobile(testIDCard).subscribe((data) => {
        expect(data).toBe(expectedAccount);
      });
    });
  });

  describe('OTP Feature', () => {
    let mockCustomerService = new FakeCustomerService(
      mockHttp as unknown as HttpClient,
      mockShared as unknown as SharedService
    );

    describe('sendOtp', () => {
      it('should send the payload with passed msisdn', () => {
        //arrange
        const msisdn = '851112222';
        const expectedResult = {
          msisdn: msisdn,
        };
        //action
        mockCustomerService.sendOtp(msisdn);
        //assert
        expect(mockCustomerService.payloadSpy).toEqual(expectedResult);
      });
      it('should make a POST call with correct end point', () => {
        //arrange
        const msisdn = '851112222';
        //action
        mockCustomerService.sendOtp(msisdn);
        //assert
        expect(mockHttp.post).toBeCalledWith(
          '/api/device-sales/v1/customer/otp/send',
          { msisdn: '851112222' }
        );
      });
    });

    describe('verifyOtp', () => {
      it('should send the payload with passed msisdn and transaction id', () => {
        //arrange
        const msisdn = '853132292';
        const request = {
          msisdn: msisdn,
          pwd: '6731',
          transactionID: 'szYKCl27dZshOM1TRs',
        };

        //action
        mockCustomerService.verifyOtp(request);
        //assert
        expect(mockCustomerService.payloadSpy).toEqual(request);
      });
      it('should make a POST call with correct end point', () => {
        //arrange

        const msisdn = '853132292';
        const request = {
          msisdn: msisdn,
          pwd: '6731',
          transactionID: 'szYKCl27dZshOM1TRs',
        };
        //action
        mockCustomerService.verifyOtp(request);
        //assert
        expect(mockHttp.post).toBeCalledWith(
          '/api/device-sales/v1/customer/otp/verify',
          {
            msisdn: '853132292',
            pwd: '6731',
            transactionID: 'szYKCl27dZshOM1TRs',
          }
        );
      });
    });
  });

  describe('get existing mobile care', () => {
    test('maping existing care function', () => {
      const inputData = {
        resultCode: '20000',
        developerMessage: 'Success',
        personalInfomation: {
          opt_12: [
            {
              productGroup: 'Mobile Care',
              promotionName: 'AIS Care Plus',
              startDt: '17/08/2023 15:21:11',
              attributeList: [
                {
                  fName: 'Brand',
                  fValue: 'APPLE',
                },
                {
                  fName: 'Color',
                  fValue: 'SPACE GREY',
                },
                {
                  fName: 'IMEI',
                  fValue: '110020230305904',
                },
                {
                  fName: 'Model',
                  fValue: 'IPHONEXSM256',
                },
              ],
              endDt: '17/08/2028 15:21:01',
              descThai: 'Care Plus',
              descEng: 'Care Plus',
            },
            {
              paymentMode: 'Post-paid',
              promotionName: 'VoLTE Service',
            },
            {
              paymentMode: 'Post-paid',
              promotionName: '5G NSA Service',
            },
          ],
          opt_2: [
            {
              promotionName: '5G_Max Speed 499B NF 200min 30GB_SWifi',
              productClass: 'Main',
              produuctGroup: 'VAS Promotion',
            },
            {
              promotionName: 'M_Netflix Mobile Free 12Bill',
              productClass: 'On-Top',
              produuctGroup: 'VAS Promotion',
            },
            {
              promotionName: 'Care Plus 169Baht Monthly',
              productClass: 'On-Top Extra',
              produuctGroup: 'Mobile Care',
              productPkg: 'Mobile Care Bundle',
              productCd: 'P220814348',
              endDt: '17/08/2027 00:00:00',
              shortNameThai: 'AIS Care Plus รายเดือน 169 บาท',
              shortNameEng: 'AIS Care Plus (Monthly) 169 Baht',
              startDt: '17/08/2023 15:21:11',
              descThai:
                'AIS Care Plus รายเดือน มูลค่า 169 บาท (รวมภาษีมูลค่าเพิ่ม)',
              descEng: 'AIS Care Plus Monthly 169 Baht (Included vat)',
              inStatementThai: 'AIS Care Plus รายเดือน มูลค่า 169 บาท',
              inStatementEng: 'AIS Care Plus Monthly 169 Baht',
              priceType: 'Recurring',
              productSeq: '10',
              monthlyFee: '169.00',
              crmFlg: 'N',
              paymentMode: 'Post-paid',
              priceExclVat: '157.94',
              integrationName: 'Care Plus 169Baht Monthly',
              attributeList: [
                {
                  fnName: 'IMEI',
                  fnValue: '110020230305904',
                },
              ],
              priceInclVat: '169',
            },
          ],
        },
      };
      const resultData = mapExistingMobileCare(inputData as any);
      const expectedData = [
        {
          promotionName: 'Care Plus 169Baht Monthly',
          priceIncVat: '169',
          model: 'IPHONEXSM256',
        },
      ];
      expect(resultData).toEqual(expectedData);
    });
  });
});
