export interface ILocations {
	LOCATION_CODE: string;
	LOCATION_NAME: string;
	REGION: string;
	PROVINCE: string;
	AMPHUR_TH: string;
	TUMBOL_TH: string;
	AIS_STATUS: string;
	CREATED_DTM: string;
	CREATED_BY: string;
	LAST_UPD_DTM: string;
	LAST_UPD_BY: string;
	CHN_SALES_NAME: string;
	CHN_TYPE: string;
}

export interface ILocationsMc {
	ROW_ID: string,
	PAR_ROW_ID: string,
	LOV_TYPE: string,
	LOV_NAME: string,
	DISPLAY_VAL: string,
	LOV_VAL1: string,
	LOV_VAL2: string,
	LOV_VAL3: string,
	LOV_VAL4: string,
	LOV_VAL5: string,
	ACTIVE_FLG: string,
	TEXT_DESC: string,
	ORDER_BY: string,
	MODIFICATION_NUM: Number,
	CREATED: Number,
	CREATED_BY: string,
	LAST_UPD: Number,
	LAST_UPD_BY: string,
	GROUP_TYPE: string,
	LOV_VAL6: string,
	LOV_VAL7: string,
	LOV_VAL8: string,
	LOV_VAL9: string,
	LOV_VAL10: string,
	ROWID: string,
	LOCATION_TYPE: string,
	LOCATION_CHANNEL_SALE: string,
	REGION_CODE: string,
	CREATED_CCSM: string,
	LAST_UPD_CCSM: string,
	DAT_FILE_NAME: string,
	TIMESTAMP: string,
}
export interface IListLocation {
	locationName: string;
	locationCode: string;
	locationType: string;
	status: string;
}

export interface ILocationName {
	locationName: string;
}

export interface IAddress {
	tumbol: string,
	amphur: string,
	province: string,
	zipcode: string
}

export interface IQueueLocationRes {
	locationCode: string;
	startDate: string;
	type: string;
	shopType: string;
}
