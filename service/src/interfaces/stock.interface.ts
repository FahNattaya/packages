export interface IProductMaster {
	brand: string;
	products: IProducts[];
}
export interface IStock {
	stockType: string;
	locationCodeSource: string;
	locationCodeDest: string;
	productType: string;
	productSubType: string;
	subStock: string;
	brand: string;
	model: string;
}

export interface IdtStockResponseData {
	locationCode: string;
	locationName: string;
	company: string;
	subStockCode: string;
	productType: string;
	productSubType: string;
	brand: string;
	model: string;
	color: string;
	stockAval: string;
	productName: string;
}

export interface IProductsByBrandRequest {
	brands: string[];
	offset: string;
	maxRow: string;
	location?: string;
	productType?: string[];
	productSubtype?: string[];
}

export interface IProductsByBrandResponse {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	data: IData[];
}

export interface IData {
	brand: string;
	products: IProducts[];
}

export interface IProductsByBrandResponseCpc {
	statusCode: string;
	statusDesc: string;
	countRow: number;
	totalRow: number;
	products: IProducts[];
}

export interface IProducts {
	productId: number;
	brand: string;
	name: string;
	model: string | null;
	imageUrl: string;
	itemType: string | null;
	flag5G: string;
	dv: any[];
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
	subProducts: ISubProduct[];
}

export interface ISubProduct {
	productId: number;
	name: string;
	model: string;
	imageUrl: string;
	normalPrice: {
		min: string;
		max: string;
	};
	promotionPrice: {
		min: string;
		max: string;
	};
}

export interface IdtStockResponse {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	listData: IdtStockResponseData[];
}

export interface IColorStockResponse {
	color: string;
	stockAval: number;
}

export interface IProductStockResponse {
	productName: string;
	company: string;
	productType: string;
	productSubType: string;
	brand: string;
	model: string;
	totalStockAval: number;
	colorStock: IColorStockResponse[];
}

export interface IStockResponse {
	locationCode: string;
	locationName: string;
	productStock: IProductStockResponse[];
}
