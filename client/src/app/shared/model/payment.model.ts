import { IIdCardAddress } from "./customer.model";

export interface IPaymentResponse {
  statusCode: string;
  statusDesc: string;
  payments: IPaymentMethod[];
}

export interface IPaymentMethod {
  method: string;
  cardType: string;
  banks: IPaymentBank[];
  banksFullPaid?: IPaymentBank[];
  banksInstallment?: IPaymentBank[];
  methodName?: string;
  methodNameTh?: string;
}

export interface IPaymentBank {
  bankAbbr: string;
  bankDescTh: string;
  bankDescEn: string;
  imageUrl: string;
  installments: IPaymentInstallment[];
}

export interface IPaymentInstallment {
  installmentId: number;
  installmentRate: string;
  installmentTerms: string;
  balloonMonth: number;
  cardDigits?: number;
}

export interface IPayment {
  paymentMethod: string;
  method: string;
  paymentType: string;
  bankNameTh: string;
  bankNameEn: string;
  bankAbbr: string;
  installment: IPaymentInstallment;
  isInstallment: boolean;
  creditCardNo?: string;
  remaskCreditCard?: string;
  contractNo?: string;
  remaskContract?: string;
}

export interface IPaymentSelected {
  paymentType: string;
  paymentForm: string;
  paymentMethod: string;
  paymentOnlineCredit: boolean;
  installmentRate: number;
  installmentTerms: number;
  paymentBank: {
    name: string;
    abb: string;
    imageUrl: string;
  };
}

export type IKeyCollapsed = 'productCart' | 'paymentHandset' | 'reciept' | 'productList' | 'appleCare';

export interface ICollapsedComponent {
  key: IKeyCollapsed;
  collapsed: boolean;
}

export interface IGetBankResponse {
  statusCode: string;
  statusDesc: string;
  banks: IBank[];
}

export interface IBank {
  name: string;
  abb: string;
  imageUrl: string;
}

export interface ICheckCardInfo {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  prefixCard?: string;
  paymentMethod?: string;
  cardCategory?: string;
  bankCode?: string;
  bankNameTh?: string;
  bankNameEn?: string;
  bankAbbr?: string;
  cardType?: string;
}

export interface IBackForPartner {
  brand: string;
  model: string;
  color: string;
  netprice: string;
  installment: boolean;
  isdevileonly: string;
  tradeProductId: string;
  tradeNo: string;
  locationCode: string;
  outChnSalesCode: string;
}

export interface ILoanAddrss {
  name: string;
  address: IIdCardAddress;
}

export type ICollapsedPaymentType = 'productList' | 'appleCare';
export type ITabsPayment = 'online' | 'counter';
