import { createAction, props } from '@ngrx/store';
import {
  IBackListLimitData,
  ICustomerData,
  ICustomerDataReadCard,
  IIdCardAddress,
  IMobileListNumberByIdCardNumber,
  IOtherAddress,
} from '../../shared/model/customer.model';
import { IContactMobile } from 'src/app/shared/model/e-document.model';

export const loadCustomerDataByPhone = createAction(
  '[Customer] Load Customer',
  props<{ mobileNo: string }>()
);
export const loadCustomerDataByIdentityCard = createAction(
  '[Customer] Load Customer Profile',
  props<{ identityCard: string, username: string }>()
);
export const loadMobileNumberByIdCardNumber = createAction(
  '[Customer] Load Mobile By Number',
  props<{ identityCard: string }>()
);

export const saveMoblieNo = createAction(
  '[Customer] save Mobile Number',
  props<{ mobileNo: string }>()
)
export const saveCustomerData = createAction(
  '[Customer] save customer from read card',
  props<{ customerDataReadCard: ICustomerDataReadCard }>()
)

export const loadMobileNumberByIdCardNumberSuccess = createAction(
  '[Customer] Load Mobile By Number Success',
  props<{ listMobileNumber: IMobileListNumberByIdCardNumber }>()
);
export const loadMobileNumberByIdCardNumberFailure = createAction(
  '[Customer] Load Mobile By Number Failure',
  props<{ error: any }>()
);
export const loadDataCustomerSuccess = createAction(
  '[Customer] Load Data Customer Success',
  props<{ dataCustomer: ICustomerData }>()
);
export const loadDataCustomerFailure = createAction(
  '[Customer] Load Data Customer Failure',
  props<{ error: any }>()
);

//black list
export const loadBackListLimitData = createAction(
  '[Customer] Load BackListLimit',
  props<{ IDcard: string }>()
);
export const loadDataBackListLimitSuccess = createAction(
  '[Customer] Load Data BackListLimit Success',
  props<{ data: IBackListLimitData }>()
);
export const loadDataBackListLimitFailure = createAction(
  '[Customer] Load Data BackListLimit Failure',
  props<{ error: any }>()
);

//contract
export const loadContractMobileData = createAction(
  '[Customer] Load ContractMobile',
  props<{ IDcard: string }>()
);
export const loadDataContractMobileSuccess = createAction(
  '[Customer] Load Data ContractMobile Success',
  props<{ data: IContactMobile }>()
);
export const loadDataContractMobileFailure = createAction(
  '[Customer] Load Data ContractMobile Failure',
  props<{ error: any }>()
);
//address
export const saveAddressData = createAction(
  '[Customer] Load OTP',
  props<{ addressData: any }>()
);

export const saveAddressDataSuccess = createAction(
  '[Customer] Load Otp Data Success'
);
export const saveAddressDataFailure = createAction(
  '[Customer] Load Otp Data Failure',
  props<{ error: any }>()
);

export const loadAddressData = createAction(
  '[Customer] Load OTP',
  props<{ mobileNo: string }>()
);

export const loadAddressDataSuccess = createAction(
  '[Customer] Load Otp Data Success',
  props<{ mobileNo: string }>()
);
export const loadAddesrDataFailure = createAction(
  '[Customer] Load Otp Data Failure',
  props<{ error: any }>()
);
export const saveOtherAddress = createAction(
  '[Customer] Save Other Address',
  props<{ otherAddress: any }>()
);
export const saveOtherAddressSuccess = createAction(
  '[Customer] Save Other Address Success',
  props<{ otpData: IOtherAddress }>()
);
export const saveOtherAddressFailure = createAction(
  '[Customer] Save Other Address Failure',
  props<{ error: any }>()
);
export const loadOtherAddress = createAction(
  '[Customer] Load Other Address',
  props<{ mobileNo: string }>()
);
export const loadOtherAddressSuccess = createAction(
  '[Customer] Load Other Address Success',
  props<{ otpData: IOtherAddress }>()
);
export const loadOtherAddressFailure = createAction(
  '[Customer] Load Other Address Failure',
  props<{ error: any }>()
);
export const saveSelectedAddress = createAction(
  '[Customer] Save Selected Address',
  props<{ selectedAddress: IIdCardAddress }>()
);
export const loadSelectedAddress = createAction(
  '[Customer] Load Selected Address',
  props<{ selectedAddress: IIdCardAddress }>()
);
