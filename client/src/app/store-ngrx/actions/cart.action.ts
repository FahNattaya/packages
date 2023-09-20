import { createAction, props } from '@ngrx/store';
import { ICustomerCriteria } from 'src/app/shared/model/mc-config.model';
import { ICheckStockRes } from 'src/app/shared/model/product.model';
import { ICampaignResponseData, ITradePrice, ITrades } from 'src/app/shared/model/promotion.model';

export const loadCartList = createAction(
  '[Cart] Load Cart list',
  props<{ mobileNo: string; locationCode: string }>()
);
export const loadCartListSuccess = createAction(
  '[Cart] Load Cart list Success',
  props<{ cartList: any }>()
);
export const createOrderList = createAction(
  '[Cart] create order list to DT',
  props<{ orderListReq: any }>()
);
export const createOrderListSuccess = createAction(
  '[Cart] create order list to DT Success',
  props<{ orderListRes: any }>()
);

export const saveDataFromProductSelling = createAction(
  '[Cart] save product selling data',
  props<{ 
    colorName: string,
    selectedColor: number,
    company: string,
    campaignSelected: ICampaignResponseData
    tradeSelected: ITrades,
    tradePrice: ITradePrice,
    customerCriteria: ICustomerCriteria,
  }>()
)

export const saveDataFromValidateCustomer = createAction(
  '[Cart] save validate customer data',
  props<{ 
    returnCode: string
    stockRes: ICheckStockRes
  }>()
)
