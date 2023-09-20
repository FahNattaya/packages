import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getproductState = (state: AppState) => state.product;

export const getLoading = createSelector(
  getproductState,
  (productState) => productState.isLoading
);

export const getError = createSelector(
  getproductState,
  (productState) => productState.isError
);

export const getModel = createSelector(
  getproductState,
  (productState) => productState.selectedBrand
);

export const getSelectProduct = createSelector(
  getproductState,
  (productState) => productState.selectedProduct
);

export const getSelectedAllModel = createSelector(
  getproductState,
  (productState) => productState.selectedAllModel
);

export const getStockDataOther = createSelector(
  getproductState,
  (dataState) => dataState.stockData
);

export const getStockDataMyShop = createSelector(
  getproductState,
  (dataState) => dataState.stockMyshop
);

export const getLoadingStockMyShop = createSelector(
  getproductState,
  (dataState) => dataState.isLoadingMyShop
);

export const getLoadedStockOther = createSelector(
  getproductState,
  (dataState) => dataState.isLoadedOther
);

export const getLoadingStockOther = createSelector(
  getproductState,
  (dataState) => dataState.isLoadingOther
);

export const getLoadedStockMyShop = createSelector(
  getproductState,
  (dataState) => dataState.isLoadedMyShop
);

// handdle search
export const getSearchWord = createSelector(
  getproductState,
  (dataState) => dataState.searchWord
);
export const getselectedBrandNames = createSelector(
  getproductState,
  (dataState) => dataState.selectedBrandNames
);
export const getSelectedGroupBrands = createSelector(
  getproductState,
  (dataState) => dataState.selectedGroupBrands
);
export const getSelectedSubProduct = createSelector(
  getproductState,
  (dataState) => dataState.selectedSubProduct
);