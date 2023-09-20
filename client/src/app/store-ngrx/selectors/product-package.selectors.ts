import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getPackageDataState = (state: AppState) => state.product_package;

export const getCurrentPackageData = createSelector(
  getPackageDataState,
  (dataState) => dataState.dataCurrentPackage
);

export const getContractFirstPackData = createSelector(
  getPackageDataState,
  (dataState) => dataState.dataContractFirstPack
);

export const getPromotionShelves = createSelector(
  getPackageDataState,
  (dataState) => dataState.promotionShelves
);

export const getMinimumPackage = createSelector(
  getPackageDataState,
  (dataState) => dataState.minimumPackage
);

export const getSelectPackage = createSelector(
  getPackageDataState,
  (dataState) => dataState.selectedPackage
);
