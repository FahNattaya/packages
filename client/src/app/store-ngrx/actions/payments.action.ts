import { createAction, props } from '@ngrx/store';
import {
  IPaymentResponse,
  IPayment,
  ILoanAddrss,
} from 'src/app/shared/model/payment.model';

export const loadPaymentData = createAction(
  '[Payment] Load Payment Data With Trade',
  props<{ tradeProductId: number; tradeNo: string; locationCode: string }>(),
);
export const loadPaymentDataSuccess = createAction(
  '[Payment] Load Payment Data Success',
  props<{ dataPayments: IPaymentResponse }>(),
);
export const loadPaymentDataFailed = createAction(
  '[Payment] Load Payment Data Failure',
  props<{ error: any }>(),
);
export const saveUserPaymentData = createAction(
  '[Payment] Save Payment Data Selected From User',
  props<{
    paymentSelected: { handsetPayment: IPayment; mobileCarePayment: IPayment };
  }>(),
);
export const loadLoanAddress = createAction(
  '[Payment] Load load method payment',
  props<{loadType?: string, isSelected: boolean}>(),
);
export const selectedLoanAddress = createAction(
  '[Payment] Select load method',
  props<{isSelected: boolean}>(),
);
export const loadLoanAddressSuccess = createAction(
'[Payment] load Loan Address Success',
props<{ loanAddress: ILoanAddrss}>(), 
)

