import { Action, createReducer, on } from '@ngrx/store';
import {
  loadContractImage,
  loadContractImageSuccess,
  loadContractImageFailure,
} from '../actions/e-document.action';

export interface IEDocumentState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  contractImage?: any;
  contractError?: any
}

export const initialState: IEDocumentState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const EDocumentReducer = createReducer(
  initialState,
  on(loadContractImage, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadContractImageSuccess, (state, { contractImage }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: false,
    contractImage: contractImage,
    errorData: null,
  })),
  on(loadContractImageFailure, (state, { error }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: true,
    contractError: error,
  }))
);

export function AllEDocumentReducer(state = initialState, action: Action) {
  return EDocumentReducer(state, action);
}
