export interface ICampaignRequest {
	locationCode: number;
	company: string;
	saleChannels: string[];
	brand: string;
	model: string;
	color: string;
	productType: string;
	productSubtype: string;
	customerGroup: string;
	regularPrice?: number;
	offset: number;
	max: number;
}

export interface ICampaignPaymentReq {
	locationCode: number;
	company: string;
	saleChannels: string[];
	brand: string;
	model: string;
	color: string;
	productType: string;
	productSubtype: string;
	customerGroup: string;
	regularPrice?: number;
	offset: number;
	max: number;
	flow: string;
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
	maximumContract: number;
	customerGroup: string;
	conditionCode: string;
	payment?: IPayment;
}

export interface IGetTradePromotion {
	locationCode: number;
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
	data: ITradeResponseData[];
}

export interface ITradeResponseData {
	prices: ITradePricesResponseData[];
	trades: ITradeTradesResponseData[];
}

export interface ITradePricesResponseData {
	priceGroup: string;
	includeVat: number;
	excludeVat: number;
	vatRate?: string;
	vatAmount: number;
	startDate: string;
	endDate?: string;
}
export interface ITradeTradesResponseData {
	tradeProductId: number;
	tradeNo: string;
	tradeName: string;
	packageKeyRef?: string;
	packageOnTopKeyRef?: string;
	minnimumPackagePrice?: number;
	maximumPackagePrice?: number;
	simLock?: string;
	serviceLockHs?: string;
	requireCheckQuota?: string;
	requireChangePromotion?: boolean;
	minimumPriceLength?: number;
	maximumPriceLength?: number;
	maxReceiveFreeGoods?: number;
	contractId?: number;
	durationContract?: string;
	limitContract?: number;
	discount?: ITradeDiscountResponseData;
	payAdvance?: ITradePayAdvanceResponseData;
	freegoods?: ITradeFreeGoodsResponseData[];
	privileges?: ITradePrivilegesResponseData[];
	criterias: ITradeCriteriasResponseData[];
}
export interface ITradeDiscountResponseData {
	tradeDiscountId: number;
	tradePriceExcludeVat?: number;
	tradePriceIncludeVat?: number;
	discountExcludeVat?: number;
	discountExcludeBy?: string;
	specialDiscountIncludeVat?: number;
	specialDiscountBy?: number;
	vatRate?: string;
	tradePrivilegeId?: number;
	installmentPartnerFlag?: string;
	startDate: string;
	endDate?: string;
}
export interface ITradePayAdvanceResponseData {
	payAdvanceGroupId: number;
	priceIncludeVat?: number;
	installmentFlag?: string;
	matAirtime?: string;
	description?: string;
}

export interface ITradeFreeGoodsResponseData {
	matCode: string;
	name?: string;
	qty: number;
}

export interface ITradePrivilegesResponseData {
	tradePrivilegeId: number;
	privilegeId: string;
	ussdCode: string;
	cashBackFlag: string;
}

export interface ITradeCriteriasResponseData {
	chargeType?: Array<string>;
	criteria?: Array<string>;
	instanceName?: Array<string>;
	target?: Array<string>;
}

export interface IParameters {
	name: string;
	value: string;
}

export interface IGetAllPromotionsByShelf {
	userId?: string;
	sanitizedName: string;
	parameters: IParameters[];
}

export interface IOrderFee {
	productCode: string;
	productName: string;
	priceExclVat: number;
	priceInclVat: number;
}
export interface IAccountFee {
	productCode: string;
	productName: string;
	priceExclVat: number;
	priceInclVat: number;
}

export interface IShalvesPrameters {
	orderType: string;
	productClass: string;
	billingSystem: string;
}

export interface IGetPromotionShelves {
	userId?: string;
	language: string;
}

export interface ICarePlusBody {
	handsetPrice: string;
	language: string;
	productType: string;
	productSubType: string;
	productName: string;
	brand: string;
	model: string;
	matCode?: string;
	activeDate?: string;
}

export interface IProductSellingRequest {
	projectGroup?: string;
	productType: string;
	productSubType: string;
	brand: string;
	model: string;
	matCode?: string;
	activeDate?: string;
}

export interface IProductCrossSelling {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	listMainProduct: IListMainProduct[];
}

export interface IListMainProduct {
	upsaleMstId: string;
	projectGroup: string;
	productType: string;
	productSubType: string;
	brand: string;
	model: string;
	category: string;
	listCrossProduct: IListCrossProduct[];
}

export interface IListCrossProduct {
	upsaleDtlId: string;
	upsaleMstId: string;
	itemNo: string;
	crossProductType: string;
	crossProductSubType: string;
	crossMatCode: string;
	startDt: string;
	endDate?: string;
	swapPrice: string;
	replacePrice: string;
	cost: string;
	lastUpdBy: string;
	priceIncVat: string;
	priceExcVat: string;
	vatAmt: string;
}

export interface IKeyShelves {
	id: string;
	title: string;
	titleEn: string;
	icon: string;
	sanitizedName: string;
	publish: string;
	priority: string;
	lastUpdated: string;
	tags: string;
	type: string;
	conditionCode: string;
	subShelves: [];
	items: [];
}

export interface IGetPromotionShelvesResponse {
	statusCode: string;
	statusDesc: string;
	data: IKeyShelves[];
}

export interface IG {
	statusCode: string;
	statusDesc: string;
	data: IKeyShelves[];
}

export interface IGetCondition {
	conditionCode: string;
	location: string;
}

export interface ICarePlus {
	productType: string;
	service: string;
	protection: ICareProtection[];
	condition: ICareCondition[];
	serviceFee: string;
	serviceType?: ICareServiceType;
	crossMatCode?: string;
	orderFees?: IOrderFees;
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

export interface ICareProtection {
	name: string;
	isProtect: boolean;
}
export interface ICareCondition {
	detail: string;
	price: string;
}
export interface ICareServiceType {
	title: string;
	option: IOptionServiceType[];
}

export interface IOptionServiceType {
	name: string;
	price: string;
	promotionCode: string;
}
export interface IGetPaymentsByCampaign {
	campaignId: number;
	locationCode: string;
	saleChannels: string[];
}

export interface IPaymentByCampaignResponse {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	data: IPayment;
}

export interface IPayment {
	method: string;
	cardType: string;
	banks: IBanks[];
}

export interface IBanks {
	bankAbbr: string;
	bankDescTh: string;
	bankDescEn: string;
	imageUrl: string;
	installments: IInstallments[];
}

export interface IInstallments {
	installmentId: string;
	installmentRate: string;
	installmentTerms: string;
	balloonMonth: string;
}
