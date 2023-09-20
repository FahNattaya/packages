import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import * as Moment from 'moment';
import {
  IDeviceCarePayment,
  IOrderList,
  Product,
} from 'src/app/shared/model/cart.model';
import {
  ICollapsedComponent,
  IKeyCollapsed,
  IPayment,
  IPaymentSelected,
} from 'src/app/shared/model/payment.model';
import { Subject, Subscription, filter, firstValueFrom, take } from 'rxjs';
import { getTransactionIdInCart } from 'src/app/store-ngrx/selectors/cart.selectors';
import { AppState } from 'src/app/store-ngrx/app.state';
import { Store } from '@ngrx/store';
import { ReceiptAddressComponent } from 'src/app/components/payment-method/receipt-address/receipt-address.component';
import { ServiceCareService } from 'src/app/shared/service/service-care.service';
import { TokenService } from 'src/app/core/service/token.service';
import { ICreateActivityRequest } from 'src/app/shared/model/service-care.model';
import {
  getCustomerData,
  getSelectedAddress,
} from 'src/app/store-ngrx/selectors/customer.selectors';
import { CartService } from 'src/app/shared/service/cart.service';
import { getUserData } from 'src/app/store-ngrx/selectors/seller.selectors';
import { IIdCardAddress } from 'src/app/shared/model/customer.model';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { saveUserPaymentData } from 'src/app/store-ngrx/actions/payments.action';
// import { ErrorService } from 'src/app/core/service/error.service';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-payment-method-page',
  templateUrl: './payment-method-page.component.html',
  styleUrls: ['./payment-method-page.component.scss'],
})
export class PaymentMethodPageComponent implements OnInit {
  @ViewChild('receipt_address')
  receiptAddressComponent!: ReceiptAddressComponent;

  collapsedComponent: ICollapsedComponent[] = [
    { key: 'productCart', collapsed: false },
    { key: 'paymentHandset', collapsed: true },
    { key: 'reciept', collapsed: false },
    { key: 'productList', collapsed: true },
    { key: 'appleCare', collapsed: false },
  ];
  destroyed$: Subject<void> = new Subject();
  customerData$ = this.store.select(getCustomerData);
  customerData: any = {};
  transaction: any = {};
  selectedAddress?: IIdCardAddress;
  isLoading: boolean = false;
  productListData: Product[] = [];
  summaryPrice: number = 0;
  backPageUrl = PathConstant.CART_PAGE;
  onBlindToggleCollapse = this.onToggleCollapse.bind(this);
  onBlindCheckCollapse = this.onCheckCollapse.bind(this);
  APPLE_CARE_PLUS: boolean = true;
  productDetail?: any;
  paymentDetail: IPayment = {
    paymentMethod: '',
    method: '',
    paymentType: '',
    bankNameTh: '',
    bankNameEn: '',
    bankAbbr: '',
    installment: {
      installmentId: 0,
      installmentRate: '',
      installmentTerms: '',
      balloonMonth: 0,
      cardDigits: 0,
    },
    isInstallment: false,
    creditCardNo: '',
    contractNo: '',
  };
  handsetPaymentSelected: IPayment = this.paymentDetail;
  mobileCarePaymentSelected: IPayment = this.paymentDetail;
  observables: Subscription[] = [];
  flow = '';
  transactionId: string = '';

  isAppleCare: boolean = false;
  buttonStateChangeHandset: boolean = false;
  isPaymentMethodSelected!: boolean;

