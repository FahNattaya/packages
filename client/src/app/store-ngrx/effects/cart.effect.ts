import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import {
  createOrderList,
  createOrderListSuccess,
  loadCartList,
  loadCartListSuccess,
} from '../actions/cart.action';
import { CartService } from 'src/app/shared/service/cart.service';
import { PaymentService } from 'src/app/shared/service/payment.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private paymentService: PaymentService
  ) {}
  getCartList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCartList),
      mergeMap((action) =>
        this.cartService
          .getCartList(action.mobileNo, action.locationCode)
          .pipe(map((data) => loadCartListSuccess({ cartList: data })))
      )
    )
  );

  createOrderList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrderList),
      mergeMap((action) =>
        this.paymentService.createOrderList(action.orderListReq).pipe(
          map((data) => {
            return createOrderListSuccess({
              orderListRes: data.resultMessage,
            });
          })
        )
      )
    )
  );
}
