import { Action, createReducer, on } from '@ngrx/store';
import * as customerAction from '../actions/customer.action';
import {
  IBackListLimitData,
  ICustomerData,
  IIdCardAddress,
  IMobileListNumberByIdCardNumber,
} from 'src/app/shared/model/customer.model';
import { IContactMobile } from 'src/app/shared/model/e-document.model';

export interface ICustomerState {
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;
  errorData: any;
  dataCustomer: ICustomerData;
  contractError?: any;
  dataBackListLimit?: IBackListLimitData;
  contractData?: IContactMobile;
  selectedAddressData?: IIdCardAddress;
  otherAddress?: any;
  mobileListNumberByIdCardNumber?: IMobileListNumberByIdCardNumber;
}

export const initialState: ICustomerState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
  dataCustomer: {
    title: '',
    customerName: '',
    birthday: '',
    mobileNo: '',
    segment: '',
    serviceYear: '',
    chargeType: '',
    subscriptionState: '',
    billingSystem: '',
    idCardNo: '',
    idCardType: '',
    receiptAddress: {
      engFlag: '',
      houseNo: '',
      moo: '',
      mooban: '',
      building: '',
      floor: '',
      room: '',
      soi: '',
      street: '',
      amphur: '',
      tumbol: '',
      province: '',
      zipCode: '',
    },
    customerAddress: {
      engFlag: '',
      houseNo: '',
      moo: '',
      mooban: '',
      building: '',
      floor: '',
      room: '',
      soi: '',
      street: '',
      amphur: '',
      tumbol: '',
      province: '',
      zipCode: '',
    },
    isMobileAis: false,
    billLanguage: '',
    accountSubCat: '',
    gender: '',
    exprireDate: '',
    engFlag: '',
    imageReadSmartCard: '',
  },
  errorData: null,
};

export const customerReducer = createReducer(
  initialState,
  on(customerAction.loadCustomerDataByPhone, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
    isError: false,
    dataCustomer: {
      ...initialState.dataCustomer,
      mobileNo: state.dataCustomer?.mobileNo || ''
    },
    errorData: initialState.errorData
  })),
  on(customerAction.loadCustomerDataByIdentityCard, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
    isError: false,
    dataCustomer: {
      ...initialState.dataCustomer,
      mobileNo: state.dataCustomer?.mobileNo || ''
    }
  })),
  on(customerAction.loadDataCustomerSuccess, (state, { dataCustomer }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: false,
    dataCustomer: dataCustomer,
    errorData: null,
  })),
  on(customerAction.loadDataCustomerFailure, (state, { error }) => {
    return {
      ...state,
      isLoaded: true,
      isLoading: false,
      isError: true,
      errorData: error,
    };
  }),
  on(customerAction.loadBackListLimitData, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(customerAction.loadDataBackListLimitSuccess, (state, { data }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: false,
    dataBackListLimit: data,
    errorData: null,
  })),
  on(customerAction.loadDataBackListLimitFailure, (state, { error }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: true,
    errorData: error,
  })),
  on(customerAction.loadContractMobileData, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  on(customerAction.loadDataContractMobileSuccess, (state, { data }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: false,
    contractData: data,
    errorData: null,
  })),
  on(customerAction.loadDataContractMobileFailure, (state, { error }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    isError: true,
    errorData: error,
  })),
  on(customerAction.loadContractMobileData, (state) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
  })),
  on(customerAction.saveOtherAddress, (state, { otherAddress }) => ({
    ...state,
    otherAddress: otherAddress,
    isLoaded: false,
    isLoading: true,
  })),
  on(customerAction.loadOtherAddress, (state) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
  })),
  on(customerAction.saveSelectedAddress, (state, { selectedAddress }) => ({
    ...state,
    selectedAddressData: selectedAddress,
    isLoaded: false,
    isLoading: true,
  })),
  on(customerAction.loadSelectedAddress, (state) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
  })),
  on(
    customerAction.loadMobileNumberByIdCardNumberSuccess,
    (state, { listMobileNumber }) => ({
      ...state,
      isLoaded: true,
      isLoading: false,
      mobileListNumberByIdCardNumber: listMobileNumber,
    })
  ),
  on(customerAction.loadMobileNumberByIdCardNumber, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
    isError: false,
  })),
  on(customerAction.saveMoblieNo, (state, { mobileNo }) => ({
    ...state,
    dataCustomer: {
      ...state.dataCustomer!,
      mobileNo: mobileNo,
    },
  })),
  on(customerAction.saveCustomerData, (state, { customerDataReadCard }) => ({
    ...state,
    dataCustomer: {
      title: customerDataReadCard.titleName,
      customerName: `${customerDataReadCard.firstName} ${customerDataReadCard.lastName}`,
      birthday: customerDataReadCard.birthdate,
      mobileNo: state.dataCustomer?.mobileNo || '',
      segment: '',
      serviceYear: '',
      chargeType: '',
      subscriptionState: '',
      billingSystem: '',
      idCardNo: customerDataReadCard.idCardNo,
      idCardType: customerDataReadCard.idCardType,
      receiptAddress: undefined,
      customerAddress: {
        engFlag: '',
        houseNo: customerDataReadCard.address.homeNo,
        moo: customerDataReadCard.address.moo,
        mooban: '',
        building: '',
        floor: '',
        room: '',
        soi: customerDataReadCard.address.soi,
        street: customerDataReadCard.address.street,
        amphur: customerDataReadCard.address.amphur,
        tumbol: customerDataReadCard.address.tumbol,
        province: customerDataReadCard.address.province,
        zipCode: '',
      },
      isMobileAis: customerDataReadCard.isMobileAis || false,
      billLanguage: '',
      accountSubCat: '',
      gender: customerDataReadCard.gender,
      exprireDate: customerDataReadCard.expireDate,
      engFlag: '',
      imageReadSmartCard: customerDataReadCard.imageReadSmartCard,
    },
  }))
);
export function allCustomerReducer(state = initialState, action: Action) {
  return customerReducer(state, action);
}
