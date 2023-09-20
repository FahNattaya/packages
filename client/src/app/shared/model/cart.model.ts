import { IProductList, IPromotionsSelected } from './product.model';
import { ITrades } from './promotion.model';

export interface IProductCart {
  soId: string;
  transactionId: string;
  image: string;
  campaignName: string;
  simCard: ISimCardCart;
  trade: ITrades;
  brand: string;
  model: string;
  productName: string;
  color: string;
  advancePay: string;
  amount: number;
  netPrice: number;
  package: string;
  mobileCare: any;
  productChecked: boolean;
  freeGoods: IFreeGoodsCart[];
}

export interface IFreeGoodsCart {
  name: string;
  code: string;
  qty: string;
}

export interface User {
  username: string;
  timestamp: string;
  locationCode: string;
  ou: string;
  role: string;
  mobileNo: string;
  iat: number;
  exp: number;
}

export interface FreeGood {
  name: string;
  code: string;
  qty: string;
}

export interface IDiscount {
  tradeDiscountId: string;
  type: string;
  value: string;
  amount: string;
  specialType: null | string;
  specialAmount: number;
  discountExcludeVat: number;
  discountIncludeVat: number;
  tradePriceExcludeVat: null | number;
  tradePriceIncludeVat: null | number;
  installmentPartnerFlag: null | string;
  option: string;
  payAdvanceGroupId: null | string;
}

export interface AdvancePay {
  tradeAirtimeId: null | string;
  amount: number;
  installmentFlag: string;
  matAirtime: null | string;
  description: null | string;
  payAdvanceGroupId: null | string;
  promotions: string[];
}

export interface CustomerGroup {
  name: string;
  code: string;
  flowId: string;
}

export interface Product {
  brand: string;
  model: string;
  color: string;
  amount: string;
  campaignId: string;
  campaignName: string;
  privilegeId: string;
  tradeNo: string;
  tradeName: string;
  normalPrice: number;
  netPrice: string;
  customerGroups: CustomerGroup[];
  advancePay: AdvancePay;
  discount: IDiscount;
  freeGoods: FreeGood[];
}

export interface ICartProductListObject {
  //RootObjecttest
  [key: number]: Product;
}

export interface ICartProductList {
  // Data
  productList: ICartProductListObject[];
}

export interface ICartBody {
  //Body
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: ICartProductList;
}

export interface ICart {
  //RootObjectTEST
  body: ICartBody;
  status: string;
}

export interface ICartListObject {
  //RootObject
  [key: number]: ICart;
}

export interface ICreateCompensation {
  transactionId: string;
}

export interface IProductListCreateOrder {
  productType: string;
  soCompany: string;
  productSubType: string;
  brand: string;
  model: string;
  color?: string;
  matCode?: string;
  priceIncAmt?: string;
  priceDiscountAmt?: string;
  qty: string;
  matAirTime?: string;
  tradeNo?: string;
  ussdCode?: string;
  returnCode?: string;
  cashBackFlg?: string;
  tradeAirtimeId?: string;
  tradeDiscountId?: string;
  orderCode?: string;
  contractTempId?: string;
  serialNo?: string;
  simMobileNo?: string;
  valRate?: string;
  packageType?: string;
  simNetworkType?: string;
  fbbNewFlg?: string;
  listMatFreeGoods: IListMatFreeGoods[];
}

export interface IListMatFreeGoods {
  matCodeFG?: string;
  qtyFG?: string;
  tradeFreeGoodsId?: string;
}

/// new sharedtransactions

export interface ICartMc {
  transactionId?: string;
  customer: ICustomerCart;
  sim_card: ISimCardCart;
  device: IDeviceCart;
  billing_information: IBillingInformationCart;
  mobile_care_package: IMobileCareAis;
  device_care_package: IDeviceCareApple;
  device_care_payment: IDeviceCarePayment;
  main_promotion: IPromotionsCart;
  payment?: IPaymentCart;
  seller: ISellerCart;
  queue?: IQueueCart;
  receipt: IReceiptCart;
  order: IOrderCart;
  status?: IStatusCart;
  air_time: IAirTimeCart;
  transactionType: string;
  CREATE_BY: string;
}

export interface IPromotionsCart {
  campaign: IPromotionsSelected;
  trade: ITrades & {
    normalPrice: string;
    orderType: string;
  };
}
export interface ICustomerCart {
  idCardNo: string;
  idCardType: string;
  titleName: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: string;
  expireDate: string;
  homeNo: string;
  moo: string;
  mooBan: string;
  room: string;
  floor: string;
  buildingName: string;
  soi: string;
  street: string;
  province: string;
  amphur: string;
  tumbol: string;
  zipCode: string;
  citizenship: string;
  accountSubCat: string;
  engFlag: string;
  billLanguage: string;
  isKYC: boolean;
  isOCR: boolean;
}
export interface ISimCardCart {
  memberSimCard: any[];
  mobileNo: string;
  isAis: boolean;
}

export interface IDeviceCart {
  amount: number;
  brand: string;
  model: string;
  colorName: string;
  imageUrl: string;
  name: string;
  company: string;
  productSubType: string;
  productType: string;
  imei: string;
  matCode: string;
}

export interface IBillingInformationCart {
  billCycles: IBillCycle[];
  customer: ICustomerCart;
}

