export interface CustomerProfile {
	accessToken: string;
	title: string;
	name: string;
	mobileNo: string;
	mobileSegment: string;
	mobileStatus: string;
	chargeType: string;
	customerType: string;
	preferredLanguage: string;
	birthDate: string;
}

export interface IVerifyOTP {
	msisdn: string;
	pwd: string;
	transactionID: string;
}

export interface ICustomerProfile {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	data: ResultData;
}

export interface ICustomerData {
	accountState: string;
	customer: ICustomer;
}

export interface ICustomer {
	title: string;
	customerName: string;
	idCardNo: string;
	idCardType: string;
	address: IAddress[];
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

export interface ICheckDeviceTransaction {
	msisdn: string;
	shortCode: string;
	numDays: number;
}

export interface IRequest {
	id: string;
	ip: string;
	apiRequestId: string;
	clientBrowser?: string;
}

export interface ICheckPrivilege {
	transactionID: string;
	username: string;
	password: string;
	ipAddress: string;
	msisdn: string;
	shortCode: string;
}

export interface IMobileResult {
	mobileNo: string;
	chargeType: string;
	status: string;
}

export interface IMoblileDetail {
	mobileNo: string;
	privilegeCode?: string;
	mobileStatus: string;
	privilegeMessage?: string;
}

export interface IEligibleMoblie {
	postpaid?: Array<IMoblileDetail>;
	prepaid?: Array<IMoblileDetail>;
}

export interface IGetCustProfile {
	identityCard: string;
	channel: string;
	username: string;
}

export interface IResponseCusInfo {
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
export interface ICheckDeviceTransaction {
	msisdn: string;
	shortCode: string;
	numDays: number;
}

export interface IRequest {
	id: string;
	ip: string;
	apiRequestId: string;
	clientBrowser?: string;
}

export interface ICheckPrivilege {
	transactionID: string;
	username: string;
	password: string;
	ipAddress: string;
	msisdn: string;
	shortCode: string;
}

// export interface IMobileResult {
// 	mobileNo: string;
// 	chargeType: string;
// 	status: string;
// }

export interface IMoblileDetail {
	mobileNo: string;
	privilegeCode?: string;
	mobileStatus: string;
	privilegeMessage?: string;
}

export interface IEligibleMoblie {
	postpaid?: Array<IMoblileDetail>;
	prepaid?: Array<IMoblileDetail>;
}

export interface IGetCustProfile {
	identityCard: string;
	channel: string;
	username: string;
}

export interface IMobileResult {
	mobileNo: string;
	chargeType: string;
	mobileSegment?: string;
	specialSim?: string;
	status: string;
}
