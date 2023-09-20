import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getmcConfigState = (state: AppState) => state.mc_config;

export const getConfigMCData = createSelector(
  getmcConfigState,
  (dataState) => dataState.customer_criteria
);

export const getConfigMCLoading = createSelector(
  getmcConfigState,
  (dataState) => dataState.isLoading
);

export const getConfigMCError = createSelector(
  getmcConfigState,
  (dataState) => dataState.isError
);

export const getStockConfig = createSelector(getmcConfigState, (dataState) => ({
  subStockCode: dataState.subStockCode,
  stockType: dataState.stockType,
}));

export const getOutChCustData = createSelector(
  getmcConfigState,
  (dataState) => dataState.outChannelSales_criteria
);

export const getScanImei = createSelector(
  getmcConfigState,
  (dataState) => dataState.outChannelSales_criteria?.ScanIMEI
);

export const getScanImeiCart = createSelector(
  getmcConfigState,
  (dataState) => dataState.outChannelSales_criteria?.ScanIMEI_Cart
);

export const getScanImeiProduct = createSelector(
  getmcConfigState,
  (dataState) => dataState.outChannelSales_criteria?.ScanIMEI_Product
);

export const getOutChCustDataFlow = createSelector(
  getmcConfigState,
  (dataState) => dataState.outChannelSales_criteria?.Flow
);