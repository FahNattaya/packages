export interface IProfileResponse {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: Partial<ICustomerProfile>;
}
export interface ISendingOtpRequest {
  msisdn: string;
}

export interface ISendingOtpResponse {
  transactionID: string;
  isSuccess: string;
  description: string;
  code: string;
}

export interface IVerifyingOtpRequest {
  msisdn: string;
  pwd: string;
  transactionID: string;
}

export interface IVerifyingOtpResponse {
  code: string;
  description: string;
  isSuccess: string;
  orderRef: string;
  transactionID: string;
}

export interface ICustomerAddress {
  idCardAddress: IIdCardAddress;
  billingAddress: IAddress;
  otherAddress?: IOtherAddress;
}

export interface IIdCardAddress {
  engFlag?: string;
  houseNo: string;
  moo: string;
  mooban: string;
  building: string;
  floor: string;
  room: string;
  soi: string;
  street: string;
  amphur: string;
  tumbol: string;
  province: string;
  zipCode: string;
}

export interface IAddress {
  engFlag: string;
  houseNo: string;
  moo: string;
  mooban: string;
  building: string;
  floor: string;
  room: string;
  soi: string;
  street: string;
  amphur: string;
  tumbol: string;
  province: string;
  zipCode: string;
}
export interface IOtherAddress {
  homeNo: string;
  moo: string;
  mooBan: string;
  room: string;
  floor: string;
  buildingName: string;
  soi: string;
  street: string;
  tumbol: string;
  province: string;
  zipCode: string;
}

export interface IBillingAccount {
  accountState: string;
  accountStateDate: string;
  accountSpecialGroup: string;
  customerName: string;
  billCycle: string;
  paymentMethod: string;
  blacklistStatus: string;
  smsContactNo: string;
  billMedia: string;
  smsBillTo: string;
  billLanguage: string;
  creditLimit: string;
  minCreditLimit: string;
  maxCreditLimit: string;
  scoreRange: string;
  mainMobile: string;
  billDisplay: string;
  creditCardNo: string;
  creditCardName: string;
  creditCardType: string;
  creditCardBankCd: string;
  creditCardExpMonth: string;
  creditCardExpYear: string;
  creditCardRefID: string;
  bankNameCd: string;
  bankAccntNumber: string;
  bankName: string;
  wtReqFlg: string;
  wtReqDt: string;
  title: string;
  address: IAddress[];
  billAccountName: string;
  emailBillTo: string;
  baRegisterDate: string;
  firstRegEStatement: string;
  invoicingCompany: string;
  itemLocalFlg: string;
  itemFax: string;
  itemSmsFlg: string;
  itemVasFlg: string;
  itemGprsFlg: string;
  itemNrFlg: string;
  itemTransFlg: string;
  itemWaiveFlg: string;
  itemStartDt: string;
  itemEndDt: string;
  cdrRequestDt: string;
  itemEmail: string;
  groupBill: string;
  mailGroupFlag: string;
  mailGroupStatementCurrency: string;
  mailGroupLanguage: string;
  mailGroupName: string;
  mailGroupDelivery: string;
  mailGroupStatementStyle: string;
  mailGroupAddress: any[];
}

export interface ICustomerProfile {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  resultData: {
    subScriptionProfile: ISubScriptionProfile;
    nafaProfile: {};
  };
  networkTypeMapping: {
    ntypeId: string;
    ntype: string;
    mobileLocation: string;
    description: string;
    businessType: string;
    networkType: string;
    customerType: string;
    mobileType: string;
  };
}

export interface ICustomerAccess {
  accountState: string;
  accountStateDate: string;
  accountSegment: string;
  accountCategory: string;
  accountSubCategory: string;
  accountGroupCode: string;
  accountGroupName: string;
  accountSpecialGroup: string;
  title: string;
  customerName: string;
  idCardNo: string;
  idCardType: string;
  birthday: string;
  email: string;
  address: IAddress[];
  caId: string;
  nationality: string;
  billCycle: string;
  blacklistStatus: string;
  serviceLevel: string;
  gender: string;
  cardIssueDate: string;
  cardExpired: string;
  hobby: Array<string>;
  titleEng: string;
  customerNameEng: string;
  serviceSubtype: string;
  titleCode: string;
  creditLimit: string;
  idCardTypeDesc: string;
  idCardTypeNo: string;
  urlPicture: string;
  rsmeFlag: string;
  caRegisterDate: string;
}

