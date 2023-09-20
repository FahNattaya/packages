export interface IAddCartList {
	locationSource: string;
	locationReceipt: string;
	userId: string;
	cusNameOrder: string;
	soChannelType: string;
	soDocumentType: string;
	productList: object;
	grandTotalAmt?: string;
	preBookingNo?: string;
	depositAmt?: string;
	reserveNo?: string;
	subStockDestination?: string;
	storeName?: string;
}

export interface ICart {
	TRANSACTION_ID: string;
	DATA: ICartData;
	CREATE_BY: string;
	CREATE_DATE: string;
	LAST_UPDATE_BY: any;
	LAST_UPDATE_DATE: any;
}

export interface ICartData {
	customer: ICustomer;
	sim_card: ISimCard;
	device: IDevice;
	billing_information: IBillingInformation;
	mobile_care_package: IMobileCarePackage;
	device_care_package: IDeviceCarePackage;
	device_care_payment: IDeviceCarePayment;
	main_promotion: IMainPromotion;
	payment: IPaymentCart;
	seller: ISeller;
	queue: IQueue;
	receipt: IReceipt;
	order: IOrder;
	status: IStatus;
	air_time: IAirTime;
	action: string;
	transactionType: string;
}
export interface ICustomer {
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

export interface ISimCard {
	mobileNo: string;
	isAis: boolean;
	memberSimCard: any[];
	billingSystem: string;
	chargeType: string;
}

export interface IDevice {
	amount: number;
	brand: string;
	model: string;
	colorCode: string;
	colorName: string;
	company: string;
	name: string;
	matCode: string;
	price: string;
}

export interface IBillingInformation {
	billCycles: IBillCycle[];
	customer: ICustomer;
}

export interface IBillCycle {
	from: string;
	to: string;
}

export interface IMobileCarePackage {
	accountFees: any[];
	orderFees: any[];
	title: string;
	promotionCode: string;
	customAttributes: ICustomAttributes;
	email: string;
}

export interface IDeviceCarePackage {
	productType: string;
	title: string;
	email: string;
	customAttributes: ICustomAttributes;
	reason: string;
	isBuyDeviceCare: boolean;
	crossMatCode: string;
	costProductPrice: string;
}

export interface ICustomAttributes {
	promotionName: string;
	promotionCode: string;
}
export interface IMainPromotion {
	campaign: ICampaign;
}

export interface ICampaign {
	campaignName: string;
	conditionCode: string;
	company: string;
	color: string;
	priceIncludeVat: string;
	discountIncludeVat: string;
	netPrice: string;
	contract: number;
	advancePay: string;
	trade: ITrade;
	summaryPrice: string;
	privilegeReturnCode: string;
}

export interface ITrade {
	tradeProductId: number;
	tradeNo: string;
	tradeName: string;
	packageKeyRef: string;
	packageOnTopKeyRef: any;
	minnimumPackagePrice: number;
	maximumPackagePrice: any;
	simLock: string;
	serviceLockHs: string;
	requireCheckQuota: string;
	requireChangePromotion: boolean;
	minimumPriceLength: any;
	maximumPriceLength: any;
	maxReceiveFreeGoods: number;
	contractId: number;
	durationContract: number;
	limitContract: number;
	discount: IDiscount;
	payAdvance: IPayAdvance;
	freegoods: any[];
	privileges: IPrivilege[];
	criterias: ICriteria[];
	discountPrice: number;
	orderType: string;
}

export interface IDiscount {
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

export interface IPaymentCart {
	paymentForm: string;
	paymentOnlineCredit: boolean;
	paymentType: string;
	paymentMethod: string;
}
export interface IDeviceCarePayment {
	tranId: string;
	tranDtm: string;
	status: string;
	startDtm: string;
	qrType: string;
	orderId: string;
	offerId: string;
	lastUpdate: string;
	amount: number;
	paymentMethod: string;
	paymentType: string;
	creditCardNo: string;
	cardExpireDate: string;
	bankAbbr: string;
	email: string;
}

export interface ISeller {
	locationCode: string;
	locationName: string;
	sellerName: string;
	ascCode: string;
	employeeId: string;
	soChannel: string;
}

export interface IQueue {
	queueNo: string;
}

export interface IReceipt {
	billCycles: any[];
}

export interface IOrder {
	soId: string;
}

export interface IStatus {
	code: string;
	description: string;
}

export interface IAirTime {
	tradeAirtimeId: any;
	amount: number;
	installmentFlag: string;
	matAirtime: any;
	description: any;
	payAdvanceGroupId: any;
	promotions: any[];
	payment: IPaymentAirTime;
}

export interface IPaymentAirTime {
	code: string;
}

export interface IRequestCreateCompensation {
	requestChannel?: string;
	compensationType?: string;
	soId?: string;
	company?: string;
	saleEntryDt?: string;
	receiptNo?: string;
	receiptDt?: string;
	advancePackReceiptNo?: string;
	saleLocationCode?: string;
	ascCode?: string;
	customerName?: string;
	mobileNo?: string;
	networkType?: string;
	productType?: string;
	productSubtype?: string;
	brand?: string;
	model?: string;
	color?: string;
	materialCode?: string;
	imei?: string;
	tradeNo?: string;
	tradeDiscountId?: string;
	tradeOption?: string;
	ussdCode?: string;
	returnCode?: string;
	focCode?: string;
	eupInc?: string;
	saleAmt?: string;
	discountExc?: string;
	refMobileNo?: string;
	refUssdCode?: string;
	refReturnCode?: string;
	prebookingNo?: string;
	prebookingAmt?: string;
	prebookingReceiptNo?: string;
	cardHolder?: string;
	cardNo?: string;
	monthlyInstallments?: string;
	cardOwner?: string;
	bankAbbr?: string;
	tidTerm?: string;
	traceNumber?: string;
	compensationReasonDesc?: string;
	installmentReasonDesc?: string;
	userId?: string;
	imeiNonAis?: string;
	screenRemark?: string;
    email?: string;
}
