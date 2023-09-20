export interface ICampaignRequest {
  locationCode: string;
  saleChannels: string[];
  brand: string;
  model: string;
  color: string;
  productType: string;
  productSubtype: string;
  customerGroup: string;
  company: string;
  regularPrice?: number;
  offset: number;
  max: number;
  flow:string;
}

export interface ICampaignResponse {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: ICampaignResponseData[];
}

export interface ICampaignResponseData {
  campaignId: number;
  campaignName: string;
  campaignDesc: string;
  imageUrl: string;
  icon: string;
  recommendFlag: boolean;
  payAdvanceFlag: boolean;
  installmentFlag: boolean;
  fullPaymentFlag: boolean;
  maximumContract: number;
  customerGroup: string;
  conditionCode: string;
  payments?: ICampaignPayment[];
  maxInstallmentTerm?: string;
}

export interface ICampaignPayment {
  method: string;
  cardType: string;
  banks: ICampaignPaymentBank[];
}

export interface ICampaignPaymentBank {
  bankAbbr: string;
  bankDescTh: string;
  bankDescEn: string;
  imageUrl: string;
  installments: ICampaignPaymentBankInstallment[];
}

export interface ICampaignPaymentBankInstallment {
  installmentId: string;
  installmentRate: string;
  installmentTerms: string;
  balloonMonth: string | null;
}

export interface ITradeRequest {
  locationCode: string;
  saleChannels: string[];
  company: string;
  brand: string;
  model: string;
  matCode?: string;
  color: string;
  productType: string;
  productSubtype: string;
  customerGroup: string;
  campaignId: number;
  regularPrice?: number;
}

export interface ITradeResponse {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: Partial<IResponseData>;
}

export interface IResponseData {
  prices: ITradePrice[];
  trades: ITrades[];
}

export interface ITradePrice {
  priceGroup: string;
  includeVat: number;
  excludeVat: number;
  vatRate: string;
  vatAmount: number;
  startDate: string;
}

export interface ITrades {
  tradeProductId: string;
  tradeNo: string;
  tradeName: string;
  packageKeyRef: string;
  packageOnTopKeyRef: string | null;
  minnimumPackagePrice: number;
  maximumPackagePrice: number;
  simLock: string;
  serviceLockHs: string;
  requireCheckQuota: string;
  requireChangePromotion: boolean;
  minimumPriceLength: number | null;
  maximumPriceLength: number | null;
  maxReceiveFreeGoods: number;
  contractId: number;
  durationContract: number;
  limitContract: number;
  discount: ITradeDiscount;
  payAdvance: ITradePayAdvance;
  freegoods: ITradeFreeGoods[];
  privileges: ITradePrivileges[];
  criterias: [
    { chargeType: string[] },
    { criteria: string[] },
    { instanceName: string[] },
    { target: string[] }
  ];
  discountPrice: number;
  orderType?: string;
  modelColor?: string;
}

export interface ITradeDiscount {
  tradeDiscountId: number;
  tradePriceExcludeVat: number | null;
  tradePriceIncludeVat: number | null;
  discountExcludeVat: number | null;
  discountExcludeBy: string | null;
  specialDiscountIncludeVat: number | null;
  specialDiscountBy: string | null;
  vatRate: number | null;
  tradePrivilegeId: number | null;
  installmentPartnerFlag: string | null;
  startDate: string;
  endDate: string | null;
}

export interface ITradePayAdvance {
  payAdvanceGroupId: number;
  priceIncludeVat: number;
  installmentFlag: string;
  matAirtime: string;
  description: string;
}

export interface ITradeFreeGoods {
  matCode: string;
  name: string;
  qty: number;
}

export interface ITradePrivileges {
  tradePrivilegeId: number;
  privilegeId: string;
  ussdCode: string;
}

export interface SimpleChangeTrade {
  trades: {
    previousValue?: ITrades[];
    currentValue: ITrades[];
    firstChange: boolean;
  };
}
