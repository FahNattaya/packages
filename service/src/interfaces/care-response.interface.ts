export interface IGetAllPromotionsByShelfResponse {
	statusCode: string;
	statusDesc: string;
	data: IDataPromotionsByShelfResponse[];
}

export interface IDataPromotionsByShelfResponse {
	id: string;
	title: string;
	detailTH: string;
	detailEN: string;
	thumbnail: string;
	feedItemId: string;
	promotionCode: string;
	offeringCode?: string;
	offeringId: string;
	packageId: string;
	featureCode: string;
	publish: string;
	priority: string;
	lastUpdated: string;
	prototype: string;
	customAttributes: ICustomAttributes;
	accountFees: any[];
	orderFees: IOrderFees[];
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
export interface ISkyAuthenticationResponse {
	token: string;
}

export interface ICustomAttributes {
	isChangeOwner?: string;
	isNewRegistration: string;
	isChangeChargeType: string;
	isPortIn: string;
	isChangePromotion: string;
	isChangeService: string;
	billingSystem: string;
	networkType: string;
	promotionCode: string;
	promotionName: string;
	shortNameEng: string;
	shortNameThai: string;
	promotionFee: string;
	priceExclVat: string;
	productClass: string;
	productGroup: string;
	productPkg: string;
	descriptionThai: string;
	descriptionEng: string;
	inStatementThai: string;
	inStatementEng: string;
	numberOfMobile: string;
	gprsType: string;
	effectiveStartDt: string;
	effectiveEndDt: string;
	statusCd: string;
	duration: string;
	durationType: string;
	priceInclVat: string;
	remark?: string;
	durationUnit?: string;
	changePromotionFreeForFirstTimeFlag?: string;
	changePromotionFeeFlag?: string;
	changePromotionFreeDaysForFreeFirstTime?: string;
	sharePlan?: string;
	promotionLevel?: string;
	productSubGroup?: string;
	resource?: string;
	prorate?: string;
	referenceId?: string;
	accessNum?: string;
	mdmMassPoDetailRowId?: string;
	rootNetworkType?: string;
	downstreamSystem?: string;
	feedItemId?: string;
	productCd?: string;
	productCode?: string;
	priceType: string;
	imeiFlg: string;
	chargeType: string;
	productType: string;
	classAttributeName: string;
	classAttributeDisplayName: string;
	prorateFlg: string;
	startDevicePrice?: string;
	endDevicePrice?: string;
	packageType?: string;
	offerType?: string;
	orderType: string;
	bvPoint: string;
	bvDescription: string;
	externalMsg: string;
	bosProdId: string;
	priceExcVat: string;
	priceIncVat: string;
	irCountry: string;
	isRenew: string;
	parameters: Parameter[];
}

export interface Parameter {
	Parameter: Parameter2[];
}

export interface Parameter2 {
	Name: string;
	Value?: string;
}

export interface IfilterAisPromotion {
	handsetPrice: string;
	iGetAllPromotionsByShelfResponse: IGetAllPromotionsByShelfResponse;
}
