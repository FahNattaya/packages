import { createSelector } from '@ngrx/store';
import { getCustomerData } from './customer.selectors';
import { getLocationName } from './location.selectors';
import { getSelectProduct } from './product.selectors';
import { getAllCampaign } from './promotion.selectors';
import { getSelectedMobileCare } from './service-care.selectors';
import { getUserData } from './seller.selectors';
import {
  getConfigMCData,
  getOutChCustData,
} from './mc-config.selectors';
import { getSelectPackage } from './product-package.selectors';
import { getDataFromProductSelling, getDataFromValidateCustomer } from './cart.selectors';
import { TranfromTransactionDataService } from 'src/app/shared/service/tranfromTransactionData.service';

export const getMergeDocumentStore = createSelector(
  getCustomerData,
  getAllCampaign,
  getSelectProduct,
  getLocationName,
  getSelectedMobileCare,
  (
    getCustomerDataState,
    getSelectedPromotion,
    getSelectProduct,
    getLocationName,
    getMobileCare
  ) => {
    return {
      titleName: getCustomerDataState?.title || '',
      fullName: getCustomerDataState?.customerName || '',
      idCard: getCustomerDataState?.idCardNo || '',
      mobileNumber: getCustomerDataState?.mobileNo || '',
      idCardType: getCustomerDataState?.idCardType || '',
      conditionCode: getSelectedPromotion?.conditionCode || '',
      company: getSelectedPromotion?.company || '',
      campaignName: getSelectedPromotion?.campaignName || '',
      color: getSelectedPromotion?.color || '',
      priceIncludeVat: getSelectedPromotion?.priceIncludeVat || '',
      discountIncludeVat: getSelectedPromotion?.discountIncludeVat || '',
      netPrice: getSelectedPromotion?.netPrice || '',
      summaryPrice: getSelectedPromotion?.summaryPrice || '',
      contract: getSelectedPromotion?.contract || 0,
      advancePay: getSelectedPromotion?.advancePay,
      brand: getSelectProduct?.brand || '',
      model: getSelectProduct?.productName || '',
      mobileCarePackageTitle: getMobileCare?.option.name || '',
      locationName: getLocationName?.locationName || '',
    };
  }
);

export const getMergeDataProductSelling = createSelector(
  getUserData,
  getSelectProduct,
  getSelectPackage,
  getOutChCustData,
  getConfigMCData,
  getLocationName,
  (
    getUserDataState,
    getproductState,
    getPackageDataState,
    getoutChConfigState,
    getConfigMCData,
    getLocationNameData
  ) => {
    return {
      sellerData: getUserDataState,
      productDetail: getproductState,
      selectPackage: getPackageDataState,
      configMc: getConfigMCData,
      outChannelSales: getoutChConfigState,
      LocationName: getLocationNameData,
    };
  }
);


export const getDataCreateTransaction = createSelector(
  getCustomerData,
  getSelectProduct,
  getUserData,
  getDataFromProductSelling,
  getDataFromValidateCustomer,
  (
    getCustomerDataState,
    getproductState,
    getUserDataState,
    getProductSellingState,
    getValidateState,
  ) => {
    const tranfromTransactionData = new TranfromTransactionDataService();
    return {

      customer: tranfromTransactionData.mapCustomer(getCustomerDataState!),
      sim_card: tranfromTransactionData.mapSimCard(getCustomerDataState!),
      device: tranfromTransactionData.mapDevice(
        getproductState!,
        getProductSellingState.colorName!,
        getProductSellingState.selectedColor!,
        getProductSellingState.company!
      ),
      billing_information: tranfromTransactionData.mapBillingInformation(getCustomerDataState!),
      main_promotion: tranfromTransactionData.mapMainPromotion(
        getProductSellingState.campaignSelected!,
        getProductSellingState.tradeSelected!,
        getProductSellingState.tradePrice!,
        getProductSellingState.company!,
        getProductSellingState.colorName!,
        getProductSellingState.customerCriteria?.orderType!,
        getValidateState.returnCode!,
      ),
      seller: tranfromTransactionData.mapSeller(getUserDataState!),
      receipt: tranfromTransactionData.mapReceipt(),
      order: tranfromTransactionData.mapOrder(getValidateState.stockRes!),
      air_time: tranfromTransactionData.mapAirTime(),
      transactionType: tranfromTransactionData.mapTransactionType(
        getProductSellingState.customerCriteria!,
        getUserDataState!
      ),
      CREATE_BY: tranfromTransactionData.mapUsername(getUserDataState?.username!)
    }
  }
)