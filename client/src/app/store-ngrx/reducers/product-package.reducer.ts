import { Action, createReducer, on } from '@ngrx/store';
import {
  loadCurrentPackage,
  loadCurrentPackageSuccess,
  loadContractFirstPack,
  loadContractFirstPackSuccess,
} from '../actions/package.action';
import { loadPromotionShelvesSuccess, loadMinimumPackages, loadMinimumPackagesSuccess, selectedPackage } from '../actions/product-package.action';
import { IDataPackageSelected } from 'src/app/shared/model/product-package.model';

export interface IproductPackageState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  dataCurrentPackage?: any;
  dataContractFirstPack?: any;
  promotionShelves?: any;
  minimumPackage?: any;
  selectedPackage?: IDataPackageSelected;
}

export const initialState: IproductPackageState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const productPackageReducer = createReducer(
  initialState,
  on(loadCurrentPackage, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadCurrentPackageSuccess, (state, { currentPackage }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    dataCurrentPackage: currentPackage,
    errorData: null,
  })),
  on(loadContractFirstPack, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(loadContractFirstPackSuccess, (state, { contractFirstPack }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    dataContractFirstPack: contractFirstPack,
    errorData: null,
  })),
  on(loadPromotionShelvesSuccess, (state, { promotionShelvesRes }) => ({
    ...state,
    promotionShelves: promotionShelvesRes.data
  })),
  on(loadMinimumPackages, (state) => ({
    ...state,
    minimumPackage: [],
    isLoaded: false,
    isLoading: true,
  })),
  on(loadMinimumPackagesSuccess, (state, { packageRes }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    minimumPackage: packageRes
  })),
  on(selectedPackage, (state, { dataSelectPackage }) => ({
    ...state,
    selectedPackage: dataSelectPackage
  }))
);

export function Reducer(state: IproductPackageState, action: Action) {
  return productPackageReducer(state, action);
}
