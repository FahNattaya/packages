import { Action, createReducer, on } from '@ngrx/store';
import { loadLocationData, loadLocationDataFailure, loadLocationDataSuccess, loadLocationName, loadLocationNameFailure, loadLocationNameSuccess, loadQueueLocationSuccess } from '../actions/location.action';
import { ILocationName } from 'src/app/shared/model/location.model';

export interface IlocationState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  errorData?: any;
  dataLocation?: any;
  dataLocationName?: ILocationName;
  queueTypeLocation?: string;
}

export const initialState: IlocationState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
  errorData: null,
};
export interface configMCState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  errorData?: any;
  configMC?: any;
}

export const initialConfigMCState: configMCState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
  errorData: null,
};

export const locationReducer = createReducer(
  initialState,
  on(loadLocationDataSuccess, (state, { dataLocation }) => ({
    ...state,
    dataLocation: dataLocation,
    isLoaded: false,
    isLoading: false,
  })),
  on(loadLocationData, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadLocationDataFailure, (state, { error }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: error,
  })),
  on(loadLocationNameSuccess, (state, { dataLocationName }) => ({
    ...state,
    dataLocationName: dataLocationName,
    isLoaded: false,
    isLoading: false,
  })),
  on(loadLocationName, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadLocationNameFailure, (state, { error }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: error,
  })),
  on(loadQueueLocationSuccess, (state, { queueType }) => ({
    ...state,
    queueTypeLocation: queueType
  })),
);

// export const configMCReducer = createReducer(
//   initialConfigMCState,
//   on(loadConfigMCSuccess, (state, { configMC }) => ({
//     ...state,
//     configMC: configMC,
//     isLoaded: false,
//     isLoading: false,
//   })),
//   on(loadConfigMC, (state) => ({
//     ...state,
//     isLoaded: false,
//     isLoading: true,
//   })),
//   on(loadConfigMCFailure, (state, { error }) => ({
//     ...state,
//     isLoaded: true,
//     isLoading: false,
//     isError: error,
//   })),
// );

export function Reducer(state: IlocationState, action: Action) {
  return locationReducer(state, action);
}

// export function configMCReducerFunction(state: configMCState, action: Action) {
//   return configMCReducer(state, action);
// }