  buttonState = true;
  isReceiptAddressSelected: boolean = false;
  requestProvision: any = {
    services: [],
  };
  isCreateActivithSuccess: boolean = false;
  isCompentsationIMError: boolean = false;
  createOrderlistSuccess: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private careService: ServiceCareService,
    private tokenService: TokenService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private sharedService: SharedService
  ) {}
  async ngOnInit(): Promise<void> {
    await this.getProductList();
    const getFlow = this.store.select(getOutChCustData).subscribe((config) => {
      if (config) {
        this.flow = config.Flow;
      }
    });
    this.transactionId = await firstValueFrom(
      this.store
        .select(getTransactionIdInCart)
        .pipe(filter((transactionId) => transactionId !== undefined))
    );
    this.observables.push(getFlow);
  }

  onToggleCollapse(key: IKeyCollapsed): void {
    let collapsedComponent = this.collapsedComponent.find(
      (component) => component.key === key
    );
    collapsedComponent!.collapsed = !collapsedComponent!.collapsed;
  }

  onCheckCollapse(key: IKeyCollapsed): boolean {
    return this.collapsedComponent.find((component) => component.key === key)!
      .collapsed;
  }

  getIconChevron(key: IKeyCollapsed): string {
    return this.onCheckCollapse(key) ? 'bi-chevron-down' : 'bi-chevron-up';
  }

  getSummaryPrice(summaryPrice: number) {
    this.summaryPrice = summaryPrice;
  }

  async getProductList() {
    const customer = await firstValueFrom(this.store.select(getCustomerData));
    const user = await firstValueFrom(this.store.select(getUserData));

    if (customer === undefined) {
      this.router.navigate([PathConstant.VALIDATE_CUSTOMER_PAGE]);
      return;
    }

    const cartList = this.cartService
      .getCartList(customer?.mobileNo || '', user?.locationCode || '')
      .subscribe((cartData) => {
        const productSelected = cartData.shift();
        this.productDetail = productSelected;
        this.isAppleCare = !!productSelected?.mobileCare?.isBuyDeviceCare;
      });

    this.observables.push(cartList);
  }

  async savePaymentData(): Promise<void> {
    this.store.dispatch(
      saveUserPaymentData({
        paymentSelected: {
          handsetPayment: {
            paymentMethod: this.handsetPaymentSelected.paymentMethod,
            method: this.handsetPaymentSelected.method,
            paymentType: this.handsetPaymentSelected.paymentType,
            bankNameTh: this.handsetPaymentSelected.bankNameTh,
            bankNameEn: this.handsetPaymentSelected.bankNameEn,
            bankAbbr: this.handsetPaymentSelected.bankAbbr,
            installment: this.handsetPaymentSelected.installment,
            isInstallment: this.handsetPaymentSelected.isInstallment,
            creditCardNo: this.handsetPaymentSelected.creditCardNo,
            remaskCreditCard: this.handsetPaymentSelected.remaskCreditCard,
            contractNo: this.handsetPaymentSelected.contractNo,
            remaskContract: this.handsetPaymentSelected.remaskContract,
          },
          mobileCarePayment: {
            paymentMethod: this.mobileCarePaymentSelected.paymentMethod,
            method: this.mobileCarePaymentSelected.method,
            paymentType: this.mobileCarePaymentSelected.paymentType,
            bankNameTh: this.mobileCarePaymentSelected.bankNameTh,
            bankNameEn: this.mobileCarePaymentSelected.bankNameEn,
            bankAbbr: this.mobileCarePaymentSelected.bankAbbr,
            installment: this.mobileCarePaymentSelected.installment,
            isInstallment: this.mobileCarePaymentSelected.isInstallment,
          },
        },
      })
    );
    await this.updatePaymentSelectedToSharedtransactions();
  }

  async updatePaymentSelectedToSharedtransactions(): Promise<void> {
    let paymentOnlineCredit = false;
    if (
      this.handsetPaymentSelected.method === 'CC' &&
      (this.handsetPaymentSelected.paymentType === 'fullPaid' ||
        this.handsetPaymentSelected.paymentType === 'installment')
    ) {
      paymentOnlineCredit = true;
    }
    if (
      this.mobileCarePaymentSelected.method === 'CC' &&
      (this.mobileCarePaymentSelected.paymentType === 'fullPaid' ||
        this.mobileCarePaymentSelected.paymentType === 'installment')
    ) {
      paymentOnlineCredit = true;
    }
    if (this.handsetPaymentSelected.paymentType === 'fullPaid') {
      this.handsetPaymentSelected.paymentType = 'FULL';
    } else {
      this.handsetPaymentSelected.paymentType.toUpperCase();
    }
    if (this.mobileCarePaymentSelected.paymentType === 'fullPaid') {
      this.mobileCarePaymentSelected.paymentType = 'FULL';
    } else {
      this.mobileCarePaymentSelected.paymentType.toUpperCase();
    }

    const checkPaymentType = this.handsetPaymentSelected.paymentType;
    let checkInstallmentRate = 0;
    let checkInstallmentTerms = 0;
    if (checkPaymentType === 'FULL') {
      checkInstallmentRate = Number(
        this.handsetPaymentSelected?.installment?.installmentRate
      );
      checkInstallmentTerms = Number(
        this.handsetPaymentSelected?.installment?.installmentTerms
      );
    }

    const payment: IPaymentSelected = {
      paymentType: 'CREDIT',
      paymentForm: this.handsetPaymentSelected.paymentType,
      paymentMethod: this.handsetPaymentSelected.method,
      paymentOnlineCredit: paymentOnlineCredit,
      installmentRate: checkInstallmentRate,
      installmentTerms: checkInstallmentTerms,
      paymentBank: {
        name: this.handsetPaymentSelected.bankNameTh,
        abb: this.handsetPaymentSelected.bankAbbr,
        imageUrl: '',
      },
    };
    const deviceCarePayment: IDeviceCarePayment = {
      tranId: '',
      tranDtm: '',
      status: 'WAITING',
      startDtm: '',
      qrType: '',
      orderId: '',
      offerId: '',
      lastUpdate: '',
      paymentMethod: this.mobileCarePaymentSelected.method,
      paymentType: this.productDetail?.device_care_payment?.paymentType || '',
      creditCardNo: '',
      cardExpireDate: '',
      bankAbbr: this.mobileCarePaymentSelected.bankAbbr,
    };
    const paymentSelected = {
      payment: payment,
      deviceCarePayment: deviceCarePayment,
    };
    const updatePayment = this.paymentService
      .updatePaymentSelectedToSharedtransactions(
        this.transactionId || '',
        paymentSelected
      )
      .subscribe();
    this.observables.push(updatePayment);
  }

  onCheckStateButton() {
    const paymentMethodNotSelected = this.isPaymentMethodNotSelected();
    const creditCardNotSelected = this.isCreditCardNotSelected();
    const installmentNotSelected = this.isInstallmentNotSelected();
    const conditionPartnerFlow = this.isConditionPartnerFlow();

    const shouldBeDisabled =
      paymentMethodNotSelected ||
      creditCardNotSelected ||
      installmentNotSelected ||
      conditionPartnerFlow ||
      !this.isReceiptAddressSelected;

    this.buttonState = shouldBeDisabled;
  }

  isPaymentMethodNotSelected() {
    const handsetPaymentNotSelected =
      !this.handsetPaymentSelected.method ||
      (this.isAppleCare && !this.mobileCarePaymentSelected.method);
    return handsetPaymentNotSelected;
  }

  isCreditCardNotSelected() {
    const handsetPayment = this.handsetPaymentSelected;
    const mobileCarePayment = this.mobileCarePaymentSelected;

    const handsetPaymentNotSelected =
      handsetPayment.method === 'CC' && !handsetPayment.bankAbbr;
    const mobileCarePaymentNotSelected =
      this.isAppleCare &&
      mobileCarePayment.method === 'CC' &&
      !mobileCarePayment.bankAbbr;

    return handsetPaymentNotSelected || mobileCarePaymentNotSelected;
  }

  isInstallmentNotSelected() {
    const handsetPayment = this.handsetPaymentSelected;

    const isCreditCardOrLs =
      (this.flow !== 'AIS' && ['CC', 'LS'].includes(handsetPayment.method)) ||
      (this.flow === 'AIS' && handsetPayment.method === 'CC');

    const installmentNotSelected =
      isCreditCardOrLs &&
      handsetPayment.isInstallment &&
      !handsetPayment?.installment?.installmentTerms;

    return installmentNotSelected;
  }

  isConditionPartnerFlow() {
    const isCreditCardOrLs = ['CC', 'LS'].includes(
      this.handsetPaymentSelected.method
    );
    return (
      this.flow !== 'AIS' &&
      isCreditCardOrLs &&
      !this.buttonStateChangeHandset &&
      !this.productDetail.mobileCare?.isBuyDeviceCare
    );
  }

  getHandsetPaymentSelected(paymentSelected: IPayment) {
    this.handsetPaymentSelected = paymentSelected;
    this.onCheckStateButton();
  }

  getMobileCarePaymentSelected(paymentSelected: IPayment) {
    this.mobileCarePaymentSelected = paymentSelected;
    this.onCheckStateButton();
  }

  setSelectedReceiptStatus(isSelectedReceiptAddress: boolean) {
    this.isReceiptAddressSelected = !isSelectedReceiptAddress;
    this.onCheckStateButton();
  }

  getbuttonStateChangePartner(status: boolean) {
    this.buttonStateChangeHandset = status;
    this.onCheckStateButton();
  }

  async createCompentsation() {
    const dataProvision: any = {
      code: '006',
      name: 'createCompensation',
      order: {
        message: 'resultStatus is S',
      },
    };
    try {
      const response = await firstValueFrom(
        this.cartService
          .createCompensation({
            transactionId: this.transactionId,
          })
          .pipe(take(1))
      );
      if (response && response.resultStatus == 'S') {
        this.updateProvisionStep(dataProvision, true, null);
      }
    } catch (error) {
      this.updateProvisionStep(dataProvision, false, error, 'acceptable fail');
      this.isCompentsationIMError = true;
    }
  }

  async createProvisionMobileCare() {
    const dataProvision: any = {
      code: '002',
      name: 'evOMCreateOrderChangeService(MobileCare)',
    };
    try {
      const response = await firstValueFrom(
        this.careService
          .createMobileCare({ transactionId: this.transactionId })
          .pipe(take(1))
      );
      if (response.orderRefId) {
        dataProvision.order = response.orderNo;
        this.updateProvisionStep(dataProvision, true, null);
      }
    } catch (error) {
      this.updateProvisionStep(dataProvision, false, error, 'verify fail');
      this.isCompentsationIMError = true;
    }
  }

  async createActivityIM(): Promise<boolean> {
    const transactionData: any = this.productDetail!;
    const isBuyMobileCare = transactionData.mobileCare
      ? transactionData.mobileCare.isBuyDeviceCare
      : false;
    // default non apple brand
    const requestBody: ICreateActivityRequest = {
      mobileNo: transactionData.simCard.mobileNo,
      channel: 'Walk In',
      status: 'Done',
      username: this.tokenService.getDataToken().username || '',
      comment: '',
      activityCategory: 'AIS Mobile Care - ข้อมูล',
      activitySubCategory: 'ซื้อเครื่องจาก Shop แต่ไม่สมัคร Mobile Care',
      reason: transactionData.mobileCare.reason,
    };

    //case apple brand
    if (
      transactionData &&
      (transactionData.device.brand || '').toLowerCase() === 'apple' &&
      !isBuyMobileCare
    ) {
      requestBody.activityCategory = 'Apple Care Plus และ Mobile Care - ข้อมูล';
      requestBody.activitySubCategory =
        'ซื้อเครื่องจาก Shop แต่ไม่สมัคร Apple Care Plus และ Mobile Care';
    } else {
      requestBody.activityCategory = 'Apple Care Plus - ข้อมูล';
      requestBody.activitySubCategory =
        'ซื้อเครื่องจาก Shop แต่ไม่สมัคร Apple Care Plus';
    }
    let dataProvision: any = {
      code: '002',
      name: 'commonCreateActivity',
    };

    try {
      const response = await firstValueFrom(
        this.careService.createActivityIM(requestBody).pipe(take(1))
      );
      if (
        response.ServiceResponseList &&
        response.ServiceResponseList.ServiceResponse[0] &&
        response.ServiceResponseList.ServiceResponse[0].ServiceCaseID
      ) {
        dataProvision.order =
          response.ServiceResponseList.ServiceResponse[0].ServiceCaseID;
        this.updateProvisionStep(dataProvision, true, null);
      }
    } catch (error) {
      this.updateProvisionStep(dataProvision, false, error, 'verify failed');
      console.error(error);
      this.isCompentsationIMError = true;
    }
    return true;
  }

  updateProvisionStep(
    dataUpdate: any,
    isSuccess: boolean,
    error?: any,
    typeError?: string
  ) {
    const provisionCreateActivity = {
      priority: this.requestProvision.services.length + 1,
      code: dataUpdate.code,
      name: dataUpdate.name,
      status: {
        code: isSuccess ? '001' : '002',
        description: isSuccess ? 'success' : typeError,
        error: error,
        order: dataUpdate.order,
      },
      issue_date: Moment().format(),
    };
    this.requestProvision.services.push(provisionCreateActivity);
  }

  async updateTransaction(): Promise<boolean> {
    const reqUpdateTran = {
      'DATA.provision': this.requestProvision,
      'DATA.status.code': '008',
      'DATA.status.description': this.isCompentsationIMError
        ? 'submitted transaction'
        : 'complete transaction',
    };
    const response = await firstValueFrom(
      this.cartService
        .updateTransaction(this.transactionId, reqUpdateTran)
        .pipe(take(1))
    );
    this.isLoading = false;
    return response && true;
  }

  async getTransaction(): Promise<void> {
    this.store
      .select(getSelectedAddress)
      .pipe(take(1))
      .subscribe((address) => {
        this.selectedAddress = address;
      });
    const transaction = this.productDetail;
    const reqOderList = this.sharedService.onMapReqCreateOrderList(
      transaction,
      this.selectedAddress,
      this.flow
    );
    await this.createOrderlist(
      reqOderList,
      transaction?.transactionId,
      transaction
    );
  }

  async createOrderlist(
    reqOrderList: IOrderList,
    transactionId: string,
    customerData: any
  ): Promise<boolean> {
    const response = await firstValueFrom(
      this.paymentService.createOrderList(reqOrderList)
    );

    const reqUpdateTrans = {
      'DATA.status': {
        code: '002',
        description: 'Waiting Payment',
      },
      'DATA.receipt': {
        customer: {
          firstName: customerData?.firstName || '',
          lastName: customerData?.lastName || '',
          homeNo: this.selectedAddress?.houseNo || '',
          moo: this.selectedAddress?.moo || '',
          mooban: this.selectedAddress?.mooban || '',
          buildingName: this.selectedAddress?.building || '',
          floor: this.selectedAddress?.floor || '',
          room: this.selectedAddress?.room || '',
          soi: this.selectedAddress?.soi || '',
          streetName: this.selectedAddress?.street || '-',
          tumbon: this.selectedAddress?.tumbol || '',
          amphur: this.selectedAddress?.amphur || '',
          province: this.selectedAddress?.province || '',
          country:
            this.selectedAddress?.engFlag != 'N' ? 'ประเทศไทย' : 'ต่างประเทศ',
          zipCode: this.selectedAddress?.zipCode || '',
        },
      },
    };
    if (response && response.resultCode === 'S') {
      const responseSharedTran = await firstValueFrom(
        this.cartService.updateTransaction(transactionId, reqUpdateTrans)
      );
      this.createOrderlistSuccess = responseSharedTran.message === 'Success';
    } else {
      this.isLoading = false;
      // this.errorService.handleError({
      //   customMessage: response.developerMessage,
      // });
    }
    return true;
  }

  async onNext() {
    this.isLoading = true;
    const isSelectedAppleCare = this.productDetail?.mobileCare?.isBuyDeviceCare;
    const isSelectedAISMobileCare =
      this.productDetail?.mobileCare?.title?.includes('AIS Mobile Care');
    await this.savePaymentData();
    if (this.flow === 'PARTNER') {
      if (
        this.sharedService?.checkDevice()?.isTabletDevice &&
        isSelectedAppleCare
      ) {
        this.router.navigate([PathConstant.GEN_QUEUE_PAGE]);
      } else {
        await this.getTransaction();
        this.createOrderlistSuccess = true;
        if (this.createOrderlistSuccess) {
          if (isSelectedAppleCare) {
            this.onLinkToAspCounter();
          } else if (isSelectedAISMobileCare) {
            await this.createProvisionMobileCare();
          } else {
            await this.createActivityIM();
          }
          await this.createCompentsation();
          await this.updateTransaction();
          this.router.navigate([
            isSelectedAppleCare
              ? PathConstant.GEN_QUEUE_PAGE
              : PathConstant.SUCCESS_PARTNER_PAGE,
          ]);
        }
      }
    } else {
      if (!this.productDetail?.main_promotion?.campaign?.conditionCode) {
        this.router.navigate([PathConstant.GEN_QUEUE_PAGE]);
      } else {
        this.router.navigate([PathConstant.CAPTURE_ID_CARD]);
      }
      this.isLoading = false;
    }
  }

  onLinkToAspCounter() {
    window.location.href = `/web/sales-order/device-care-payment?transactionId=${this.transactionId}`;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
