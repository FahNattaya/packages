export interface ICheckPrivilegeResponse {
  message: string | null;
  transactionID: string;
  httpStatus: number;
  status: string;
  description: string;
  msg: null | string;
  regId: string;
  msgBarcode: string;
  barcodeType: string;
  ssid: string;
  extUrl: string;
}

export interface ICheckPrivilegeRequest {
  transactionID: string;
  username?: string;
  password?: string;
  ipAddress?: string;
  msisdn: string;
  shortcode: string;
}

export interface IDeviceTransactionReq {
  transactionID: string;
  username?: string;
  password?: string;
  ipAddress?: string;
  msisdn: string;
  shortcode: string;
  numDays?: number;
  prefix?: string;
}
export interface IPrivilegeResponse {
  transactionID: string;
  httpStatus: number;
  status: string;
  description: string;
  msg: string;
  regId?: string;
  msgBarcode?: string;
  barcodeType?: string;
  ssid?: string;
}

export interface IDeviceTransactionResp {
  transactionID: string;
  httpStatus: number;
  status: string;
  description: string;
  msisdn?: string;
  privilegeCount?: number;
  privilegeArr?: IPrivilegeArr;
}

export interface IPrivilegeArr {
  submitTime: string;
  msgBarcode: string;
  usedDate: string;
  ssid: string;
  ussdNo: string;
  msg: string;
  extUrl?: string;
}

export interface IError {
  resultCode: string;
  resultDescription: string;
  developerMessage: string;
  Error: string;
}
export interface ICustomerPrivilege {
  ussdCode?: string;
  isCheckPrivilegePass?: boolean;
  msgBarcode?: string;
  errorMsg?: string;
  errorDetail?: string;
}
