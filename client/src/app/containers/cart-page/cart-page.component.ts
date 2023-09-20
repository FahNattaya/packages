import { Component } from '@angular/core';
import { PathConstant } from 'src/app/shared//constant/path.constant';
import { Router } from '@angular/router';
import {
  IProductDetail,
  IPromotionsSelected,
} from 'src/app/shared/model/product.model';
import { IProductCart } from 'src/app/shared/model/cart.model';
import { IMobileCareSelected } from 'src/app/shared/model/service-care.model';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { getCustomerData } from '../../store-ngrx/selectors/customer.selectors';
import { AppState } from '../../store-ngrx/app.state';
import { CartService } from 'src/app/shared/service/cart.service';
import { SweetAlert } from 'src/app/shared/alert/sweet-alert';
import { getUserData } from '../../store-ngrx/selectors/seller.selectors';
import { loadCartList } from 'src/app/store-ngrx/actions/cart.action';
import { getSelectPackage } from 'src/app/store-ngrx/selectors/product-package.selectors';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  disablePayNow: boolean = true;
  isLoading: boolean = false;
  summaryPrice: number = 0;
  product?: IProductDetail;
  campaign?: IPromotionsSelected;
  textCommitButton: string = 'BUY MORE';
  textPayNowButton: string = 'PAY NOW';
  backPageUrl = PathConstant.HANDSET_LIST_PAGE;
  productEditable?: IProductCart;
  mobileCareEditable?: IMobileCareSelected;
  alert: SweetAlert = new SweetAlert();
  packageSelected: any;
  typeEdit: string = '';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cartService: CartService
  ) { }

  getSummaryPrice(summaryPrice: number) {
    this.summaryPrice = summaryPrice;
  }

  onPayNow() {
    this.router.navigate([PathConstant.PAYMENT_METHOD]);
  }

  onBuyMore() {
    this.router.navigate([PathConstant.HANDSET_LIST_PAGE]);
  }

  getCartStatus(status: boolean) {
    this.disablePayNow = status;
  }

  onSetProductEditable(data: any) {
    this.typeEdit = data.type;
    this.productEditable = { ...data.data };
  }

  onSetDataSelectedMobileCare(mobileCare: IMobileCareSelected) {
    this.mobileCareEditable = { ...mobileCare };
  }

  async onSaveSuccess() {
    this.isLoading = false;
    this.alert.swalSuccess('อัพเดทข้อมูลสำเร็จ');
    const customer = await firstValueFrom(this.store.select(getCustomerData));
    const user = await firstValueFrom(this.store.select(getUserData));
    this.store.dispatch(
      loadCartList({
        mobileNo: customer?.mobileNo || '',
        locationCode: user?.locationCode || '',
      })
    );
  }

  onSavePackage() {
    this.isLoading = true;
    document.getElementById(
      'offcanvasPackage'
    )!.className = `offcanvas offcanvas-bottom`;
    document.getElementsByClassName(
      'offcanvas-backdrop'
    )[0].className = `offcanvas-backdrop fade`;

    this.store
      .select(getSelectPackage)
      .subscribe((packageData) => {
        const body = {
          'DATA.package': { ...packageData },
        };
        this.cartService
          .updateTransaction(this.productEditable!.transactionId, body)
          .subscribe(async (res) => {
            if (res.message === 'Success') {
              await this.onSaveSuccess();
            } else {
              this.isLoading = false;
              this.alert.swalError(res?.message);
            }
          });
      })
      .unsubscribe();
  }

  onSaveMobileCare() {
    const isNull =
      (this.mobileCareEditable?.productType !== 'ไม่สนใจ' &&
        !this.mobileCareEditable?.email) ||
      (this.mobileCareEditable?.productType === 'ไม่สนใจ' &&
        !this.mobileCareEditable?.option.name);

    document.getElementById(
      'offcanvasMobileCare'
    )!.className = `offcanvas offcanvas-bottom${isNull ? ' show' : ''}`;
    document.getElementsByClassName(
      'offcanvas-backdrop'
    )[0].className = `offcanvas-backdrop fade ${isNull ? ' show' : ''}`;

    if (!isNull) {
      this.isLoading = true;
      let body;
      if (
        this.mobileCareEditable?.productType === 'AppleCare+'
      ) {
        body = {
          'DATA.mobile_care_package': {
            accountFees: [],
            orderFees: []
          },
          'DATA.device_care_package': {
            ...this.mobileCareEditable,
            isBuyDeviceCare: true
          },
          'DATA.device_care_payment': {
            amount: this.mobileCareEditable?.option.price,
            matCodeCarePlus: this.mobileCareEditable?.matCodeCarePlus || '',
            email: this.mobileCareEditable?.email
          },
        };
      } else {
        body = {
          'DATA.mobile_care_package': {
            ...this.mobileCareEditable
          },
          'DATA.device_care_package': {
            accountFees: [],
            orderFees: [],
            isBuyDeviceCare: false
          },
          'DATA.device_care_payment': {
            amount: this.mobileCareEditable?.option.price,
            matCodeCarePlus: this.mobileCareEditable?.matCodeCarePlus || '',
            email: this.mobileCareEditable?.email
          },
        };
      }

      this.cartService
        .updateTransaction(this.productEditable!.transactionId, body)
        .subscribe(async (res) => {
          if (res.message === 'Success') {
            await this.onSaveSuccess();
          } else {
            this.isLoading = false;
            this.alert.swalError(res?.message);
          }
        });
    }
  }
}
