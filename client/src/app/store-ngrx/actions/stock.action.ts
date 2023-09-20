import { createAction, props } from '@ngrx/store';
import {
  IListData,
  IProductStockRequest,
} from 'src/app/shared/model/product.model';

export const loadStockDataMyShop = createAction(
  '[Stock] Load Stock Data Myshop',
  props<{ reqStock: IProductStockRequest }>()
);
export const loadStockDataMyShopSuccess = createAction(
  '[Stock] Load Stock Data Myshop Success',
  props<{ dataStock: IListData[] }>()
);
export const loadStockDataMyShopFailure = createAction(
  '[Stock] Load Stock Data Myshop Failure',
  props<{ error: any }>()
);
export const loadStockDataOtherSuccess = createAction(
  '[Stock] Load Stock By Location Success',
  props<{ dataStock: IListData[] }>()
);
export const loadStockDataOther = createAction(
  '[Stock] Load Stock By Location',
  props<{ reqStock: IProductStockRequest }>()
);
export const loadStockDataOtherFailure = createAction(
  '[Stock] Load Stock By Location Failure',
  props<{ error: any }>()
);
export const clearStockData = createAction('[Stock] Clear Stock Data');
export const loadSubStockCode = createAction(
  '[Stock] Load SubStock Code',
  props<{ outChnSaleCode: string }>()
);
export const loadSubStockCodeSuccess = createAction(
  '[Stock] load SubStock Code Success',
  props<{ code: string; flow: string }>()
);
