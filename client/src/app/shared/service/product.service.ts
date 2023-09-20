import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import {
  ICheckImeiRes,
  ICheckStockReq,
  ICheckStockRes,
  IHandset,
  IHandsetResponse,
  IProductDetailRequest,
  IProductStockRequest,
  IProductStockResponse,
  ISearchHandsetResponse,
} from '../model/product.model';
import { SharedService } from './shared.service';
import { IProductDetailResponse } from '../model/product.model';
import { HttpCancelService } from '../../core/service/http-cancal.service';
import { TokenService } from 'src/app/core/service/token.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  allBrandsData$: Observable<any> | undefined;
  private brandSubject = new Subject<IHandset[]>();
  private groupModel = new Subject<IHandsetResponse[]>();

  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private httpCancelService: HttpCancelService,
    private tokenService: TokenService
  ) {}

  getBrandsOfProduct(locationCode: String): Observable<any> {
    const url = this.shared.getUrl(`product/all-brands/${locationCode}`);
    if (!this.allBrandsData$) {
      this.allBrandsData$ = this.http.get<any>(url).pipe(
        shareReplay({ bufferSize: 1, refCount: false }),
        map((data) => {
          return data.brands;
        })
      );
    }
    return this.allBrandsData$;
  }

  getModelProduct(brand: string) {
    const url = this.shared.getUrl(`product/product-by-brand`);
    this.http
      .post<any>(url, {
        brand: brand,
        offset: '1',
        maxRow: '100',
        location: this.tokenService.getDataToken()?.locationCode || '',
      })
      .subscribe((response) => {
        this.brandSubject.next(response.products);
      });
  }

  getDataModelProduct(): Observable<IHandset[]> {
    return this.brandSubject.asObservable();
  }

  getGroupModel(brands: string[]) {
    const url = this.shared.getUrl(`product/product-by-brands`);
    this.http
      .post<any>(url, {
        brands,
        offset: '1',
        maxRow: '100',
        location: this.tokenService.getDataToken()?.locationCode || '',
      })
      .subscribe((response) => {
        this.groupModel.next(response.data);
      });
  }

  getDataGroupModel(): Observable<IHandsetResponse[]> {
    return this.groupModel.asObservable();
  }

  getProductDetail(
    model: IProductDetailRequest
  ): Observable<IProductDetailResponse> {
    const url = this.shared.getUrl(`product/product-detail`);
    return this.http.post<IProductDetailResponse>(url, model);
  }

  searchProduct(keyword: string): Observable<ISearchHandsetResponse> {
    const url = this.shared.getUrl(`product/products/search`);
    const options = keyword
      ? { params: new HttpParams().set('keyword', keyword) }
      : {};
    return (this.http.get<ISearchHandsetResponse>(url, options));
  }

  getStockList(
    request: IProductStockRequest
  ): Observable<IProductStockResponse> {
    const url = this.shared.getUrl(`product/query-stock-omni`);
    return this.http
      .post<IProductStockResponse>(url, request)
      .pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()));
  }

  getCheckStock(reqBody: ICheckStockReq): Observable<ICheckStockRes> {
    const url = `/api/device-sales/v1/cart/add-cart-list`;
    return this.http.post<ICheckStockRes>(url, reqBody);
  }

  checkImeiDT(request: any) {
    const url = this.shared.getUrl(`product/check-imei`);
    return this.http
      .post<ICheckImeiRes>(url, request)
      .pipe(map((data) => data.data));
  }
}
