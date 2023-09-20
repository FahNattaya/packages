// import { ITrades } from './promotion.model';
import { ISeller } from './seller.model';

export interface IStockTabs {
  key: string;
  name: string;
  dataTestId: string;
}

export interface IProductStockResponse {
  response: {
    resultCode: string;
    resultDescription: string;
    developerMessage: string;
    listData: IListData[];
  };
}

export interface IProductStockRequest {
  stockType: string;
  locationCodeSource: string;
  locationCodeDest: string;
  productType: string;
  productSubType: string;
  subStock: string;
  brand: string;
  model: string;
}

export interface IListData {
  locationCode: string;
  locationName: string;
  productStock: IProductStock[];
}

export interface IProductStock {
  brand: string;
  model: string;
  productType: string;
  productSubType: string;
  productName: string;
  totalStockAval: string;
  company: string;
  colorStock: IColorStock[];
}

export interface IColorStock {
  color: string;
  stockAval: string;
}

export interface ICheckStockReq {
  locationSource: string;
  locationReceipt: string;
  userId: string;
  cusNameOrder: string;
  subStockDestination: string;
  soChannelType: string;
  soDocumentType: string;
  storeName: string;
  preBookingNo: string;
  reserveNo: string;
  grandTotalAmt: string;
  depositAmt: string;
  productList: IProductList[];
}

export interface IProductList {
  soCompany: string;
  productType: string;
  productSubType: string;
  brand: string;
  model: string;
  color: string;
  matCode?: string;
  priceIncAmt: string;
  priceDiscountAmt: string;
  qty: string;
  matAirTime: string;
  tradeNo?: string;
  ussdCode?: string;
  returnCode?: string;
  tradeAirtimeId?: string | null;
  tradeDiscountId?: string | null;
  listMatFreeGoods: IListMatFreeGoods[];
}

export interface IListMatFreeGoods {
  matCodeFG: string;
  qtyFG: string;
  tradeFreeGoodsId: string;
}

export interface ICheckStockRes {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: {
    resultCode: string;
    resultMessage: string;
    soId?: string;
  };
}

export interface IDetailProductSelected {
  colorId: number;
  company: string;
}

export interface IProductDetailResponse {
  statusCode: string;
  statusDesc: string;
  name: string;
  productSubtype: string;
  products: {
    colorName: string;
    colorCode: string;
    images: {
      thumbnail: string | null;
      baseView: { imageUrl: string }[];
    };
  }[];
}

export interface IProductDetailRequest {
  productType: string;
  productSubtype: string;
  brand: string;
  model: string;
  location: string;
}

export interface IProductDetail {
  productType: string;
  productSubtype: string;
  brand: string;
  model: string;
  matCode?: string;
  imei?: {
    code?: string;
    modelName?: string;
    price?: string;
  };
  colors: IColorDetail[];
  location: string;
  normalPrice: string;
  productName: string;
  colorDefault?: string;
  imageDefault?: string;
}

export interface IColorDetail {
  colorId: number;
  code: string;
  name: string;
  stock: string;
  imageUrl: string[];
}

export interface IPromotionsSelected {
  campaignName: string;
  conditionCode: string;
  company: string;
  color: string;
  priceIncludeVat: string;
  discountIncludeVat: string;
  netPrice: string;
  contract: number;
  advancePay: string;
  installmentFlag: boolean;
  // trade: ITrades;
  summaryPrice?: string;
  privilegeReturnCode: string;
}

export interface IBrandResponse {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: IBrandDetail[];
}

export interface IBrandDetail {
  name: string;
  imageUrl: string;
  priority: string;
  selectedStoreId?: string;
}

export interface IDataSubProduct {
  productType: string;
  productSubtype: string;
  brand: string;
  name: string;
  model: string;
  imageUrl: string;
  normalPrice: string;
  promotionPrice: IPrice;
}

export interface ISearchHandsetResponse {
  data: IHandsetResponse[]
  developerMessage: string
  resultCode: string
  resultDescription: string
}

export interface IHandsetResponse {
  brand: string;
  products: IHandset[];
}

export interface IHandset {
  brand: string;
  name: string;
  model: null | string;
  imageUrl: string;
  itemType: null | string;
  flag5G: string;
  dv: any[];
  productType: string;
  productSubtype: string;
  normalPrice: IPrice;
  promotionPrice: IPrice;
  subProducts: ISubProduct[];
}

export interface ISubProduct {
  productId?: string;
  name: string;
  model: string;
  imageUrl: string;
  normalPrice: IPrice;
  promotionPrice: IPrice;
  detail?: ISubProductDetail
  colors?: Array<any>;
  image?: string;
}

interface ISubProductDetail {
	name: string;
	products: {
		colorName: string;
		colorCode: string;
		sku: string[];
		images: {
			thumbnail: string;
			baseview: {
				imageUrl: string;
			}[];
		}[];
	};
}
interface IPrice {
  min: string;
  max: string;
}

export interface IDataProductDetailPage {
  sellerData: ISeller;
  productDetail: IProductDetail;
  stockConfig: { subStockCode: string; stockType: string };
}

export interface ICheckImeiRes {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: ICheckImeiData;
}
export interface ICheckImeiData {
  status: string;
  brand: string;
  model: string;
  color: string;
  company: string;
  matcode: string;
  price?: number;
  statusIMEI: string;
  productSubtype: string;
  productType: string;
}
