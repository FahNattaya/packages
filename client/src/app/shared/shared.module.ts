import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { ButtonNextComponent } from './button-next/button-next.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { StepBarComponent } from './components/step-bar/step-bar.component';
import { PhoneNumbeMarkrFormatDirective } from './directive-form/phone-number-mark-format.directive';
import { PriceDecimalFormatDirective } from './directive-form/price-decimal-format.directive';
import { ResultFailedComponent } from './result-failed/result-failed.component';
import { ContinuousScrollingComponent } from './components/continuous-scrolling/continuous-scrolling.component';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonLoadingComponent } from './skeleton-loading/skeleton-loading.component';
import { FormImeiComponent } from './components/form-imei/form-imei.component';
import { ScannerImeiComponent } from './components/scanner-imei/scanner-imei.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { NgxBarcodeScannerModule } from '@eisberg-labs/ngx-barcode-scanner';
@NgModule({
  declarations: [
    CustomerDetailComponent,
    ButtonNextComponent,
    NavbarComponent,
    LoadingComponent,
    StepBarComponent,
    PhoneNumbeMarkrFormatDirective,
    PriceDecimalFormatDirective,
    ResultFailedComponent,
    ContinuousScrollingComponent,
    ImageLoaderComponent,
    SkeletonLoadingComponent,
    FormImeiComponent,
    ScannerImeiComponent,
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    WebcamModule,
    ReactiveFormsModule,
    FormsModule,
    NgxBarcodeScannerModule,
  ],
  exports: [
    CustomerDetailComponent,
    ButtonNextComponent,
    NavbarComponent,
    LoadingComponent,
    StepBarComponent,
    PhoneNumbeMarkrFormatDirective,
    PriceDecimalFormatDirective,
    ResultFailedComponent,
    ContinuousScrollingComponent,
    ImageLoaderComponent,
    SkeletonLoadingComponent,
    FormImeiComponent,
    ScannerImeiComponent,
  ],
  providers: [DecimalPipe],
})
export class SharedModule {}
