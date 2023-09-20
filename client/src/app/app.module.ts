import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductEffects } from 'src/app/store-ngrx/effects/product.effect';
import { productReducer } from './store-ngrx/reducers/product.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerEffects } from 'src/app/store-ngrx/effects/customer.effect';
import { customerReducer } from './store-ngrx/reducers/customer.reducer';
import { locationReducer } from './store-ngrx/reducers/location.reducer';
import { LocationEffects } from './store-ngrx/effects/location.effect';
import { CookieService } from 'ngx-cookie-service';
import { sellerReducer } from './store-ngrx/reducers/seller.reducer';
import { paymentReducer } from './store-ngrx/reducers/payments.reducer';
import { PaymentsEffects } from './store-ngrx/effects/payments.effect';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthGuard } from './core/service/authguard.service';
import { BrandsProductComponent } from './components/brands-product/brands-product.component';
import { CaptureIdCardComponent } from './components/capture-id-card/capture-id-card.component';
import { CartComponent } from './components/cart/cart.component';
import { StockFilterLocationComponent } from './components/stock/stock-filter-location/stock-filter-location.component';
import { HandsetListComponent } from './components/handset-list/handset-list.component';
import { ListNumberComponent } from './components/list-number/list-number.component';
import { ProductSellingServiceCareComponent } from './components/product-selling/product-selling-service-care/product-selling-service-care.component';
import { PaymentMethodAppleCareComponent } from './components/payment-method/payment-method-apple-care/payment-method-apple-care.component';
import { PaymentMethodHandsetComponent } from './components/payment-method/payment-method-handset/payment-method-handset.component';
import { ProductSellingCampaignComponent } from './components/product-selling/product-selling-campaign/product-selling-campaign.component';
import { ProductSellingDetailComponent } from './components/product-selling/product-selling-detail/product-selling-detail.component';
import { PackageListComponent } from './components/product-selling/product-selling-package/package-list/package-list.component';
import { ProductSellingPackageComponent } from './components/product-selling/product-selling-package/product-selling-package.component';
import { ProductSellingTradeComponent } from './components/product-selling/product-selling-trade/product-selling-trade.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockMyShopComponent } from './components/stock/stock-my-shop/stock-my-shop.component';
import { StockModelListComponent } from './components/stock/stock-model-list/stock-model-list.component';
import { SuccessCardComponent } from './components/success-card/success-card.component';
import { SuccessQueueComponent } from './components/success-queue/success-queue.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { WebcamModule } from 'ngx-webcam';
import { LayoutComponent } from './core/layout/layout.component';
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
import { SharedModule } from './shared/shared.module';
import { cartReducer } from './store-ngrx/reducers/cart.reducer';
import { promotionReducer } from './store-ngrx/reducers/promotion.reducer';
import { serviceCareReducer } from './store-ngrx/reducers/service-care.reducer';
import { configMCReducer } from './store-ngrx/reducers/mc-config.reducer';
import { EDocumentReducer } from './store-ngrx/reducers/e-document.reducer';
import { productPackageReducer } from './store-ngrx/reducers/product-package.reducer';
import { PrivilegeReducer } from './store-ngrx/reducers/privilege.reducer';
import { queueReducer } from './store-ngrx/reducers/queue.reducer';
import { PromotionEffects } from './store-ngrx/effects/promotion.effect';
import { CartEffects } from './store-ngrx/effects/cart.effect';
import { ServiceCareEffects } from './store-ngrx/effects/service-care.effect';
import { ProductPackageEffects } from './store-ngrx/effects/product-package.effect';
import { QueueEffects } from './store-ngrx/effects/queue.effect';
import { PrivilegeEffects } from './store-ngrx/effects/privilege.effect';
import { EDocumentEffects } from './store-ngrx/effects/e-document.effect';
import { McConfigEffects } from './store-ngrx/effects/mc-config.effect';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { McConfigService } from './shared/service/mc-config.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import { firstValueFrom } from 'rxjs';
import { ReceiptAddressFormComponent } from './components/payment-method/receipt-address-form/receipt-address-form.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ReceiptAddressComponent } from './components/payment-method/receipt-address/receipt-address.component';
import { RecordedSalesComponent } from './components/recorded-sales/recorded-sales.component';
import { OnlyNumberDirective } from './shared/directive-form/only-number.directive';
import { ServiceCarePageComponent } from './containers/service-care-page/service-care-page.component';
import { CustomerInfoPageComponent } from './containers/customer-info-page/customer-info-page.component';
import { SellerInformationComponent } from './components/payment-method/seller-information/seller-information.component';
import { CreateTransactionService } from './shared/service/createTransaction.service';
import { ReadCardPageComponent } from './containers/read-card-page/read-card-page.component';
import { MobileNumberPageComponent } from './containers/mobile-number-page/mobile-number-page';
import { HttpLoggingService } from './shared/service/http-logging.service';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export function appInitializer(
  initialApiService: McConfigService
): () => Promise<any> {
  return () =>
    new Promise((resolve) => {
      firstValueFrom(initialApiService.getCheckApiByRole('checkApiByRole'))
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(true);
        });
    });
}
@NgModule({
  declarations: [
    AppComponent,
    ValidateCustomerPageComponent,
    MobileNumberPageComponent,
    HandsetListPageComponent,
    HandsetListComponent,
    ProductSellingPageComponent,
    SuccessQueuePageComponent,
    ContractPageComponent,
    SignContractPageComponent,
    MenuBarComponent,
    SuccessQueueComponent,
    ProductSellingDetailComponent,
    SuccessCardComponent,
    GenQueuePageComponent,
    ProductSellingCampaignComponent,
    ProductSellingTradeComponent,
    CartComponent,
    CartPageComponent,
    BrandsProductComponent,
    ListNumberPageComponent,
    ListNumberComponent,
    PaymentMethodPageComponent,
    CaptureIdCardPageComponent,
    CaptureIdCardComponent,
    StockPageComponent,
    StockModelListComponent,
    StockListComponent,
    StockFilterLocationComponent,
    StockMyShopComponent,
    ProductSellingServiceCareComponent,
    ProductSellingPackageComponent,
    PackageListComponent,
    PaymentMethodHandsetComponent,
    PaymentMethodAppleCareComponent,
    LayoutComponent,
    AlertComponent,
    ReceiptAddressFormComponent,
    ReceiptAddressComponent,
    RecordedSalesComponent,
    OnlyNumberDirective,
    ServiceCarePageComponent,
    CustomerInfoPageComponent,
    SellerInformationComponent,
    ReadCardPageComponent,
  ],
  imports: [
    AutocompleteLibModule,
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      product: productReducer,
      customer: customerReducer,
      location: locationReducer,
      cart: cartReducer,
      seller: sellerReducer,
      promotion: promotionReducer,
      service_care: serviceCareReducer,
      payment: paymentReducer,
      mc_config: configMCReducer,
      e_document: EDocumentReducer,
      product_package: productPackageReducer,
      privilege: PrivilegeReducer,
      queue: queueReducer,
    }),
    EffectsModule.forRoot([
      ProductEffects,
      CustomerEffects,
      LocationEffects,
      PaymentsEffects,
      PromotionEffects,
      CartEffects,
      ServiceCareEffects,
      ProductPackageEffects,
      QueueEffects,
      PrivilegeEffects,
      EDocumentEffects,
      McConfigEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    WebcamModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoggingService,
      multi: true,
    },
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    McConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [McConfigService],
    },
    AuthGuard,
    DecimalPipe,
    AlertComponent,
    CreateTransactionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
