export interface IEcontractBody {
	docType: string;
	data: IDataEContract;
}

export interface IDataEContract {
	campaignName: string;
	locationName: string;
	customerType: string;
	idCard: string;
	idCardType: string;
	fullName: string;
	mobileNumber: string;
	brand: string;
	model: string;
	color: string;
	priceIncludeVat: string;
	priceDiscount: string;
	netPrice: string;
	imei: string;
	packageDetail: string;
	contract: number;
	advancePay: string;
	airTimeDiscount: string;
	airTimeMonth: string;
	price: string;
	signature: string;
	mobileCarePackageTitle: string;
	condition: string;
	company: string;
	aisPoint: string;
	discountIncludeVat: string;
	smartPayDetail: string;
}

export interface IEcontractResponse {
	data: string;
}
