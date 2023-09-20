import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { IPromotionShelvesReq } from '../model/product-package.model';
import {
  ICampaignRequest,
  ICampaignResponse,
  ITradeRequest,
  ITradeResponse,
} from '../model/promotion.model';
@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  apiData$: Observable<any> | undefined;

  constructor(
    private http: HttpClient,
    private shared: SharedService,
  ) {}

  getCampaignPromotion(
    reqBody: ICampaignRequest
  ): Observable<ICampaignResponse> {
    const url = this.shared.getUrl(`promotion/campaign-and-payments`);
    return this.http.post<ICampaignResponse>(
      url,
      reqBody
    );
  }

  getTradePromotion(reqBody: ITradeRequest): Observable<ITradeResponse> {
    const url = this.shared.getUrl(`promotion/trade-promotion`);
    return this.http.post<ITradeResponse>(url, reqBody);
  }

  checkDeviceContract(reqBody: any): Observable<any> {
    const url = this.shared.getUrl(`privilege/check-device-transaction`);
    return this.http.post<any>(url, reqBody);
  }

  getPromotionShelves(data: IPromotionShelvesReq): Observable<any> {
    const url = this.shared.getUrl(`promotion/promotion-shelves`);
    return this.http.post<any>(url, data);
  }
}
