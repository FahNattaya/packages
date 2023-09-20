export interface ITradeCPC {
	statusCode: string;
	statusDesc: string;
	data: ITradeCPCData;
}

export interface ITradePrice {
	includeVat: number;
	excludeVat: number;
	vatRate: string;
	priceGroup: string;
	startDate: string;
	endDate: string;
}

export interface ITradeDiscount {
	tradeDiscountId: number;
	tradePriceExcludeVat: any;
	tradePriceIncludeVat: any;
	discountExcludeVat: number;
	discountExcludeBy: string;
	specialDiscountIncludeVat: any;
	specialDiscountBy: any;
	vatRate: any;
	tradePrivilegeId: number;
	installmentPartnerFlag: string;
	startDate: string;
	endDate: string;
}

export interface ITradePayAdvance {
	payAdvanceGroupId: number;
	priceIncludeVat: number;
	installmentFlag: string;
	matAirtime: string;
	description: string;
}

export interface ITradeFreeGood {
	matCode: string;
	name: string;
	qty: number;
}

export interface ITradePrivilege {
	tradePrivilegeId: number;
	privilegeId: string;
	ussdCode: string;
}

export interface ITradeCriteria {
	target?: string[];
	chargeType?: string[];
}

export interface ITradeTrade {
	tradeProductId: number;
	tradeNo: string;
	tradeName: string;
	packageKeyRef: string;
	packageOnTopKeyRef: string;
	minnimumPackagePrice: number;
	maximumPackagePrice: number;
	simLock: string;
	serviceLockHs: string;
	requireCheckQuota: string;
	requireChangePromotion: boolean;
	minimumPriceLength: number;
	maximumPriceLength: number;
	maxReceiveFreeGoods: number;
	contractId: number;
	durationContract: number;
	limitContract: number;

	discount: ITradeDiscount;
	payAdvance: ITradePayAdvance;
	freegoods: ITradeFreeGood[];
	privileges: ITradePrivilege[];
	criterias: ITradeCriteria[];
}

export interface ITradeCPCData {
	prices: ITradePrice[];
	trades: ITradeTrade[];
}
