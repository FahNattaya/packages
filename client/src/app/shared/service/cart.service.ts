import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, retry } from 'rxjs';
import { ICartListObject, ICreateCompensation } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSource = new BehaviorSubject<ICartListObject[]>([]);
  currentCart = this.cartSource.asObservable();

  private dataSubject = new Subject<any>();
  cartList$ = this.dataSubject.asObservable();
  cartCount: number = 0;

  constructor(private http: HttpClient) {}

  getCartList(mobileNo: string, locationCode: string): Observable<any> {
    const url = `/api/device-sales/v1/cart/list/${mobileNo}?locationCode=${locationCode}`;
    return this.http.get<any>(url).pipe(
      tap({
        next: (cartList$) => this.dataSubject.next(cartList$),
        error: (error) => console.error(error),
      }),
      tap((data) => {
        this.cartCount = data.length || 0;
      })
    );
  }

  getCardtProduct(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  createCompensation(req: ICreateCompensation) {
    const url = `/api/device-sales/v1/cart/create-compensation`;
    return this.http.post<any>(url, req).pipe(retry(3));
  }

  updateCart(cart: ICartListObject[]) {
    this.cartSource.next(cart);
  }

  addToCart(reqBody: any): Observable<any> {
    const url = `/api/device-sales/v1/cart/addCart`;
    return this.http.post<any>(url, reqBody);
  }

  createTransaction(reqBody: any): Observable<any> {
    const url = `/api/device-sales/v1/cart/create-transaction`;
    return this.http.post<any>(url, reqBody).pipe(
      tap((data) => {
        if (data.data.isSuccess) this.cartCount++;
      })
    );
  }
  deleteTransaction(
    transactionId: string[],
    soId: string,
    userId: string
  ): Observable<any> {
    const url = `/api/device-sales/v1/cart/delete/transactions`;
    return this.http.post<any>(url, { transactionId, soId, userId }).pipe(
      tap((data) => {
        const isSuccess =
          data?.resultMessage == 'Success' || data?.message == 'Success';
        if (isSuccess) this.cartCount--;
      })
    );
  }

  updateTransaction(transactionId: string, reqbody: any): Observable<any> {
    const url = `/api/device-sales/v1/cart/update/${transactionId}`;
    return this.http.post<any>(url, reqbody);
  }
}