export interface ISubScriptionProfile {
  caId: string;
  emailLanguage: string;
  ivrLanguage: string;
  msisdn: string; // เบอร์
  publicType: string;
  smsLanguage: string;
  subscriptionState: string; // status
  subscriptionStateDate: string;
  ussdLanguage: string;
  dataChargingSystem: string;
  baId: string;
  saId: string;
  billingSystemAccountId: string;
  billingSystemCustomerId: string;
  chargeType: string; // type ประเภท pre paid post paid
  segment: string;
  registerDate: string;
  brandId: string;
  servicePackageId: string;
  classOfService: string;
  luckyLists: [
    {
      luckyName: string;
      luckyType: string;
    }
  ];
  networkType: string;
  subNetworkType: string;
  churnScore: string;
  churnScoreReason: string;
  paGroup: string;
  paGroupEffectiveDate: string;
  regionCode: string;
  cosId: string;
  segmentEffectiveDate: string;
  segmentExpiryDate: string;
  clvSegment: string;
  remark: string;
  assetId: string;
  amendment: string;
  brandName: string;
  suspendType: string;
  suspendCount: string;
  suspendFraudCount: string;
  firstSuspendCountDate: string;
  blacklistStatus: string;
  installmentFlag: string;
  contractPhoneFlag: string;
  contractFlag: string;
  billingMainProductId: string;
  simSerialNo: string;
  authorizePersonFlag: string;
  fbbContactNo: string;
  billingSystem: string;
  ocrFlag: string;
  ocrReflag: string;
  ocrReason: string;
  ocrApproveBy: string;
  ocrApproveDate: string;
  ocrDate: string;
  ocrErrorCode: string;
  ocrLastUpdate: string;
  ocrLastUpdateBy: string;
  statusReason: string;
  idenFaceFlag: string;
  businessRegId: string;
  regLocationCode: string;
  productType: string;
  classifyCode: string;
  mobileNoStatus: string;
  mobileNoStatusDate: string;
  moiFlag: string;
  moiDate: string;
  businessGrp: string;
  updateLocation: string;
  binNo: string;
  focMember: string;
  maxMsg: string;
  applyMobileNo: string;
  applyLocation: string;
  msgLanguage: string;
  regUserId: string;
  cleaningFlag: string;
  cleaningDate: string;
  smartCase: string;
  cardVersion: string;
  ocrReflagApprove: string;
  smartCardFlag: string;
  balance: string;
  validity: string;
  applyLocationName: string;
  serviceYear: {
    year: string;
    month: string;
    day: string;
  };
  channel: string;
  applyDate: string;
  amendmentReason: string;
  mobileType: string;
  reason: string;
  effectiveServicePI: string;
  cbsMigrateDate: string;
  cbsMigrateFlag: string;
  insMigrateDate: string;
  insMigrateFlag: string;
  vpnFlag: string;
  vpnEffectiveDate: string;
  vpnExpireDate: string;
  loanFlag: string;
  piFlag: string;
  firstActivateDate: string;
  reasonCode: string;
  simStatus: string;
  serviceDay: string;
  nType: string;
  reconnectDate: string;
  fbbContactNo2: string;
  fbbContactNo3: string;
  maxSpeedUL: string;
  maxSpeedDL: string;
  suspendDate: string;
  suspendReason: string;
  credCreditAmount: {
    creditAmount: string;
    usageAmount: string;
    remainAmount: string;
  };
  changeBillingSystemDate: string;
  familyAuth: string;
  cimAssetRemark: string;
  counterMain: string;
  counterOntop: string;
  maxCounterMain: string;
  maxCounterOntop: string;
  ds3notificationPolicyControl: string;
  ds3customerCategory: string;
  productName: string;
  instanceName: string;
}

