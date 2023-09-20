import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICreateActivityRequest,
  IMobileCareRequest,
  ICreateMobileCare,
} from '../model/service-care.model';
import { Observable, map, retry } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceCareService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  getMobileCare(body: IMobileCareRequest): Observable<any> {
    const url = this.shared.getUrl(`service-care/care-promotions`);
    return this.http
      .post<any>(url, body)
      .pipe(map((response) => response.data));
  }

  createActivityIM(body: ICreateActivityRequest): Observable<any> {
    const url = `/api/customerportal/createActivityIM`;
    return this.http.post<any>(url, body).pipe(
      retry(3),
      map((response) => response.data)
    );
  }

  createMobileCare(req: ICreateMobileCare): Observable<any> {
    const url = `/api/device-sales/v1/service-care/provision-mobilecare`;
    console.log('req', req);
    return this.http.post<any>(url, req).pipe(retry(3));
  }
}