export interface IBillCycle {
  from: string;
  to: string;
}
export interface INotInterestedCare {
  accountFees: any[];
  orderFees: any[];
  reason: string;
  isBuyDeviceCare?: boolean;
}
export interface INotCareData {
  accountFees: any[];
  orderFees: any[];
  isBuyDeviceCare?: boolean;
}
export interface IDeviceCareApple {
  accountFees: any[];
  orderFees: any[];
  title?: string;
  promotionCode?: string;
  customAttributes?: {
    promotionName: string;
    promotionCode: string;
    offeringCode?: string,
  };
  reason?: string;
  isBuyDeviceCare: boolean;
  crossMatCode?: string;
  costProductPrice?: string;
  email?: string;
}

export interface IMobileCareAis {
  accountFees: any[];
  orderFees: any[];
  title?: string;
  promotionCode?: string;
  customAttributes?: {
    promotionName: string;
    promotionCode: string;
    offeringCode?: string,
  };
  reason?: string;
  email?: string;
  isBuyDeviceCare?: boolean;
}

export interface ICustomAttributes {
  promotionName: string;
  promotionCode: string;
}

export interface IDeviceCarePayment {
  tranId?: string;
  tranDtm?: string;
  status?: string;
  startDtm?: string;
  qrType?: string;
  orderId?: string;
  offerId?: string;
  lastUpdate?: string;
  amount?: number;
  paymentMethod?: string;
  paymentType?: string;
  creditCardNo?: string;
  cardExpireDate?: string;
  bankAbbr?: string;
  matCodeCarePlus?: string;
  email?: string;
}

export interface IDiscountCart {
  tradeDiscountId: number;
  tradePriceExcludeVat: any;
  tradePriceInCludeVat: any;
  discountExcludeVat: number;
  discountExcludeBy: string;
  specialDiscountIncludeVat: any;
  specialDiscountBy: any;
  vatRate: number;
  tradePrivilegeId: number;
  installmentPartnerFlag: any;
  startDate: string;
  endDate: string;
}

export interface IPayAdvance {
  payAdvanceGroupId: any;
  priceIncludeVat: number;
  installmentFlag: any;
  matAirtime: any;
  description: any;
}

export interface IPrivilege {
  tradePrivilegeId: number;
  privilegeId: string;
  ussdCode: string;
}

export interface ICriteria {
  chargeType?: string[];
  criteria?: string[];
  instanceName?: string[];
  target?: string[];
}

export interface IFreeGood {
  tradeFreegoodsId: string;
  code: string;
  tradeNo: string;
  name: string;
  qty: string;
}

export interface ICustomerGroup {
  code: string;
  flowId: string;
  name: string;
}
export interface IAdvancePay {
  tradeAirtimeId: any;
  amount: number;
  installmentFlag: string;
  matAirtime: any;
  description: any;
  payAdvanceGroupId: any;
  promotions: any[];
}

export interface IPriceGroup {
  priceType: string;
  price: number;
}

export interface IPayment {
  cardType: string;
  method: string;
  installId?: number;
  balloonMonths?: number;
  installmentId?: string;
}

export interface IBank {
  abb: string;
  name: string;
  imageUrl: string;
  installmentDatas: IInstallmentData[];
  installment: string;
  remark: any;
  balloonMonths: number;
}

export interface IInstallmentData {
  installmentMounth: number;
  installmentPercentage: number;
  balloonMonths: number;
  abb: string;
  abbRaw: string;
  price: IPrice[];
}

export interface IPrice {
  priceFix: number;
  priceExtend: number;
}

export interface IPaymentCart {
  paymentForm: string;
  paymentOnlineCredit: boolean;
  paymentQrCodeType: string;
  paymentType: string;
  paymentBank: string;
  paymentMethod: string;
  creditCardBank: any;
  creditCardName: any;
  creditCardNo: any;
  installmentMonth: any;
  projectId1: any;
  projectId2: any;
  projectPrice: any;
  projectType: any;
  remark: any;
  terminalId: any;
  userId: any;
}
export interface ISellerCart {
  locationCode: string;
  locationName: string;
  sellerName: string;
  ascCode: string;
  employeeId: string;
  soChannel: string;
}

export interface IQueueCart {
  queueNo: string;
}

export interface IReceiptCart {
  billCycles: any[];
}

export interface IOrderCart {
  soId: string;
}

export interface IStatusCart {
  code: string;
  description: string;
}

export interface IAirTimeCart {
  tradeAirtimeId: string | null;
  amount: number;
  installmentFlag: string;
  matAirtime: string | null;
  description: string | null;
  payAdvanceGroupId: string | null;
  promotions: any[];
  payment: IPaymentAirTime;
}

export interface IPaymentAirTime {
  code: string;
}

export interface ICustomerAddress {
  addrNo: string;
  moo: string;
  mooban: string;
  buildingName: string;
  floor: string;
  room: string;
  soi: string;
  streetName: string;
  tumbon: string;
  amphur: string;
  province: string;
  country: string;
  zipCode: string;
}

export interface ICustomerReceipt {
  firstName: string;
  lastName: string;
  homeNo: string;
  moo: string;
  mooban: string;
  buildingName: string;
  floor: string;
  room: string;
  soi: string;
  streetName: string;
  tumbon: string;
  amphur: string;
  province: string;
  country: string;
  zipCode: string;
}

export interface IOrderList {
  soId: string;
  locationSource: string;
  locationReceipt: string;
  userId: string;
  queueNo: string;
  cusNameOrder: string;
  soChannelType: string;
  soDocumentType: string;
  productList: IProductList[];
  grandTotalAmt: string;
  saleCode: string;
  taxCardId: string;
  cusMobileNoOrder: string;
  customerAddress: any;
  receipt: {
    customer: ICustomerReceipt;
  };
  paymentMethod: string;
  installmentTerm: string | number;
  installmentRate: string | number;
  mobileAisFlg: string;
  bankAbbr: string;
  receiptType: string;
  customerType: string;
}
