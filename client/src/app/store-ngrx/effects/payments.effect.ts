import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import {
  loadLoanAddress,
  loadLoanAddressSuccess,
  loadPaymentData,
  loadPaymentDataSuccess,
} from '../actions/payments.action';
import { PaymentService } from 'src/app/shared/service/payment.service';

@Injectable()
export class PaymentsEffects {
  loadPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPaymentData),
      mergeMap((action) =>
        this.paymentService
          .getPaymentWithTrade(
            action.tradeProductId,
            action.tradeNo,
            action.locationCode
          )
          .pipe(map((data) => loadPaymentDataSuccess({ dataPayments: data })))
      )
    )
  );
  loadLoanAddress$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadLoanAddress),
      mergeMap((action) =>
        this.paymentService.getLoanAddress(action.loadType!).pipe(
          map((data) => {
            return loadLoanAddressSuccess({loanAddress: data})
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}
}
