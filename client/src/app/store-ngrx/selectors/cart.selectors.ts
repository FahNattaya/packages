import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getCartState = (state: AppState) => state.cart;

export const getCartList = createSelector(
  getCartState,
  (dataState) => dataState.cartList
);

export const getTransactionIdInCart = createSelector(
  getCartState,
  (dataState) => dataState.cartList[0].transactionId
);

export const getTransactionId = createSelector(
  getCartState,
  (productState) => productState.transactionId
);

export const getProductInCart = createSelector(
  getCartState,
  (productState) => productState.cartList[0].device
);

export const getDataFromProductSelling = createSelector(
  getCartState,
  (
    dataState
  ) => {
    return {
      colorName: dataState.colorName,
      selectedColor: dataState.selectedColor,
      company: dataState.company,
      campaignSelected: dataState.campaignSelected,
      tradeSelected: dataState.tradeSelected,
      tradePrice: dataState.tradePrice,
      customerCriteria: dataState.customerCriteria
    }
  }
)

export const getDataFromValidateCustomer = createSelector(
  getCartState,
  (dataState) => {
    return {
      returnCode: dataState.returnCode,
      stockRes: dataState.stockRes,
    }
  }
)