export interface IPaymentRequest {
	tradeProductId: number;
	tradeNo: string;
	locationCode: string;
}

export interface IPaymentResponse {
	statusCode: string;
	statusDesc: string;
	payments: IPaymentMethod[];
}

export interface IPaymentMethod {
	method: string;
	cardType: string;
	banks: IPaymentBank[];
	banksFullPaid?: IPaymentBank[];
	banksInstallment?: IPaymentBank[];
	methodName?: string;
	methodNameTh?: string;
}

export interface IPaymentBank {
	bankAbbr: string;
	bankDescTh: string;
	bankDescEn: string;
	imageUrl: string;
	installments?: IPaymentInstallment[];
}

export interface IPaymentInstallment {
	installmentId: string;
	installmentRate: string;
	installmentTerms: string;
	balloonMonth?: number | null;
	minimumAmount?: number;
	cardDigits?: number;
}

export interface IBankRequest {
	location: string;
}

export interface IGetBankResponse {
	statusCode: string;
	statusDesc: string;
	banks: IBank[];
}

export interface IBank {
	name: string;
	abb: string;
	imageUrl: string;
}

export interface IBackForPartner {
	brand: string;
	model: string;
	color: string;
	netprice: string;
	installment: boolean;
	isdevileonly: string;
	tradeProductId?: string;
	tradeNo?: string;
	locationCode?: string;
	outChnSalesCode?: string;
}

export interface IBuildPaymentResult {
	method: string;
	cardType: string;
	banks: IPaymentBank[];
	banksFullPaid: IPaymentBank[];
	banksInstallment: IPaymentBank[];
	methodName: string;
	methodNameTh: string;
}

export interface IPinCodeByUser {
	OM_WS_GetEmpDetailOnFlagByUser : {
		OmCode: string;
		Username: string;
		TempFlag: string;
	}
}
