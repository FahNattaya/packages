import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  IBillingAddressResponse,
  ICuntomerProfileData,
  ICustomer,
  IExistingMobileCareResponse,
  IMobileListNumberByIdCardNumber,
  IProfileResponse,
  IQueryPromotion,
  IQueryServiceDetail,
  ISendingOtpResponse,
  IVerifyingOtpRequest,
  IVerifyingOtpResponse,
} from '../model/customer.model';
import { IExistingMobileCare } from '../model/service-care.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  getCurrentPackage(mobileNo: string, language: string): Observable<any> {
    const url = this.shared.getUrl(
      `product-package/query-promotion-current-pack`
    );
    const body = {
      mobileNo: mobileNo,
      language: language,
    };

    return this.http.post(url, body);
  }

  getFirstContract(mobileNo: string, idCardNo: string): Observable<any> {
    const url = this.shared.getUrl(`product-package/query-contract-first-pack`);
    const body = {
      ExecuteService: {
        sffRequest: {
          Event: 'evOMQueryContract',
          ParameterList: {
            Parameter: [
              {
                Name: 'option',
                Value: '3',
              },
              {
                Name: 'mobileNo',
                Value: mobileNo,
              },
              {
                Name: 'idCardNo',
                Value: idCardNo,
              },
              {
                Name: 'profileType',
                Value: 'All',
              },
            ],
          },
        },
      },
    };
    return this.http.post(url, body);
  }

  public getSubScriptionProfile(
    mobileNo: string
  ): Observable<IProfileResponse> {
    const url = `/api/customerportal/atn/subScriptionProfile?mobileNo=${mobileNo}`;
    return this.http.get<IProfileResponse>(url);
  }

  public getSubScriptionAccount(mobileNo: string): Observable<ICustomer> {
    const url = `/api/customerportal/atn/subScriptionAccount?mobileNo=${mobileNo}`;
    return this.http.get<ICustomer>(url);
  }
  public getCustomerProfile(
    identityCard: string,
    username: string
  ): Observable<ICuntomerProfileData> {
    const url = `/api/device-sales/v1/customer/customer-profile`;
    const body = {
      identityCard: identityCard,
      channel: 'MyChannel',
      username: username,
    };
    return this.http.post<ICuntomerProfileData>(url, body);
  }

  public getMobileNumberByIdCardNumber(
    identityCard: string
  ): Observable<IMobileListNumberByIdCardNumber> {
    const url = `/api/device-sales/v1/customer/listMobileNo/${identityCard}`;
    return this.http.get<IMobileListNumberByIdCardNumber>(url);
  }

  public getCustomerBillingAddress(
    mobileNo: string
  ): Observable<IBillingAddressResponse> {
    const url = this.shared.getUrl(`customer/billing/${mobileNo}`);
    return this.http.get<IBillingAddressResponse>(url);
  }

  public getBlackListLimit(IDCard: string): Observable<any> {
    const url = `/api/customerportal/newRegister/${IDCard}/blackListLimit`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error(`Error occurred:  ${error}`);
        throw error;
      })
    );
  }

  public getQueryContractMobile(IDCard: string): Observable<any> {
    const body = {
      option: '4',
      // mobileNo: '0910031927',
      idCardNo: IDCard,
      profileType: 'All',
      sourceSystem: 'MyChannel',
    };

    const url = this.shared.getUrl(`customer/query-contract-mobile`);
    return this.http.post(url, body).pipe(
      catchError((error: any) => {
        console.error(`Error occurred: ${error}`);
        throw error;
      })
    );
  }

  public sendOtp(msisdn: string): Observable<ISendingOtpResponse> {
    let body = {
      msisdn: msisdn,
    };
    const SEND_OTP_PATH = `customer/otp/send`;
    const url = this.shared.getUrl(SEND_OTP_PATH);
    return this.http.post<ISendingOtpResponse>(url, body).pipe(
      catchError((error: any) => {
        console.error(`Error occurred: ${error}`);
        throw error;
      })
    );
  }
  public verifyOtp(
    request: IVerifyingOtpRequest
  ): Observable<IVerifyingOtpResponse> {
    const SEND_OTP_PATH = `customer/otp/verify`;
    const url = this.shared.getUrl(SEND_OTP_PATH);
    return this.http.post<IVerifyingOtpResponse>(url, request).pipe(
      catchError((error: any) => {
        console.error(`Error occurred: ${error}`);
        throw error;
      })
    );
  }

  public getExistingMobileCare(
    mobileNumber: string
  ): Observable<IExistingMobileCare[]> {
    const EXISTING_CARE_PATH = `customer/get-existing-mobile-care/${mobileNumber}`;
    const url = this.shared.getUrl(EXISTING_CARE_PATH);
    return this.http
      .get<IExistingMobileCareResponse>(url)
      .pipe(map(mapExistingMobileCare));
  }

  public getMaximumLimit() {
    const MAXIMUM_CARE_PATH = 'service-care/maximum-care-service';
    const url = this.shared.getUrl(MAXIMUM_CARE_PATH);
    return this.http.get<{ mobileCareLimit: number }>(url);
  }
}

export function mapExistingMobileCare(
  existingMobileCare: IExistingMobileCareResponse
) {
  const serviceDetails = existingMobileCare.personalInfomation.opt_12.filter(
    (query: IQueryServiceDetail) => query.productGroup == 'Mobile Care'
  );
  const promotions = existingMobileCare.personalInfomation.opt_2.filter(
    (query: IQueryPromotion) => query.produuctGroup == 'Mobile Care'
  );

  const result: any[] = serviceDetails.map((service) => {
    const serviceImei = service.attributeList.find(
      (attr) => attr.fName === 'IMEI'
    )?.fValue;
    const care = promotions.find((promotion) => {
      return (
        promotion.attributeList.find((attr) => attr.fnName === 'IMEI')
          ?.fnValue == serviceImei
      );
    });

    const model = service.attributeList.find(
      (attr) => attr.fName === 'Model'
    )?.fValue;

    return {
      promotionName: care?.promotionName,
      priceIncVat: care?.priceInclVat,
      model: model,
    };
  });

  return result;
}