export interface ISubscriptionAccount {
  msisdn: string;
  subscriptionState: string;
  subscriptionStateDate: string;
  customerAccount: ICustomerAccess[];
  billingAccount: IBillingAccount[];
  serviceAccount: Array<string>;
  subscriptionHolder: [
    {
      birthday: string;
      contactClass: string;
      province: string;
      title: string;
      contactName: string;
      contactFirstname: string;
      contactLastname: string;
      idCardType: string;
      idCardNo: string;
      privateCode: string;
      privateCodeFlag: string;
      socialMedia: Array<string>;
      nationality: string;
      localLanguage: string;
      urlPicture: string;
      urlDate: string;
      contactId: string;
      contactPhone: Array<string>;
    }
  ];
}

export interface ICustomerAccountResultData {
  subscriptionAccount: ISubscriptionAccount;
  nafaProfile: Record<string, any>;
}
export interface ICustomerAccountData {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  resultData: ICustomerAccountResultData;
}
export interface ICustomer {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: ICustomerAccountData;
}

export interface IReceiptAddress {
  engFlag: string;
  houseNo: string;
  moo: string;
  mooban: string;
  building: string;
  floor: string;
  room: string;
  soi: string;
  street: string;
  amphur: string;
  tumbol: string;
  province: string;
  zipCode: string;
}

export interface IBillingAddress {
  idCardNo: string;
  lastName: string;
  buildingName: string;
  subCategory: string;
  amphur: string;
  provinceName: string;
  baNo: string;
  houseNo: string;
  mooBan: string;
  title: string;
  category: string;
  tumbol: string;
  zipCode: string;
  saNo: string;
  caNo: string;
  idCardType: string;
  billAccountName: string;
  chargeType: string;
  firstName: string;
}

export interface IBillingAddressResponse {
  resultCode: string;
  developerMessage: string;
  resultData: {
    billingAddress: {
      idCardNo: string;
      lastName: string;
      buildingName: string;
      subCategory: string;
      amphur: string;
      provinceName: string;
      baNo: string;
      houseNo: string;
      mooBan: string;
      title: string;
      category: string;
      tumbol: string;
      zipCode: string;
      saNo: string;
      caNo: string;
      idCardType: string;
      billAccountName: string;
      chargeType: string;
      firstName: string;
    };
  };
}

export interface IMobileListNumberByIdCardNumber {
  prepaidMobileList: IMobileListReadCard[];
  postpaidMobileList: IMobileListReadCard[];
}

export interface IMobileListReadCard {
  mobileNo: string;
  chargeType: string;
  mobileSegment: string;
  status: string;
  specialSim?: string;
  isShowIcon?: boolean;
}

export interface ICustomerData {
  title: string;
  customerName: string;
  birthday: string;
  mobileNo: string;
  segment?: string;
  serviceYear: any;
  chargeType: string;
  subscriptionState: string;
  billingSystem: string;
  idCardNo: string;
  idCardType: string;
  receiptAddress?: IReceiptAddress;
  customerAddress?: IIdCardAddress;
  isMobileAis: boolean;
  billLanguage: string;
  accountSubCat: string;
  gender: string;
  exprireDate: string;
  engFlag: string;
  imageReadSmartCard?: string;
}
export interface ICustomerPrivilege {
  ussdCode?: string;
  isCheckPrivilegePass?: boolean;
  msgBarcode?: string;
  errorMsg?: string;
  errorDetail?: string;
}

export interface IBackListLimit {
  data: IBackListLimitData;
}

export interface IBackListLimitData {
  flag: string;
  message: string;
  errorMessage: string;
}

export interface IQueryServiceDetail {
  productGroup: string;
  paymentMode: string;
  inStatementThai: string;
  productPkg: string;
  priceType: string;
  integrationName: string;
  productCd: string;
  promotionName: string;
  startDt: string;
  inStatementEng: string;
  attributeList: { fName: string; fValue: string }[];
}

