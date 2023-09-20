import { createReducer, on, Action } from '@ngrx/store';
import {
  saveSelectMobileCare
} from '../actions/product.action';

export interface IServiceCareState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  selectedMobileCare?: any;
  // allMobileCareService?: any;
}

export const initialState: IServiceCareState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const serviceCareReducer = createReducer(
  initialState,
  on(saveSelectMobileCare, (state, { selectedMobileCare }) => ({
    ...state,
    selectedMobileCare: selectedMobileCare,
    isLoaded: true,
    isLoading: false,
  })),
  // on(saveMobileCare, (state, { model }) => ({
  //   ...state,
  //   allMobileCareService: model,
  //   isLoaded: true,
  //   isLoading: false,
  // }))
);

export function serviceCareFunction(state: IServiceCareState, action: Action) {
  return serviceCareReducer(state, action);
}
