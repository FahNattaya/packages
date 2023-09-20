import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getDataState = (state: AppState) => state.payment;

export const getPaymentData = createSelector(
  getDataState,
  (dataState) => dataState.dataPayments
);

export const getLoading = createSelector(
  getDataState,
  (dataState) => dataState.isLoading
);

export const getError = createSelector(
  getDataState,
  (dataState) => dataState.isError
);

export const getUserPaymentData = createSelector(
  getDataState,
  (dataState) => dataState.paymentSelected
);

export const  getUserPaymentType = createSelector(
  getDataState,
  (dataState) => dataState.paymentSelected?.handsetPayment
);

export const getLoanAddress = createSelector(
  getDataState,
  (dataState) => dataState.loanAddress
);

export const getIsSelectedLoan = createSelector(
  getDataState,
  (dataState) => dataState.isSelectedLoan
)