import { createAction, props } from "@ngrx/store";

export const initializeStore = createAction(
  '[Store] Initialize Store',
  props<{
    productData: any;
    customerData: any;
    blackListLimit: any;
    locationData: any;
    stockData: any;
    contractMobile: any;
    userData: any;
    paymentData: any;
  }>()
);
