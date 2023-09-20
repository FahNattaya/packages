import { ICustomerState } from './reducers/customer.reducer';
import { IlocationState } from './reducers/location.reducer';
import { IProductState } from './reducers/product.reducer';
import { ISellerState } from './reducers/seller.reducer';
import { IPaymentState } from './reducers/payments.reducer';
import { ICartState } from './reducers/cart.reducer';
import { IMcConfigState } from './reducers/mc-config.reducer';
import { IPromotionState } from './reducers/promotion.reducer';
import { IServiceCareState } from './reducers/service-care.reducer';
import { IEDocumentState } from './reducers/e-document.reducer';
import { IproductPackageState } from './reducers/product-package.reducer';
import { IPrivilegeState } from './reducers/privilege.reducer';
import { IQueueState } from './reducers/queue.reducer';

export interface AppState {
  product: IProductState;
  customer: ICustomerState;
  location: IlocationState;
  cart: ICartState;
  seller: ISellerState;
  promotion: IPromotionState;
  service_care: IServiceCareState
  payment: IPaymentState;
  mc_config: IMcConfigState;
  e_document: IEDocumentState;
  product_package: IproductPackageState;
  privilege: IPrivilegeState;
  queue: IQueueState
  // blackListLimit: IBackListLimitState;
  // stockData: stockState;
  // contractMobile: ContractMobileState;
}
