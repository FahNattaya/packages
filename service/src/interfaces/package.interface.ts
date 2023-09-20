export interface IContractFirstPackReq {
	ExecuteService: IExecuteService;
}

export interface IExecuteService {
	sffRequest: ISffRequest;
}

export interface ISffRequest {
	Event: string;
	ParameterList: IParameterList;
}

export interface IParameterList {
	Parameter: IParameter[];
}

export interface IParameter {
	Name: string;
	Value: string;
}

export interface IConditiontFirstPack {
	firstPackage: any;
	minPrice: any;
	initialPackage: any;
	inPackage: Array<any>;
}

export interface IMobileParameter {
	Name: string;
	Value: string;
}

export interface IMinimumPackageRequest {
	sanitizedName: string;
	minimumPackagePrice: number;
	billingSystem: string;
	location: string;
	orderType: string;
	productClass: string;
	province?: string;
	disctrict?: string;
	subDistrict?: string;
	contractPack: IConditiontFirstPack;
}
