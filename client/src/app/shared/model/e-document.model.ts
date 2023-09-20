export interface IProfileTypeListData {
  data: IProfileTypeList;
}

export interface IProfileTypeList {
  profileType: string;
  contractList: IContractList[];
}

export interface IContractList {
  idCard: string;
  countContract: string;
  countContractExc: string;
  countContractProfileId: string;
  countContractProfileIdExc: string;
  countContractMobile: string;
  countContractMobileExc: string;
  contractDetailList: IContractDetailList[];
}

export interface IContractDetailList {
  status: string;
  mobileStatus: string;
  startDt: string;
  endDt: string;
}

export interface IContactMobile {
  errorMessage: string;
  profileTypeList: IProfileTypeList[]; //profileTypeList dataContract
}
export interface IContactData {
  campaignName: string;
  locationName: string;
  idCard: string;
  titleName: string;
  fullName: string;
  mobileNumber: string;
  brand: string;
  model: string;
  color: string;
  priceIncludeVat: string;
  discountIncludeVat: string;
  netPrice: string;
  contract: number;
  advancePay: string;
  mobileCarePackageTitle: string;
  conditionCode: string;
  company: string;
  idCardType: string;
  summaryPrice: string;
}

export interface IContactRequest {
  campaignName: string;
  locationName: string;
  idCard: string;
  titleName: string;
  fullName: string;
  mobileNumber: string;
  brand: string;
  model: string;
  color: string;
  priceIncludeVat: string;
  discountIncludeVat: string;
  netPrice: string;
  contract: number;
  advancePay: string;
  mobileCarePackageTitle: string;
  condition: string;
  companyProduct: string;
  idCardType: string;
  summaryPrice: string;
}

export interface IContactResponse {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: string;
}

export interface IGetCondition {
  conditionCode: string;
  location: string;
}

interface IDataResponse {
  conditionCode: string;
  conditionName: string;
  conditionText: string;
}

export interface IConditionRespones {
  statusCode: string;
  statusDesc: string;
  data: IDataResponse
}