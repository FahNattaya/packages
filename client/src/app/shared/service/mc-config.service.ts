import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import {
  ICompanyName,
  IConfigApiByRole,
  IConfigDataRes,
  IConfigMCRes,
  ICustomerCriteria,
  IOutChannelSales,
} from '../model/mc-config.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class McConfigService {
  private dataSubject = new Subject<ICompanyName>();
  companyData$ = this.dataSubject.asObservable();
  apiRoleData = new Subject<IConfigApiByRole[]>();
  apiRoleData$ = this.apiRoleData.asObservable();

  constructor(private http: HttpClient, private shared: SharedService) {}

  getConfig(channelSaleCode: string): Observable<IConfigDataRes> {
    const url = this.shared.getUrl(`mc/config/getConfigSaleChannel`);
    return this.http.post<IConfigDataRes>(url, {
      outChnSalesCode: channelSaleCode,
    });
  }

  getCompanyName(companyAbbr: string): Observable<ICompanyName> {
    const url = this.shared.getUrl(`location/get-company/${companyAbbr}`);
    return this.http.get<ICompanyName>(url).pipe(
      tap({
        next: (companyData: any) => this.dataSubject.next(companyData),
        error: (error: any) => console.error(error),
      })
    );
  }

  getCheckApiByRole(nameConfig: string): Observable<IConfigMCRes> {
    const requestOptions = {
      nameConfig: nameConfig,
    };
    const url = this.shared.getUrl(`mc/config/getConfigMC`);
    return this.http.post<IConfigMCRes>(url, requestOptions).pipe(
      tap({
        next: (data: any) => this.apiRoleData.next(data.data[0].configFlow),
      }),
      catchError(() => {
        return throwError(() => new Error('Error Check Api By Role'));
      })
    );
  }
  getConfigMC(
    nameConfig: string
  ): Observable<ICustomerCriteria[] | IOutChannelSales[]> {
    const requestOptions = {
      nameConfig: nameConfig,
    };
    const url = this.shared.getUrl(`mc/config/getConfigMC`);
    return this.http.post<IConfigMCRes>(url, requestOptions).pipe(
      map((response: any) => {
        return response.data[0].configFlow;
      })
    );
  }
}
