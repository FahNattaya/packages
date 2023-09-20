import { IListLocation, ILocationName, ILocations, ILocationsMc } from '../../interfaces/location.interface';
import {
	CompanyModel,
	LocationMcModel,
	LocationModel,
	ProvincesModel,
	ZipCodesModel,
} from '../../models/location.model';
import WhiteListLocationModel from '../../models/whitelistlocation.model';

export class LocationService {
	static async findListLocationByLocationCode(
		filterType: string,
		locationCode: string,
		locationType: string,
	): Promise<IListLocation[]> {
		try {
			const listLocation: IListLocation[] = [];
			const myLocation = (await LocationModel.findOne({ LOCATION_CODE: locationCode }, { _id: 0 })) as ILocations;

			if (!myLocation?.PROVINCE || !myLocation?.AMPHUR_TH || !myLocation?.TUMBOL_TH) {
				return listLocation;
			}

			const dataLocation = await LocationModel.find({
				[filterType]: myLocation[filterType as keyof ILocations],
				CHN_TYPE: locationType,
			});
			dataLocation?.forEach((location) => {
				const locations = {
					locationName: location.LOCATION_NAME,
					locationCode: location.LOCATION_CODE,
					locationType: location.CHN_TYPE,
					status: location.AIS_STATUS,
				};
				if (location.LOCATION_CODE != locationCode) {
					listLocation.push(locations);
				}
			});
			return listLocation;
		} catch (error) {
			throw error;
		}
	}

	static async getLocationName(locationCode: string): Promise<ILocationName> {
		const location = LocationMcModel;
		try {
			const myLocation = (await location.findOne({ LOV_NAME: locationCode })) as ILocationsMc;
			return { locationName: myLocation.DISPLAY_VAL };
		} catch (error) {
			throw error;
		}
	}

	static async getCompanyName(companyABBR: string): Promise<any> {
		const company = CompanyModel;
		try {
			const companyName = await company.findOne({ COMPANY_ABBR: companyABBR }, { _id: 0 });
			return companyName;
		} catch (error) {
			throw error;
		}
	}

	static async checkQueueLocation(locationCode: string): Promise<any> {
		const whiteListLocation = WhiteListLocationModel;
		const query: object = {
			locationCode: locationCode,
		};
		const option: object = {
			_id: 0,
			__v: 0,
		};
		try {
			const response: any = (await whiteListLocation.find(query, option)).filter(
				(data: any) => data.type === 'MANUAL' || data.type === 'autoGenQueue',
			);
			return { queueType: response.length > 0 && response[0].type ? response[0].type : 'MANUAL' };
		} catch (error) {
			throw error;
		}
	}

	static async getZipCode(zipCode?: string) {
		try {
			const option: object = {
				_id: 0,
				__v: 0,
			};
			const zipCodes = await ZipCodesModel.find(
				{
					ZIPCODE: zipCode ? zipCode : { $exists: true },
					ZIPCODE_ENG_FLAG: 'N',
				},
				option,
			).sort({ CITY: 1 });
			const provinces = await ProvincesModel.find(
				{
					PROVINCE_ID: zipCode ? zipCodes[0].PROVINCE_ID : { $exists: true },
					PROVINCE_SUP_TYPE: 'THA',
					PROVINCE_USE_FLAG: 'Y',
				},
				option,
			).sort({ PROVINCE_NAME: 1 });
			return { zipCodes, provinces };
		} catch (error) {
			throw error;
		}
	}

	static async getZipCodeByTumbol(tumbol?: string, city?: string) {
		try {
			const option: object = {
				_id: 0,
				__v: 0,
			};
			const country = await ZipCodesModel.findOne({ TUMBOL: tumbol, CITY: city }, option);

			return country;
		} catch (error) {
			throw error;
		}
	}
}
