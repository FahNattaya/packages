export interface IQueryPromotionCurrentPack {
	mobileNo: string;
	language: string;
}

export interface ICurrentPackage {
	name: string;
	price: string;
	description: string;
	endDate: string;
}

export interface IMobilePackageCurrentRoot {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	resultData: ResultData;
}

export interface ResultData {
	mobilePackageCurrent: MobilePackageCurrent;
}

export interface MobilePackageCurrent {
	main: Main;
	ontop: Ontop[];
}

export interface Main {
	cbsProductId: string;
	cbsProductSequenceId: string;
	cbsProductName: string;
	cbsNotificationNameEng: string;
	cbsNotificationNameThai: string;
	cbsNotificationNameAseanLang: string;
	cbsProductEffectiveTime: string;
	cbsProductExpireTime: string;
	cbsProductActivationTime: string;
	cbsNextBillDate: string;
	cbsProductStatus: string;
	name: string;
	shortenedNameTH: string;
	shortenedNameEN: string;
	descriptionTH: string;
	descriptionEN: string;
	billItemDescriptionTH: string;
	billItemDescriptionEN: string;
	productCd: string;
	productClass: string;
	attribute: any[];
	maxFnNo: string;
	productOfferPriceId: string;
	packageId: string;
	monthlyFee: string;
	othersFeeRate: string;
	productType: string;
	groupPromo: string;
	productEffectiveTime: string;
	productExpireTime: string;
	nextBillDate: string;
	IntegrationNameTH: string;
	IntegrationNameEN: string;
	priceType: string;
	offeringName: string;
	priceIncludeVat: string;
	productStatus: string;
	productId: string;
	productSequenceId: string;
	productName: string;
	extProductId: string;
	extProductSequenceId: string;
	extProductName: string;
	extNotificationNameEng: string;
	extNotificationNameThai: string;
	extNotificationNameAseanLang: string;
	extProductEffectiveTime: string;
	extProductExpireTime: string;
	extProductActivationTime: string;
	extNextBillDate: string;
	extProductStatus: string;
	bundlingServiceName: string;
	commercialType: string;
	freeUnitItemList: any[];
	productPackage: string;
	offeringGroup: string;
	prorateFlag: string;
	createUser: string;
	createDate: string;
	duration: string;
	durationType: string;
	chargeAmount: string;
	openDate: string;
	gvProductSequenceId: string;
	upLoadSpeed: string;
	downLoadSpeed: string;
	nextPackage: any[];
	priceExcludeVat: string;
	pro5gflg: string;
	productAcctnCat: string;
	deviceContractFlg: string;
	netFlexiFlg: string;
	crmFlag: string;
	paymentMode: string;
}

export interface Ontop {
	cbsProductId: string;
	cbsProductSequenceId: string;
	cbsProductName: string;
	cbsNotificationNameEng: string;
	cbsNotificationNameThai: string;
	cbsNotificationNameAseanLang: string;
	cbsProductEffectiveTime: string;
	cbsProductExpireTime: string;
	cbsProductActivationTime: string;
	cbsNextBillDate: string;
	cbsProductStatus: string;
	name: string;
	shortenedNameTH: string;
	shortenedNameEN: string;
	descriptionTH: string;
	descriptionEN: string;
	billItemDescriptionTH: string;
	billItemDescriptionEN: string;
	featureCode: string;
	productCd: string;
	productClass: string;
	attribute: any[];
	maxFnNo: string;
	productOfferPriceId: string;
	featureStatus: string;
	featureStatusDate: string;
	featureSubCode: string;
	earlyRenewOfferingFlag: string;
	firstUseFlag: string;
	freeUnitItemList: any[];
	groupFeature: string;
	featureName: string;
	moreInfoFlag: string;
	productEffectiveTime: string;
	productExpireTime: string;
	nextBillDate: string;
	priceType: string;
	offeringName: string;
	priceIncludeVat: string;
	productStatus: string;
	freeFeatureName: string;
	IntegrationNameTH: string;
	IntegrationNameEN: string;
	productId: string;
	productSequenceId: string;
	productName: string;
	ivrCancelFlag: string;
	ivrQueryFlag: string;
	extProductId: string;
	extProductSequenceId: string;
	extProductName: string;
	extNotificationNameEng: string;
	extNotificationNameThai: string;
	extNotificationNameAseanLang: string;
	extProductEffectiveTime: string;
	extProductExpireTime: string;
	extProductActivationTime: string;
	extNextBillDate: string;
	extProductStatus: string;
	commercialType: string;
	holdFlag: string;
	productPackage: string;
	offeringGroup: string;
	prorateFlag: string;
	createUser: string;
	createDate: string;
	duration: string;
	durationType: string;
	chargeAmount: string;
	openDate: string;
	gvProductSequenceId: string;
	upLoadSpeed: string;
	downLoadSpeed: string;
	nextPackage: any[];
	priceExcludeVat: string;
	pro5gflg: string;
	productAcctnCat: string;
	deviceContractFlg: string;
	netFlexiFlg: string;
	crmFlag: string;
	paymentMode: string;
}
