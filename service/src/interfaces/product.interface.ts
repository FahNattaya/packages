interface SubProduct {
	name: string;
	model: string;
	imageUrl: string;
	normalPrice: {
		min: number;
		max: number;
	};
	promotionPrice: {
		min: number;
		max: number;
	};
}

export interface Products {
	brand: string;
	name: string;
	model: string;
	imageUrl: string;
	itemType: string;
	flag5G: string;
	dv: [];
	productType: string;
	productSubtype: string;
	normalPrice: {
		min: string;
		max: string;
	};
	promotionPrice: {
		min: string;
		max: string;
	};
	subProducts: SubProduct[];
}

interface ImageUrl {
	imageUrl: string;
}
interface ImageProductColer {
	thumbnail: string;
	baseView: ImageUrl[];
}
interface SpecProduct {
	colorName: string;
	colorCode: string;
	sku: [];
	images: ImageProductColer;
}
export interface ProductDetail {
	name: string;
	brand: string;
	model: string;
	productType: string;
	productSubtype: string;
	dv: [];
	price: string;
	products: SpecProduct[];
}

export interface IShareTransReq {
	soId: string;
	locationSource: string;
	locationReceipt: string;
	grandTotalAmt: string;
	userId: string;
	saleCode: string;
	queueNo: string;
	cusNameOrder: string;
	taxCardId: string;
	cusMobileNoOrder: string;
	soOrderTransNo: string;
	customerAddress: IAddress;
	paymentRemark: string;
	paymentMethod: string;
	bankCode: string;
	installmentTerm: string;
	installmentRate: string;
	focCode: string;
	mobileAisFlg: string;
	bankAbbr: string;
	reqMinimumBalance: string;
	preBookingNo: string;
	depositAmt: string;
	qrTransId: string;
	qrAmt: string;
	qrAirtimeTransId: string;
	qrAirtimeAmt: string;
	convertToNetwotkType: string;
	soChannelType: string;
	soDocumentType: string;
	shipCusName: string;
	shipCusAddr: string;
	shipCustAddr2: string;
	storeName: string;
	shipLocation: string;
	shipMobileNo: string;
	productList: IProductList[];
	remarkReceipt: string;
}

interface IProductList {
	soCompany: string;
	productType: string;
	productSubType: string;
	brand: string;
	model: string;
	color: string;
	matCode: string;
	priceIncAmt: string;
	priceDiscountAmt: string;
	tradeNo: string;
	ussdCode: string;
	returnCode: string;
	cashBackFlg: string;
	matAirTime: string;
	tradeAirtimeId: string;
	tradeDiscountId: string;
	qty: string;
	listMatFreeGoods: IFreeGood[];
}

interface IFreeGood {
	matCodeFG: string;
	qtyFG: string;
	tradeFreeGoodsId: string;
}

interface IAddress {
	addrNo: string;
	moo: string;
	mooban: string;
	buildingName: string;
	floor: string;
	room: string;
	soi: string;
	streetName: string;
	tumbon: string;
	amphur: string;
	province: string;
	zipCode: string;
	country: string;
}

export interface IShareTransRes {
	resultCode: string;
	resultMessage: string;
	soId?: string;
	reserveNo?: string;
	queueNo?: string;
}

export interface IImeiDtReq {
	locationCode: string;
	imei: string;
	checkType?: string;
	orderNo?: string;
}

export interface IImeiDtRes {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	data: IDataImei;
}

export interface IDataImei {
	status: string;
	message: string;
	brand: string;
	model: string;
	color?: string;
	company: string;
	matcode: string;
	invNo: string;
	invDt: string;
	invDealerCode?: string;
	invItemCat: string;
	comercialName: string;
	productType?: string;
	productSubtype?: string;
	receiptNum?: string;
	receiptDt?: string;
	warrantyDay?: string;
	price: string;
	cdmFlag?: string;
	priceExc?: string;
	priceVatAmt?: string;
	sffOrderPayAdvReceiptNum?: string;
	sffOrderPayAdvReceiptAmt?: string;
	sffOrderMobileNo?: string;
	sffOrderUssdCode?: string;
	sffOrderReturnCode?: string;
	MatcodeForQueryTrade?: string;
	prebookingFlg?: string;
	partnerChannel?: string;
}

export interface getProductsByMaterialCodeReq {
	products: IProductsMat[];
	priceTypes?: string[];
	effectiveStartDate?: string;
	effectiveEndDate?: string;
}
export interface IProductsMat {
	company: string;
	materialCode: string;
}

export interface imeiDtReq {
	locationCode: string;
	imei: string;
}

export interface imeiCartRes {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	data: ICartRes;
}
export interface ICartRes {
	status: string;
	brand: string;
	model: string;
	color: string;
	company: string;
	matcode: string;
	price?: number;
	statusIMEI: string;
	productSubtype: string;
	productType: string;
}
