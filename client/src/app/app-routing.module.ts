import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/service/authguard.service';
import { ProductSellingPackageComponent } from './components/product-selling/product-selling-package/product-selling-package.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { CaptureIdCardPageComponent } from './containers/capture-id-card-page/capture-id-card-page.component';
import { CartPageComponent } from './containers/cart-page/cart-page.component';
import { ContractPageComponent } from './containers/contract-page/contract-page.component';
import { GenQueuePageComponent } from './containers/gen-queue-page/gen-queue-page.component';
import { HandsetListPageComponent } from './containers/handset-list-page/handset-list-page.component';
import { ListNumberPageComponent } from './containers/list-number-page/list-number-page.component';
import { PaymentMethodPageComponent } from './containers/payment-method-page/payment-method-page.component';
import { ProductSellingPageComponent } from './containers/product-selling-page/product-selling-page.component';
import { SignContractPageComponent } from './containers/sign-contract-page/sign-contract-page.component';
import { StockPageComponent } from './containers/stock-page/stock-page.component';
import { SuccessQueuePageComponent } from './containers/success-queue-page/success-queue-page.component';
import { ValidateCustomerPageComponent } from './containers/validate-customer-page/validate-customer-page.component';
import { RecordedSalesComponent } from './components/recorded-sales/recorded-sales.component';
import { ServiceCarePageComponent } from './containers/service-care-page/service-care-page.component';
import { CustomerInfoPageComponent } from './containers/customer-info-page/customer-info-page.component';
import { ReadCardPageComponent } from './containers/read-card-page/read-card-page.component';
import { MobileNumberPageComponent } from './containers/mobile-number-page/mobile-number-page';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'handset-list' },
      { path: 'stock', component: StockPageComponent },
      { path: 'validate-customer', component: ValidateCustomerPageComponent },
      { path: 'mobile-number', component: MobileNumberPageComponent },
      { path: 'handset-list', component: HandsetListPageComponent },
      {
        path: 'handset-list/:mobile_no',
        component: HandsetListPageComponent,
      },
      { path: 'product-selling', component: ProductSellingPageComponent },
      { path: 'service-care', component: ServiceCarePageComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'contract', component: ContractPageComponent },
      { path: 'sign-contract', component: SignContractPageComponent },
      { path: 'gen-queue', component: GenQueuePageComponent },
      { path: 'success-queue', component: SuccessQueuePageComponent },
      { path: 'list-number', component: ListNumberPageComponent },
      { path: 'payment-method', component: PaymentMethodPageComponent },
      { path: 'capture-id-card', component: CaptureIdCardPageComponent },
      { path: 'stock-list', component: StockListComponent },
      {
        path: 'product-selling-package',
        component: ProductSellingPackageComponent,
      },
      { path: 'recorded-sales', component: RecordedSalesComponent },
      { path: 'customer-info', component: CustomerInfoPageComponent },
      { path: 'read-id-card', component: ReadCardPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
