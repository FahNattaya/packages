import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICheckCardInfo,
  IPaymentResponse,
  IPaymentSelected,
  IBackForPartner,
} from '../model/payment.model';
import { SharedService } from './shared.service';
import { IDeviceCarePayment } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  getPaymentWithTrade(
    tradeProductId: number,
    tradeNo: String,
    locationCode: String
  ): Observable<any> {
    const url = this.shared.getUrl(`payment/getPaymentsByTradeWithCondition`);
    return this.http.post<any>(url, {
      tradeProductId: tradeProductId,
      tradeNo: tradeNo,
      locationCode: locationCode,
    });
  }

  getPaymentAppleCare(locationCode: string): Observable<IPaymentResponse> {
    const url = this.shared.getUrl(`payment/getPaymentAppleCare`);
    return this.http.post<IPaymentResponse>(url, { location: locationCode });
  }

  checkQueryCardInfo(
    prefixCard: string,
    cardCategory: string
  ): Observable<ICheckCardInfo> {
    const url = this.shared.getUrl(`payment/query-card-info`);
    return this.http.post<any>(url, {
      prefixCard: prefixCard,
      cardCategory: cardCategory,
    });
  }

  updatePaymentSelectedToSharedtransactions(
    transactionID: string,
    payments: {
      payment: IPaymentSelected;
      deviceCarePayment: IDeviceCarePayment;
    }
  ): Observable<any> {
    const url = `/api/device-sales/v1/cart/updatePayments/${transactionID}`;
    return this.http.post<any>(url, payments);
  }

  sendSMSQmatic(mobileNo: string): Observable<any> {
    const url = `/api/device-sales/v1/queue/send-sms-qmatic`;
    return this.http.post<any>(url, {
      mobileNo: mobileNo,
    });
  }

  createOrderList(body: any): Observable<any> {
    const url = `/api/device-sales/v1/cart/create-order-list`;
    return this.http.post<any>(url, body);
  }

  getPaymentForPartner(body: IBackForPartner): Observable<IPaymentResponse> {
    const url = `/api/device-sales/v1/payment/payment-for-partner`;
    return this.http.post<any>(url, body);
  }

  getLoanAddress(name: string): Observable<any> {
    const url = `/api/device-sales/v1/payment/loan-address/${name}`;
    return this.http.get<any>(url);
  }
}
