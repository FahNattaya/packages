// import { createReducer, on, Action } from '@ngrx/store';
// import { initializeStore } from '../actions/intialize.action';
// import { AppState } from '../app.state';

// const initialState: AppState = {
//   productData: {
//     selectedBrand: [],
//     isLoaded: false,
//     isLoading: false,
//     isError: false,
//     allBrandModel: [],
//     selectedPromotion: {
//       campaignName: '',
//       conditionCode: '',
//       company: '',
//       color: '',
//       priceIncludeVat: '',
//       discountIncludeVat: '',
//       netPrice: '',
//       contract: 0,
//       advancePay: '',
//       tradeSelected: {
//         tradeProductId: 0,
//         tradeNo: '',
//         tradeName: '',
//         packageKeyRef: '',
//         packageOnTopKeyRef: '',
//         minnimumPackagePrice: 0,
//         maximumPackagePrice: 0,
//         simLock: '',
//         serviceLockHs: '',
//         requireCheckQuota: '',
//         requireChangePromotion: false,
//         minimumPriceLength: 0,
//         maximumPriceLength: 0,
//         maxReceiveFreeGoods: 0,
//         contractId: 0,
//         durationContract: 0,
//         limitContract: 0,
//         discount: {
//           tradeDiscountId: 0,
//           tradePriceExcludeVat: 0,
//           tradePriceInCludeVat: 0,
//           discountExcludeVat: 0,
//           discountExcludeBy: '',
//           specialDiscountIncludeVat: 0,
//           specialDiscountBy: '',
//           vatRate: 0,
//           tradePrivilegeId: 0,
//           installmentPartnerFlag: '',
//           startDate: '',
//           endDate: '',
//         },
//         payAdvance: {
//           payAdvanceGroupId: 0,
//           priceIncludeVat: 0,
//           installmentFlag: '',
//           matAirtime: '',
//           description: '',
//         },
//         freegoods: [{
//           matCode: '',
//           name: '',
//           qty: 0,
//         }],
//         privileges: [{
//           tradePrivilegeId: 0,
//           privilegeId: '',
//           ussdCode: '',
//         }],
//         criterias: [
//           { chargeType: [] },
//           { criteria: [] },
//           { instanceName: [] },
//           { target: [] }
//         ],
//         discountPrice: 0,
//       },
//       summaryPrice: ''
//     },
//     selectedProduct: {
//       productType: '',
//       productSubtype: '',
//       brand: '',
//       productName: '',
//       model: '',
//       normalPrice: '',
//       colors: [{
//         colorId: 0,
//         code: '',
//         name: '',
//         stock: '',
//         imageUrl: [],
//       }],
//     },
//     selectedMobileCare: {
//       email: '',
//       productType: '',
//       title: '',
//       option: {
//         name: '',
//         price: '',
//         promotionCode: '',
//       }
//     }

//   },
//   customerData: {
//     isLoaded: false,
//     isLoading: false,
//     isError: false,
//     errorData: {},
//     dataCustomer: {
//       title: '',
//       customerName: '',
//       mobileNo: '',
//       segment: '',
//       serviceYear: '',
//       chargeType: '',
//       subscriptionState: '',
//       idCardNo: '',
//       idCardType: '',
//       privilegeData: {
//         ussdCode: '',
//         isCheckPrivilegePass: false,
//         errorMsg: '',
//         errorDetail: '',
//       }
//     },
//     contractImage: '',
//     contractError: '',
//   },
//   blackListLimit: {
//     isLoaded: false,
//     isLoading: false,
//     isError: false,
//     errorData: {},
//     dataBackListLimit: {
//       flag: '',
//       message: '',
//       errorMessage: '',
//     },
//   },
//   locationData: {
//     isLoaded: false,
//     isLoading: false,
//     isError: false,
//     errorData: {},
//     dataLocation: [],
//     dataLocationName: {
//       locationName: '',
//     }
//   },
//   stockData: {
//     isLoadedMyShop: false,
//     isLoadedOther: false,
//     isLoadingMyShop: false,
//     isLoadingOther: false,
//     isError: false,
//     errorData: {},
//     stockData: [{
//       locationCode: '',
//       locationName: '',
//       productStock: [{
//         productName: '',
//         totalStockAval: '',
//         company: '',
//         colorStock: [{
//           color: '',
//           stockAval: ''
//         }]
//       }]
//     }],
//     subStockCode: '',
//     stockType: '',
//   },
//   contractMobile: {
//     isLoaded: false,
//     isLoading: false,
//     isError: false,
//     errorData: {},
//     data: {
//       errorMessage: '',
//       profileTypeList: [
//         {
//           profileType: '',
//           contractList: [
//             {
//               idCard: '',
//               countContract: '',
//               countContractExc: '',
//               countContractProfileId: '',
//               countContractProfileIdExc: '',
//               countContractMobile: '',
//               countContractMobileExc: '',
//               contractDetailList: [{
//                 mobileStatus: '',
//                 startDt: '',
//                 endDt: '',
//                 status: ''
//               }],
//             },
//           ],
//         },
//       ],
//     },
//   },
//   userData: {
//     isLoaded: false,
//     isLoading: false,
//     isError: false,
//     userData: {
//       locationCode: '',
//       outChnSales: '',
//       outChnSalesCode: '',
//       userType: '',
//       channelType: '',
//       username: '',
//       mobileNo: ''
//     }
//   },
//   paymentData: {
//     isLoaded: false,
//     isLoading: false,
//     isError: false,
//     dataPayments: '',
//     paymentSelected: ''
//   }
// };

// export const storeReducer = createReducer(
//   initialState,
//   on(
//     initializeStore,
//     (
//       state,
//       {
//         productData,
//         customerData,
//         blackListLimit,
//         locationData,
//         stockData,
//         contractMobile,
//         userData,
//         paymentData
//       }
//     ) => ({
//       ...state,
//       initialized: {
//         productData,
//         customerData,
//         blackListLimit,
//         locationData,
//         stockData,
//         contractMobile,
//         userData,
//         paymentData
//       },
//     })
//   )
// );

// export function Intialreducer(state: AppState | undefined, action: Action) {
//   return storeReducer(state, action);
// }
