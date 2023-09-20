export interface IResponseCheckData {
	statusCode: string;
	statusDesc: string;
	data: [];
}

export interface IProtection {
	name: string;
	isProtect: string;
}

export interface ICondition {
	detail: string;
	price: string;
}
export interface IOption {
	name: string;
	price: string;
}
export interface IServiceType {
	title: string;
	option: IOption;
}
export interface IResponseAisCare {
	productType: string;
	service: string;
	imageUrl: string;
	protection: IProtection[];
	condition: ICondition[];
	serviceFee: string;
	serviceType: IServiceType;
}
