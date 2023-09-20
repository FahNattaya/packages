export interface ITransactionDataResponse {
	transactionId: string;
	data: object;
	create_by: string;
	create_date: string;
	last_update_by: string;
	last_update_date: string;
}

export interface ITransactionDataObject {
	TRANSACTION_ID: string;
	DATA: object;
	CREATE_BY: string;
	CREATE_DATE: string;
	LAST_UPDATE_BY: string;
	LAST_UPDATE_DATE: string;
}
