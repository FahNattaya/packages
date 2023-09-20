import { createAction, props } from '@ngrx/store';
import {
  IHandset,
  IProductDetail,
  IProductStockRequest,
  IListData,
  IProductDetailRequest,
  IDataSubProduct,
} from 'src/app/shared/model/product.model';
import {
  IMobileCareSelected,
  IMobileCareRequest,
  IMobileCare,
} from 'src/app/shared/model/service-care.model';

export const loadProductDetail = createAction(
  '[Product] Load Product Detail',
  props<{ model: IProductDetailRequest, data: any }>()
);
export const saveSelectBrandModel = createAction(
  '[Product] Save Select Model by brand',
  props<{ selectedProduct: IProductDetail }>()
);
export const saveSelectModelProduct = createAction(
  '[Product] Save Select All Model By Series',
  props<{ selectedAllModel: IHandset }>()
);
export const saveSelectMobileCare = createAction(
  '[Product] Save Select Mobile Care',
  props<{ selectedMobileCare: IMobileCareSelected }>()
);
export const getMobileService = createAction(
  '[Product] Load Mobile Service',
  props<{ model: IMobileCareRequest }>()
);
export const saveMobileCare = createAction(
  '[Product] save Mobile Care form ',
  props<{ model: IMobileCare[] }>()
);

//handset-list page state handling
// handle search
export const saveSearchWord = createAction(
  '[Product] save search word',
  props<{ searchWord: string }>()
);
export const saveSelectedBrands = createAction(
  '[Product] save on selected brands',
  props<{ selectedBrandNames: string }>()
);
export const saveSelectedGroupBrands = createAction(
  '[Product] save on selected group brands',
  props<{ selectedGroupBrand: IHandset }>()
);
export const saveSelectedSubProduct = createAction(
  '[Product] save on selected handset',
  props<{ selectedSubProduct: IDataSubProduct}>()
)

export const saveSelectedHandset = createAction(
  '[Product] save input handset product data',
  props<{
    selectedBrands: string;
    selectedModels: string;
    selectedProduct: string;
  }>()
);

// stock
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
