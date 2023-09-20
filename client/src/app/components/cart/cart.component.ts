import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, take } from 'rxjs';
import { ICartListObject, IProductCart } from 'src/app/shared/model/cart.model';
import { ICustomerData } from 'src/app/shared/model/customer.model';
import { ISeller } from 'src/app/shared/model/seller.model';
import { CartService } from 'src/app/shared/service/cart.service';
import SweetAlert from 'sweetalert2';
import { AppState } from '../../store-ngrx/app.state';
import { getCustomerData } from '../../store-ngrx/selectors/customer.selectors';
import { getUserData } from '../../store-ngrx/selectors/seller.selectors';
import { loadCartListSuccess } from 'src/app/store-ngrx/actions/cart.action';
import { IProductDetail } from 'src/app/shared/model/product.model';
import { getScanImeiCart } from 'src/app/store-ngrx/selectors/mc-config.selectors';
import { SharedService } from 'src/app/shared/service/shared.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() isPayment: boolean = false;
  @Output() disablePayNow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSetProductEditable: EventEmitter<{
    data: IProductCart;
    type: string;
  }> = new EventEmitter<{ data: IProductCart; type: string }>();
  @Output() emitSummaryPrice: EventEmitter<number> = new EventEmitter<number>();
  productListData?: IProductCart[];
  productDetail?: IProductDetail;
  totalNetPrice = 0;
  userData!: ISeller;
  AIS_CARE_PLUS: string = 'AIS Care Plus';
  APPLE_CARE_PLUS: string = 'AppleCare+';
  isLoading: boolean = false;
  isCartListEmpty: boolean = true;
  isError: boolean = false;
  isAllProductChecked: boolean = true;
  customer?: ICustomerData;
  showPackage: boolean = false;
  cartList?: ICartListObject;
  isProductChecked: boolean = true;
  isScanImeiSuccess: boolean = false;
  isShowImei$ = this.store.select(getScanImeiCart);
  isShowImei: boolean = false;
  resetForm = false;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await firstValueFrom(this.store.select(getUserData));
    const configShowImei = await firstValueFrom(this.isShowImei$);
    this.userData = user!;
    this.isShowImei = configShowImei === 'Y';
    await this.getProductList();
  }

  async getProductList() {
    this.isLoading = true;
    this.customer = await firstValueFrom(this.store.select(getCustomerData));
    if (this.customer?.mobileNo && this.userData.locationCode) {
      this.cartService
        .getCartList(this.customer?.mobileNo, this.userData.locationCode)
        .subscribe((cartData) => {
          if (cartData.message === 'error') {
            this.isLoading = false;
            this.isCartListEmpty = false;
            this.isError = true;
            return;
          }
          if (
            !Array.isArray(cartData) &&
            cartData?.hasOwnProperty('message') &&
            cartData.message === "Can't find Data"
          ) {
            this.isCartListEmpty = true;
            this.isLoading = false;
            this.isEnablePayNow();
            return;
          }
          this.isCartListEmpty = false;
          this.productListData = cartData?.map((data: any) => {
            const netPrice =
              typeof data?.main_promotion?.campaign?.netPrice === 'string'
                ? +data.main_promotion.campaign?.netPrice.replace(/,/g, '')
                : 0;

            const mobileCarePrice = Number(
              (data?.device_care_payment?.amount || '0').replace(/,/g, '')
            );
            let packageTitle = {};
            if (data.hasOwnProperty('package')) {
              packageTitle = data.package;
              this.showPackage = true;
            }

            return {
              soId: data?.soId,
              transactionId: data?.transactionId,
              image: data.device.imageUrl || '',
              campaignName: data.main_promotion?.campaign?.campaignName,
              simCard: data.simCard,
              trade: data.main_promotion?.trade,
              brand: data.device.brand || '',
              model: data.device.model || '',
              productName: data.device.name || '',
              color: data.device.colorName || '',
              advancePay: data.main_promotion?.campaign?.advancePay,
              amount: data.device.amount || '',
              netPrice,
              freeGoods: data.main_promotion?.trade?.discount?.freegoods,
              package: packageTitle,
              mobileCare: {
                ...data?.mobileCare,
                option: {
                  ...data?.mobileCare?.option,
                  price: mobileCarePrice,
                },
              },
              productChecked: true,
            };
          });
          this.isLoading = false;
          this.isEnablePayNow();
          if (cartData[0].device && cartData[0].device.imei) {
            this.isScanImeiSuccess = true;
            this.isEnablePayNow();
          }

          this.store.dispatch(loadCartListSuccess({ cartList: cartData }));
          this.getTotalNetPrice();
        });
    } else {
      this.isLoading = false;
    }
  }

  getTotalNetPrice(): void {
    if (this.productListData) {
      const totalNetPrice = this.productListData.reduce(
        (total: number, product: { netPrice: number }, index) => {
          return this.productListData![index].productChecked
            ? total + +product.netPrice
            : total;
        },
        0
      );
      const mobileCarePrice = this.productListData.reduce(
        (
          total: number,
          product: { mobileCare: { option: { price: number } } },
          index
        ) => {
          return this.productListData![index].productChecked &&
            this.productListData![index].mobileCare.isBuyDeviceCare === true
            ? total + product?.mobileCare?.option?.price
            : total;
        },
        0
      );
      this.totalNetPrice = totalNetPrice + mobileCarePrice;
      this.emitSummaryPrice.emit(this.totalNetPrice);
    } else {
      this.emitSummaryPrice.emit(0);
    }
  }

  onOpenEditCanvas(product: IProductCart, type: string) {
    this.onSetProductEditable.emit({ data: product, type: type });
  }

  onAllProductChecked(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isAllProductChecked = target.checked;
    this.productListData = this.productListData?.map((product) => {
      product.productChecked = target.checked;
      return product;
    });
    this.isProductChecked = this.isAllProductChecked;
    this.getTotalNetPrice();
    this.isEnablePayNow();
  }

  onProductChecked(event: Event, indexProductCheck: number) {
    const target = event.target as HTMLInputElement;
    this.productListData![indexProductCheck].productChecked = target.checked;
    const isAllUnchecked = this.productListData!.every(
      (product) => !product.productChecked
    );
    this.isProductChecked = this.productListData!.some(
      (product) => product.productChecked
    );
    this.isAllProductChecked = !isAllUnchecked;
    this.getTotalNetPrice();
    this.isEnablePayNow();
  }

  onConfirmDelete(isSelected: boolean, product?: IProductCart) {
    if (!this.isAllProductChecked && isSelected) {
      SweetAlert.fire({
        title: 'กรุณาเลือกสินค้าอย่างน้อย 1 ชิ้น',
        icon: 'error',
        timer: 1500,
      });
    } else {
      SweetAlert.fire({
        icon: 'warning',
        title: 'ต้องการลบรายการที่เลือกหรือไม่?',
        showCancelButton: true,
        cancelButtonText: 'ลบ',
        cancelButtonColor: 'var(--mc-red-color)',
        confirmButtonText: 'ยกเลิก',
        confirmButtonColor: 'var(--mc-text-secondary-color)',
      }).then((action) => {
        if (action.isDismissed && action.dismiss?.toString() !== 'backdrop') {
          if (isSelected) {
            this.onDeleteProductSelected();
          } else {
            this.onDeleteProduct(product!);
          }
        }
      });
    }
  }

  onDeleteSuccess() {
    SweetAlert.fire({
      title: 'ลบสำเร็จแล้ว',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: 'var(--mc-primary-color)',
    });
    this.isCartListEmpty = this.productListData?.length === 0;
    this.isEnablePayNow();
  }

  onDeleteProduct(product: IProductCart) {
    const transactionId = product.transactionId;
    this.cartService
      .deleteTransaction([transactionId], product.soId, this.userData.username)
      .subscribe((response) => {
        const isSuccess =
          response?.resultMessage == 'Success' ||
          response?.message == 'Success';

        if (isSuccess) {
          this.productListData = this.productListData?.filter(
            (item) => item.transactionId != transactionId
          );
          this.getTotalNetPrice();
          this.onDeleteSuccess();
        } else {
          SweetAlert.fire({
            title: response?.resultMessage || response?.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  }

  onDeleteProductSelected() {
    const productChecked = this.productListData?.filter(
      (product) => product.productChecked
    );
    const transactionIds = productChecked?.map(
      (product) => product.transactionId
    )!;
    const soId = productChecked?.[0]?.soId || '';

    this.cartService
      .deleteTransaction(transactionIds, soId, this.userData.username)
      .subscribe((response) => {
        const isSuccess =
          response?.resultMessage == 'Success' ||
          response?.message == 'Success';

        if (isSuccess) {
          this.productListData = this.productListData?.filter(
            (item) => !transactionIds.includes(item.transactionId)
          );
          this.getTotalNetPrice();
          this.onDeleteSuccess();
        } else {
          SweetAlert.fire({
            title: response?.resultMessage || response?.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  }

  formatDataTestId(id: number) {
    return 'cartCheckbox-' + id;
  }

  async onConfirmImei(imeiData: any, index: number) {
    let priceChange: boolean = false;
    let isColorNotMatch = false;
    console.log('this.productListData[index]', this.productListData![index]);

    if (
      imeiData.model &&
      imeiData.model === this.productListData![index].model
    ) {
      if (imeiData.matcode === 'MATCODE_NON_AIS') {
        if (
          this.productListData &&
          this.productListData[index] &&
          this.productListData[index].trade &&
          this.productListData[index].trade.modelColor
        ) {
          isColorNotMatch =
            imeiData.color !== this.productListData[index].trade.modelColor;
          if (isColorNotMatch) {
            this.showAlertImei();
          }
        }
        if (
          imeiData.color === this.productListData![index].color &&
          !isColorNotMatch
        ) {
          if (imeiData.price) {
            try {
              const action = await SweetAlert.fire({
                title: 'ราคาเครื่องไม่ตรงกับในระบบ ต้องการทำรายการต่อหรือไม่?',
                text: 'Are you sure you want to proceed?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'YES',
                cancelButtonText: 'NO',
              });

              if (action.isConfirmed) {
                this.isScanImeiSuccess = true;

                let priceMap = this.sharedService.calculateDiscount(
                  this.productListData![index].trade.discount,
                  imeiData.price,
                  this.sharedService.customRound(
                    imeiData.price *
                      (100 /
                        (100 +
                          this.productListData![index].trade.discount.vatRate!))
                  )
                );
                let discountPrice = this.sharedService.customRound(
                  priceMap.discount
                );
                this.productListData![index].netPrice =
                  priceMap.priceInclude - discountPrice;
                this.getTotalNetPrice();
                priceChange = true;
              } else if (action.isDenied || action.isDismissed) {
                this.isScanImeiSuccess = false;
              }
            } catch (error) {
              console.error(error);
            }
          } else {
            this.showSuccessImei();
            this.isScanImeiSuccess = true;
          }
        } else {
          this.showAlertImei();
        }
      } else {
        if (imeiData.color === this.productListData![0].color) {
          this.showSuccessImei();
          this.isScanImeiSuccess = true;
        } else {
          this.showAlertImei();
        }
      }
    } else {
      this.isScanImeiSuccess = false;
      this.showAlertImei();
    }
    if (this.isScanImeiSuccess) {
      let requestUpdateTransaction = {
        'DATA.device.imei': imeiData.imeiNo,
        'DATA.device.matCode': imeiData.matcode,
      };
      if (priceChange) {
        const requestPrice = {
          ...requestUpdateTransaction,
          'DATA.device.imei': imeiData.imeiNo,
          'DATA.device.matCode': imeiData.matcode,
          'DATA.main_promotion.trade.normalPrice': imeiData.price,
          'DATA.main_promotion.campaign.priceIncludeVat': imeiData.price,
          'DATA.main_promotion.campaign.netPrice':
            this.productListData![index].netPrice,
          'DATA.main_promotion.campaign.summaryPrice': this.totalNetPrice,
        };
        requestUpdateTransaction = requestPrice;
      }

      this.cartService
        .updateTransaction(
          this.productListData![index].transactionId,
          requestUpdateTransaction
        )
        .pipe(take(1))
        .subscribe((response) => {
          if (response) {
            this.isEnablePayNow();
          }
        });
    } else {
      this.isEnablePayNow();
    }
  }

  showSuccessImei() {
    SweetAlert.fire({
      title: 'แสกน IMEI สำเร็จ',
      icon: 'success',
    });
  }

  showAlertImei() {
    SweetAlert.fire({
      title:
        'ข้อมูล IMEI ไม่ถูกต้อง กรุณาตรวจสอบเครื่อง ยี่ห้อ/รุ่น/สี ที่เลือกมา',
      icon: 'error',
    });
    this.resetForm = !this.resetForm;
  }

  isEnablePayNow() {
    console.log('this.productListData', this.productListData);
    let isScanImeiSuccess = this.isShowImei ? this.isScanImeiSuccess : true;
    if (
      this.isShowImei &&
      this.productListData &&
      this.productListData[0] &&
      this.productListData[0].mobileCare?.isBuyDeviceCare
    ) {
      isScanImeiSuccess = true;
    }

    this.disablePayNow.emit(
      !isScanImeiSuccess || this.isCartListEmpty || !this.isProductChecked
    );
  }
}
