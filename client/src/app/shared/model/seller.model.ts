export interface ISellerAll {
  ascCode: string;
  authentication: string;
  channelType: string;
  email: string;
  exp: number;
  firstname: string;
  flagUserType: string;
  iat: number;
  lastname: string;
  locationCode: string;
  locationOnline: string;
  mobileNo: string;
  ou: string;
  outChnSales: string;
  outChnSalesCode: string;
  outPosition: string;
  pinCode: string;
  role: string;
  roleAcim: string;
  sharedUser: string;
  sub: string;
  timestamp: string;
  userType: string;
  username: string;
}

export interface ISeller {
  locationCode: string;
  locationName?: string;
  outChnSales: string;
  outChnSalesCode: string;
  userType: string;
  channelType: string;
  username: string;
  mobileNo: string;
}
