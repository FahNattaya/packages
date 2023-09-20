export interface ICompanyName {
  COMPANY_ABBR: string;
  NAME_TH: string;
  NAME_EN: string;
}

export interface IConfigDataRes {
  config: IConfigData;
}

interface IConfigData {
  outChnSalesCode: string;
  Flow: string;
  subStockCodeDT: string;
  ScanIMEI: string;
  MOC: string;
}
export interface ICustomerCriteria {
  flowNameTh: string;
  flowNameEN: string;
  codeID: string;
  codeCPC: string;
  orderType: string;
  menuCode: string;
  statusEnable: string;
  isShowCurrentPack: boolean;
  includeCampaign?: Array<string>;
  excludeCampaign?: Array<string>;
  includeTrade?: Array<string>;
  excludeTrade?: Array<string>;
  details: IConfigFlowDetail[];
}

export interface IOutChannelSales {
  outChnSalesCode: string;
  Flow: string;
  subStockCodeDT: string;
  MOC: string;
  saleChannels: Array<string>;
  PC: string;
  Tablet: string;
  TB_ScanIMEI: string;
  PC_ScanIMEI: string;
  Mobile: string;
  MB_ScanIMEI: string;
}

export interface IMcConfigFlow {
  nameConfig: string;
  configFlow: ICustomerCriteria[] | IOutChannelSales[] | IConfigApiByRole[];
}
export interface IConfigFlowDetail {
  outChnSalesCode: string[];
  transactionType: string;
  codeCPC?: string;
}

export interface IConfigMCRes {
  developerMessage: string;
  resultCode: string;
  data: IMcConfigFlow[];
}

export interface IConfigApiByRole {
  name: string;
  role: Array<string>;
}

export interface IOutChannelCriteria {
  outChnSalesCode: string;
  Flow: string;
  subStockCodeDT: string;
  MOC: string;
  saleChannels: Array<string>;
  PC: string;
  Tablet: string;
  ScanIMEI: string;
  Mobile: string;
  ScanIMEI_Cart: string;
  ScanIMEI_Product: string;
}

export interface IStockConfig {
  subStockCode: string;
  stockType: string;
}
