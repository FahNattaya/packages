export interface ICardInfo {
	prefixCard: string;
	cardCategory: string;
}

export interface ICardInfoResponse {
	resultCode: string;
	resultDescription: string;
	prefixCard: string;
	paymentMethod: string;
	cardCategory: string;
	bankAbbr: string;
	bankCode: string;
	bankNameTh: string;
	bankNameEn: string;
	cardType: string;
}
