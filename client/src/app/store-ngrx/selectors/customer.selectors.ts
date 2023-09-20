import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getCustomerDataState = (state: AppState) => state.customer;

export const getCustomerData = createSelector(
  getCustomerDataState,
  (dataState) => dataState.dataCustomer
);
export const getLoading = createSelector(
  getCustomerDataState,
  (dataState) => dataState.isLoading
);

export const getError = createSelector(getCustomerDataState, (dataState) => {
  return { isError: dataState.isError, errorData: dataState.errorData };
});
export const getState = createSelector(
  getCustomerDataState,
  (dataState) => dataState
);
export const getblackListLimitData = createSelector(
  getCustomerDataState,
  (dataState) => dataState.dataBackListLimit
);
export const getContractData = createSelector(
  getCustomerDataState,
  (dataState) => dataState.contractData
);
export const getSelectedAddress = createSelector(
  getCustomerDataState,
  (dataState) => dataState.selectedAddressData
);
export const getMobileListByIdCardNo = createSelector(
  getCustomerDataState,
  (dataSate) => dataSate.mobileListNumberByIdCardNumber
);