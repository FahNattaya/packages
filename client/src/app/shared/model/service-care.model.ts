export interface IMobileCareRequest {
  handsetPrice?: string;
  language?: string;
  productType?: string;
  productSubType?: string;
  brand?: string;
  model?: string;
  productName?: string;
  matCode?: string;
  activeDate?: string;
}

export interface IMobileCare {
  productType: string;
  title: string;
  service: string;
  protection: IMobileCareProtection[];
  condition: IMobileCareCondition[];
  serviceFee: string;
  serviceType: IMobileCareServiceType;
  crossMatCode?: string;
  orderFees: IOrderFees
}

export interface IExistingMobileCare {
  promotionName: string;
  priceIncVat: string;
  model: string;
}

export interface IMobileCareProtection {
  name: string;
  isProtect: boolean;
}

export interface IMobileCareCondition {
  detail: string;
  price: string;
}

export interface IMobileCareServiceType {
  productType: string;
  title: string;
  option: IMobileCareServiceTypeOption[];
}

export interface IMobileCareServiceTypeOption {
  name: string;
  price: string;
  promotionCode: string;
  offeringCode?: string;
}

export interface IMobileCareSelected {
  email: string;
  title: string;
  productType: string;
  option: IMobileCareServiceTypeOption;
  matCodeCarePlus: string;
  orderFees?: IOrderFees
}

export interface ILimitCare {
  limitCareList: ILimitCareList;
  displayStatus: boolean;
}

export interface ILimitCareList {
  productName: string;
  packageName: string;
  packagePrice: string;
}

export interface ICreateActivityRequest {
  status: string;
  mobileNo: string;
  reason?: string;
  comment?: string;
  activityCategory: string;
  activitySubCategory: string;
  requestTopic?: string;
  username: string;
  channel?: string;
  ReferenceNumber?: string;
  sourceSystem?: string;
  moreInfo?: string;
  locationCode?: string;
  ASCCode?: string;
  moreInfo2?: string;
  moreInfo3?: string;
}
export interface ICreateMobileCare {
  transactionId: string;
}

export interface IOrderFees {
	billingSystem: string;
	productCode: string;
	productName: string;
	priceExclVat: number;
	priceInclVat: number;
	productType: string;
	wordInStatementThai: string;
	wordInStatementEng: string;
}
