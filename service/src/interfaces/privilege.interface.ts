export interface IPrivilege {
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
	msisdn?: string;
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
