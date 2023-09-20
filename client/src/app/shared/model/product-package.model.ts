export interface IPackageRequest {
  sanitizedName: string;
  minimumPackagePrice: number;
  billingSystem: string;
  location: string;
  orderType: string;
  productClass: string;
  province: '';
  disctrict: '';
  subDistrict: '';
  contractPack: {
    firstPackage: number;
    minPrice: number;
    initialPackage: number;
    inPackage: string[];
  };
}

export interface IPackageResponse {
  statusCode: string;
  statusDesc: string;
  data: IDataPackage[];
}

export interface IDataPackage {
  orderNo: string;
  priority: string;
  title: string;
  detailTH: string;
  promotionCode: string;
  offeringCode?: string;
}

export interface ICurrentPackage {
  name: string;
  description: string;
  endDate: string;
  price: string;
}

export interface IContractFirstPack {
  firstPackage: number;
  minPrice: number;
  initialPackage: number;
  inPackage: string[];
}

export interface IMinimumPackages {
  orderNo: string;
  title: string;
  detailTH: string;
}

export interface IDataPackageSelected {
  title: string;
  detailTH: string;
  promotionCode: string;
  currentPackage: boolean;
  isDisable: boolean;
  offeringCode?: string;
}

export interface IPromotionShelvesReq {
  userId: string;
  language: string;
}
