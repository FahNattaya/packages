import { Action, createReducer, on } from '@ngrx/store';
import * as cartAction from '../actions/cart.action';
import { ICheckStockRes } from 'src/app/shared/model/product.model';
import { ICustomerCriteria } from 'src/app/shared/model/mc-config.model';
import { ICampaignResponseData, ITradePrice, ITrades } from 'src/app/shared/model/promotion.model';
export interface ICartState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  cartList?: any;
  orderStatus?: any;
  transactionId?: string;

  colorName?: string;
  selectedColor?: number;
  company?: string;
  campaignSelected?: ICampaignResponseData;
  tradeSelected?: ITrades;
  tradePrice?: ITradePrice;
  customerCriteria?: ICustomerCriteria;

  returnCode?: string;
  stockRes?: ICheckStockRes;
}

export const initialState: ICartState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
  cartList: undefined
};

export const cartReducer = createReducer(
  initialState,
  on(cartAction.loadCartList, (state) => ({
    ...state,
    isLoading: true,
    cartList: initialState.cartList
  })),
  on(cartAction.loadCartListSuccess, (state, { cartList }) => ({
    ...state,
    isLoading: false,
    cartList: cartList,
  })),
  on(cartAction.createOrderListSuccess, (state, { orderListRes }) => ({
    ...state,
    orderStatus: orderListRes,
  })),
  on(cartAction.saveDataFromProductSelling, (state, {
    colorName,
    selectedColor,
    company,
    campaignSelected,
    tradeSelected,
    tradePrice,
    customerCriteria,
  }) => ({
    ...state,
    colorName: colorName,
    selectedColor: selectedColor,
    company: company,
    campaignSelected: campaignSelected,
    tradeSelected: tradeSelected,
    tradePrice: tradePrice,
    customerCriteria: customerCriteria,
  })),
  on(cartAction.saveDataFromValidateCustomer, (state, {
    returnCode,
    stockRes,
  }) => ({
    ...state,
    returnCode: returnCode,
    stockRes: stockRes,
  })),
);

export function cartReducerFunction(state: ICartState, action: Action) {
  return cartReducer(state, action);
}
