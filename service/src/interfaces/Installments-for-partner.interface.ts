export interface IInstallmentsForPartner {
	brand: string;
	model: string;
	color: string;
}

interface BankDetail {
	id: number;
	bankAbbr: string;
	bankDescitionEn: string;
	bankDescitionTh: string;
	image?: string;
	installmentTerm: string;
	minimumAmount: number;
	cardDigits: string;
}

interface BankGroup {
	bankGroupName: string;
	handsetOnlyFlag: string;
	bankFlag: string;
	campaignOnlyFlag: string;
	bank: BankDetail[];
}

export interface ICheckInstallmentsForPartner {
	installmentflag: string;
	brand: string;
	model: string;
	color: string;
	type: string;
}

export interface IInstallmentsResponse {
	statusCode: string;
	statusDesc: string;
	data: BankGroup[];
}

export interface IInstallmentsForPartnerResponse {
	statusCode: string;
	statusDesc: string;
	data: BankGroup[];
}
