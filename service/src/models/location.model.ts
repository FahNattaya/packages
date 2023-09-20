import mongoose from 'mongoose';
import { IAddress, ILocations } from './../interfaces/location.interface';

const LocationSchema = new mongoose.Schema(
	{
		LOCATION_CODE: String,
		LOCATION_NAME: String,
		REGION: String,
		PROVINCE: String,
		AMPHUR_TH: String,
		TUMBOL_TH: String,
		AIS_STATUS: String,
		CREATED_DTM: String,
		CREATED_BY: String,
		LAST_UPD_DTM: String,
		LAST_UPD_BY: String,
		CHN_SALES_NAME: String,
		CHN_TYPE: String,
	},
	{ versionKey: false },
);

const LocationMcSchema = new mongoose.Schema({
	ROW_ID: String,
	PAR_ROW_ID: String,
	LOV_TYPE: String,
	LOV_NAME: String,
	DISPLAY_VAL: String,
	LOV_VAL1: String,
	LOV_VAL2: String,
	LOV_VAL3: String,
	LOV_VAL4: String,
	LOV_VAL5: String,
	ACTIVE_FLG: String,
	TEXT_DESC: String,
	ORDER_BY: String,
	MODIFICATION_NUM: Number,
	CREATED: Number,
	CREATED_BY: String,
	LAST_UPD: Number,
	LAST_UPD_BY: String,
	GROUP_TYPE: String,
	LOV_VAL6: String,
	LOV_VAL7: String,
	LOV_VAL8: String,
	LOV_VAL9: String,
	LOV_VAL10: String,
	ROWID: String,
	LOCATION_TYPE: String,
	LOCATION_CHANNEL_SALE: String,
	REGION_CODE: String,
	CREATED_CCSM: String,
	LAST_UPD_CCSM: String,
	DAT_FILE_NAME: String,
	TIMESTAMP: String,
	__v: { type: Number, select: false },
}).index({
	LOV_NAME: 'text',
	DISPLAY_VAL: 'text',
	LOV_VAL1: 'text',
	LOV_VAL2: 'text',
});

const CompanySchema = new mongoose.Schema(
	{
		COMPANY_ABBR: String,
		LOCATION_NAME: String,
		NAME_TH: String,
		NAME_EN: String,
	},
	{ versionKey: false },
).index({ COMPANY_ABBR: 1 });

const AddressSchema = new mongoose.Schema(
	{
		TUMBOL: String,
		AMPHUR: String,
		PROVINCE: String,
		ZIPCODE: String,
	},
	{ versionKey: false },
);

const zipCodesSchema = new mongoose.Schema({
	ZIPCODE: String,
	ZIPCODE_ENG_FLAG: String,
	CITY: String,
	PROVINCE_ID: String,
	TUMBOL: String,
	COUNTRY: String,
	USE_FLAG: String,
	BUSINESS_TYPE: String,
}).index({
	ZIPCODE: 'text',
	ZIPCODE_ENG_FLAG: 'text',
});

const provincesSchema = new mongoose.Schema(
	{
		ROW_ID: String,
		PROVINCE_ROWID: String,
		PROVINCE_ID: String,
		PROVINCE_NAME: String,
		PROVINCE_SUP_TYPE: String,
		PROVINCE_USE_FLAG: String,
		BUSINESS_TYPE: String,
		REGION: String,
		FBB_REGION: String,
	},
	{ collection: 'provinces' },
).index({
	PROVINCE_ID: 'text',
	PROVINCE_USE_FLAG: 'text',
});

const LocationModel = mongoose.model<ILocations & mongoose.Document>('new-device-sales-locations', LocationSchema);
const CompanyModel = mongoose.model<ILocations & mongoose.Document>('companies', CompanySchema);
const AddressModel = mongoose.model<IAddress & mongoose.Document>('addresses', AddressSchema);
const LocationMcModel = mongoose.model('locations', LocationMcSchema);

const ZipCodesModel = mongoose.model('zipcodes', zipCodesSchema);
const ProvincesModel = mongoose.model('provinces', provincesSchema);

export { CompanyModel, LocationModel, AddressModel, ZipCodesModel, ProvincesModel, LocationMcModel };
