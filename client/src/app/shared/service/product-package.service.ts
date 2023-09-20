import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { IPackageRequest, IPackageResponse } from '../model/product-package.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductPackageService {
  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) {}
  getFirstPackage(body: IPackageRequest): Observable<IPackageResponse> {
    const url = this.shared.getUrl(`product-package/contract-first-pack`);
    return this.http.post<IPackageResponse>(url, body);
  }

  getMinimumPackage(body: IPackageRequest): Observable<IPackageResponse> {
    const url = this.shared.getUrl(
      `product-package/get-packages-by-condition`
    );
    return this.http.post<IPackageResponse>(url, body);
  }
}
