import { createReducer, on, Action } from '@ngrx/store';
import {
  loadConfigMCSuccess,
  loadConfigMC,
  loadConfigMCFailure,
} from '../actions/mc-config.action';
import { loadSubStockCodeSuccess } from '../actions/product.action';
import {
  ICustomerCriteria,
  IOutChannelCriteria,
} from 'src/app/shared/model/mc-config.model';

export interface IMcConfigState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  customer_criteria?: ICustomerCriteria[];
  subStockCode?: string;
  stockType?: string;
  outChannelSales_criteria?: IOutChannelCriteria;
}

export const initialState: IMcConfigState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const configMCReducer = createReducer(
  initialState,
  on(loadConfigMCSuccess, (state, { configMC, nameConfig }) => ({
    ...state,
    [nameConfig]: configMC,
    isLoaded: false,
    isLoading: false,
  })),
  on(loadConfigMC, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadConfigMCFailure, (state, { error }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: error,
  })),
  on(loadSubStockCodeSuccess, (state, { code, flow }) => ({
    ...state,
    subStockCode: code,
    stockType: flow,
  }))
);

export function configMCReducerFunction(state: IMcConfigState, action: Action) {
  return configMCReducer(state, action);
}