export interface IQueryPromotion {
  promotionName: string;
  productClass: string;
  produuctGroup: string;
  productPkg: string;
  productCd: string;
  endDt: string;
  shortNameThai: string;
  shortNameEng: string;
  startDt: string;
  descThai: string;
  descEng: string;
  inStatementThai: string;
  inStatementEng: string;
  priceType: string;
  productSeq: string;
  monthlyFee: string;
  crmFlg: string;
  paymentMode: string;
  priceExclVat: string;
  integrationName: string;
  attributeList: { fnName: string; fnValue: string }[];
  flagMain: string;
  productAcctnCat: string;
  netFlexiFlg: string;
  url: string;
  priceInclVat: string;
  pro5gflg: string;
}

export interface IPersonalInformation {
  opt_12: IQueryServiceDetail[];
  opt_2: IQueryPromotion[];
}

export interface IExistingMobileCareResponse {
  resultCode: string;
  developerMessage: string;
  personalInfomation: IPersonalInformation;
}

export interface ICuntomerProfileData {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  resultData: ResultData;
}

export interface ResultData {
  customer: Customer;
}

export interface Customer {
  accountState: string;
  accountStateDate: string;
  accountSegment: string;
  accountCategory: string;
  accountSubCategory: string;
  accountGroupCode: string;
  accountGroupName: string;
  accountSpecialGroup: string;
  title: string;
  customerName: string;
  idCardNo: string;
  idCardType: string;
  idCardTypeDesc: string;
  idCardTypeNo: string;
  birthday: string;
  email: string;
  address: Address[];
  caId: string;
  nationality: string;
  billCycle: string;
  blacklistStatus: string;
  serviceLevel: string;
  gender: string;
  cardIssueDate: string;
  cardExpired: string;
  hobby: any[];
  titleEng: string;
  customerNameEng: string;
  serviceSubtype: string;
  titleCode: string;
  creditLimit: string;
  billingSystem: string;
  masterAccount: string;
  parentAccount: string;
  registerDate: string;
  watchlistStatus: string;
  customerAccount: CustomerAccount;
  billingAccount: BillingAccount;
  serviceAccount: ServiceAccount;
}

export interface Address {
  engFlag: string;
  houseNo: string;
  moo: string;
  mooban: string;
  building: string;
  floor: string;
  room: string;
  soi: string;
  street: string;
  amphur: string;
  tumbol: string;
  province: string;
  zipCode: string;
}

export interface CustomerAccount {
  remark: string;
}

export interface BillingAccount {
  remark: string;
}

export interface ServiceAccount {
  remark: string;
}

export interface IMobileNumberByIdCardNumber {
  prepaidMobileList: PrepaidMobileList[];
  postpaidMobileList: PostpaidMobileList[];
}

export interface PrepaidMobileList {
  mobileNo: string;
  chargeType: string;
  mobileSegment: string;
  status: string;
  specialSim: string;
}

export interface PostpaidMobileList {
  mobileNo: string;
  chargeType: string;
  mobileSegment: string;
  status: string;
}

export interface IValidateInputType {
  input: string;
  inputLength: number;
  isPhoneNumber: boolean;
  isPasport: boolean;
  isForeign: boolean;
  isIdCard: boolean;
  checkInvalidThaiID: boolean;
  containsThaiAndSpecialCharacters: boolean;
}
export interface IGetBlackListLimit {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  data: any;
}

export interface ICustomerDataReadCard {
  idCardNo: string;
  imageReadSmartCard: string;
  idCardType: string;
  titleName: string;
  firstName: string;
  lastName: string;
  firstNameEn: string;
  lastNameEn: string;
  birthdate: string;
  gender: string;
  address: {
    homeNo: string;
    moo: string;
    street: string;
    soi: string;
    tumbol: string;
    amphur: string;
    province: string;
  };
  issueDate: string;
  expireDate: string;
  isMobileAis?: boolean;
}
