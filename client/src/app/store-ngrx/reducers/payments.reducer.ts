import { Action, createReducer, on } from '@ngrx/store';
import {
  loadLoanAddress,
  loadPaymentData,
  loadPaymentDataFailed,
  loadPaymentDataSuccess,
  loadLoanAddressSuccess,
  saveUserPaymentData,
  selectedLoanAddress,
} from '../actions/payments.action';
import { ILoanAddrss, IPayment } from 'src/app/shared/model/payment.model';

export interface IPaymentState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  dataPayments: any;
  paymentSelected?: { handsetPayment: IPayment; mobileCarePayment: IPayment };
  loanAddress?: ILoanAddrss;
  isSelectedLoan?: boolean;
}

export const initialState: IPaymentState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
  dataPayments: null,
};

export const initialStatePaymentSelected: any = {
  handset: {},
  moblieCare: {},
};

export const paymentReducer = createReducer(
  initialState,
  on(loadPaymentDataSuccess, (state, { dataPayments }) => ({
    ...state,
    dataPayments: dataPayments,
    isLoaded: true,
    isLoading: false,
  })),
  on(loadPaymentData, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadPaymentDataFailed, (state, { error }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: error,
  })),
  on(saveUserPaymentData, (state, { paymentSelected }) => ({
    ...state,
    paymentSelected: paymentSelected,
  })),
  on(selectedLoanAddress, (state, {isSelected}) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
    isSelectedLoan: isSelected 
  })),
  on(loadLoanAddress, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadLoanAddressSuccess, (state , {loanAddress}) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
    loanAddress: loanAddress,
    isSelectedLoan: true
  }))
);

export function Reducer(state: IPaymentState, action: Action) {
  return paymentReducer(state, action);
}
