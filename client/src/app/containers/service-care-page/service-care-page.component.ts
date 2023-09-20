import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';
import { ErrorService } from 'src/app/core/service/error.service';
import { messageConstant } from 'src/app/shared/constant/message.constant';
import { PathConstant } from 'src/app/shared/constant/path.constant';

import { IMobileCareSelected } from 'src/app/shared/model/service-care.model';
import { CartService } from 'src/app/shared/service/cart.service';
import { TranfromTransactionDataService } from 'src/app/shared/service/tranfromTransactionData.service';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getCartList } from 'src/app/store-ngrx/selectors/cart.selectors';

@Component({
  selector: 'app-service-care-page',
  templateUrl: './service-care-page.component.html',
  styleUrls: ['./service-care-page.component.scss']
})
export class ServiceCarePageComponent {
  dataMobileCareSelected?: IMobileCareSelected

  backPageUrl: string = PathConstant.VALIDATE_CUSTOMER_PAGE;
  textNextButton: string = 'NEXT';

  isLoading: boolean = false
  isLimitMobileCare: boolean = false
  isMobileCareFormValid: boolean = false

  transactionId: string = ''

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cartService: CartService,
    private errorService: ErrorService
  ) { }

  getMobileCareFormValid(isMobileCareFormValid: boolean) {
    this.isMobileCareFormValid = isMobileCareFormValid
  }
  getLimitMoblieCare(isLimitMobileCare: boolean) {
    this.isLimitMobileCare = isLimitMobileCare
  }
  getDataMobileCareSelected(data: IMobileCareSelected) {
    this.dataMobileCareSelected = data;
  }

  get buttonNextEnableStatus(): boolean {
    return this.isMobileCareFormValid
      && !this.isLimitMobileCare
  }

  async getTransactionId(): Promise<string> {
    const cartList = await firstValueFrom(this.store.select(getCartList));
    return cartList[0].transactionId
  }

  async updateMobileCare(): Promise<void> {
    this.transactionId = await this.getTransactionId()

    if (this.transactionId && this.dataMobileCareSelected) {
      const tranfromTransactionDataService = new TranfromTransactionDataService()

      const moblieCareReq = {
        'DATA.mobile_care_package': tranfromTransactionDataService.mapMobileCarePackage(this.dataMobileCareSelected),
        'DATA.device_care_package': tranfromTransactionDataService.mapDeviceCarePackage(this.dataMobileCareSelected),
        'DATA.device_care_payment': tranfromTransactionDataService.mapDeviceCarePayment(this.dataMobileCareSelected),
      }

      this.cartService
        .updateTransaction(
          this.transactionId,
          moblieCareReq
        )
        .pipe(take(1))
        .subscribe((response) => {
          if (response) {
            this.router.navigate([PathConstant.CART_PAGE])
          }
        });
      return;
    }
    this.errorService.handleError({
      customMessage: messageConstant.ERROR
    });
  }

}
