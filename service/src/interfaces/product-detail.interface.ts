export interface IProductDetailRequest {
	location: string;
	brand: string;
	model: string;
	color: string;
	productType: string;
	productSubtype: string;
}

export interface IProductResponse {
	resultCode: string;
	resultDescription: string;
	developerMessage: string;
	data: {
		statusCode: string;
		statusDesc: string;
		name: string;
		brand: string;
		model: string;
		productType: string;
		productSubtype: string;
		dv: any[];
		products: IProduct[];
	};
}

interface IProduct {
	colorName: string;
	colorCode: string;
	sku: string[];
	images: {
		thumbnail: string;
		baseView: IImage[];
	};
}

interface IImage {
	imageUrl: string;
}
