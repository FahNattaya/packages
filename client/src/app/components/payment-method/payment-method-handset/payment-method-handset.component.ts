import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import {
  ICollapsedPaymentType,
  IPaymentBank,
  IPaymentInstallment,
  IPaymentResponse,
  IPayment,
  ITabsPayment,
  ICheckCardInfo,
  IPaymentMethod,
} from 'src/app/shared/model/payment.model';
import { getDataState } from 'src/app/store-ngrx/selectors/payments.selectors';
import {
  loadLoanAddress,
  loadPaymentData,
  selectedLoanAddress,
} from 'src/app/store-ngrx/actions/payments.action';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenService } from 'src/app/core/service/token.service';
import { PaymentService } from 'src/app/shared/service/payment.service';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';
import { messageConstant } from 'src/app/shared/constant/message.constant';
import { ITrades } from 'src/app/shared/model/promotion.model';
import { IDeviceCart, IPromotionsCart } from 'src/app/shared/model/cart.model';
import { ISellerAll } from 'src/app/shared/model/seller.model';

@Component({
  selector: 'app-payment-method-handset',
  templateUrl: './payment-method-handset.component.html',
  styleUrls: [
    './payment-method-handset.component.scss',
    '../payment-method.component.scss',
  ],
})
export class PaymentMethodHandsetComponent implements OnInit, OnChanges {
  @Input() onToggleCollapse!: (key: ICollapsedPaymentType) => void;
  @Input() getIconChevron!: (key: ICollapsedPaymentType) => string;
  @Input() onCheckCollapse!: (key: ICollapsedPaymentType) => boolean;
  @Input() productDetail!: any;
  @Output() paymentSelected: EventEmitter<IPayment> =
    new EventEmitter<IPayment>();
  @Output() tabSelected: EventEmitter<ITabsPayment> =
    new EventEmitter<ITabsPayment>();
  @Output() buttonStateChangeHandset: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  destroyed$: Subject<void> = new Subject();
  userPaymentSelected: IPayment = {
    paymentType: 'counter',
    method: '',
    paymentMethod: '',
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
  };
  totalNetPrice: number = 0;
  selectedTab: ITabsPayment = 'counter';
  selectedPaymentType: string = '';
  selectedPaymentMethod: string = '';
  currentBankData: IPaymentBank[] = [];
  currentInstallmentData: IPaymentInstallment[] = [];
  allPaymentData: IPaymentResponse = {
    statusCode: '',
    statusDesc: '',
    payments: [],
  };
  resQueryCardInfo: ICheckCardInfo = {
    resultCode: '',
    resultDescription: '',
    developerMessage: '',
    prefixCard: '',
    paymentMethod: '',
    cardCategory: '',
    bankCode: '',
    bankNameTh: '',
    bankNameEn: '',
    bankAbbr: '',
    cardType: '',
  };
  isLoading: boolean = true;
  creditCardNoForm: FormGroup;
  contractNo = new FormControl('');
  remark = new FormControl('');
  creditCardNo = Array(16).fill(0);
  locationCode: string = '';
  isBuyAppleCare: boolean = false;

  messageCheckLesing: string = '';
  checkLesingAlertSuccess: boolean = false;
  contractLength = 0;
  subscription: any;


  paymentDataState$ = this.store.select(getDataState);

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private paymentService: PaymentService
  ) {
    this.creditCardNoForm = this.fb.group({});
  }

  flow: string = '';
  cardDigi: number = 0;
  async ngOnInit(): Promise<void> {
    this.initCreditCardInput();
    this.locationCode = this.tokenService.getDataToken().locationCode;
    this.selectedPaymentType = 'none';
    this.store.select(getOutChCustData).subscribe((config) => {
      if (config) {
        this.flow = config.Flow;
      }
    });
    this.subscription = this.contractNo.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map((value) => (value ? value.length : 0))
      )
      .subscribe((length) => {
        this.contractLength = length;
        this.validateContractLength();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productDetail'].currentValue) {
      const productDetail = changes['productDetail'].currentValue;
      const main_promotion: IPromotionsCart = productDetail?.main_promotion;
      const device: IDeviceCart = productDetail?.device;
      const transactionType: string = productDetail?.transactionType;
      console.log('productDetail', productDetail);

      const campaign = this.productDetail?.main_promotion?.campaign;
      this.isBuyAppleCare =
        productDetail?.mobileCare?.isBuyDeviceCare || false;
      console.log('this.isBuyAppleCare', this.isBuyAppleCare);

      this.totalNetPrice = Number(campaign?.netPrice?.replace(/,/g, ''));

      if (this.flow !== 'AIS') {
        this.getPaymentsPartner(main_promotion, device, transactionType);
      } else {
        this.getPaymentShop(main_promotion?.trade);
      }

      this.isLoading = false;
    }
  }

  getPaymentShop(trade: ITrades) {
    this.store.dispatch(
      loadPaymentData({
        tradeProductId: +trade?.tradeProductId,
        tradeNo: trade.tradeNo,
        locationCode: this.locationCode,
      })
    );
    this.paymentDataState$.subscribe((data) => {
      if (data && data.isLoaded) {
        this.allPaymentData = data.dataPayments;
      }
    });
  }

  getPaymentsPartner(
    main_promotion: IPromotionsCart,
    device: IDeviceCart,
    transactionType: string
  ) {
    const tokenData: ISellerAll = this.tokenService.getDataToken();
    this.paymentService
      .getPaymentForPartner({
        brand: device.brand,
        model: device.model,
        color: device.colorName,
        netprice: main_promotion.campaign?.netPrice.replace(',', ''),
        installment: main_promotion.campaign?.installmentFlag,
        isdevileonly: transactionType === 'DeviceOnlyAIS' ? 'N' : 'Y',
        tradeProductId: main_promotion.trade.tradeProductId,
        tradeNo: main_promotion.trade?.tradeNo,
        locationCode: tokenData.locationCode,
        outChnSalesCode: tokenData.outChnSalesCode,
      })
      .subscribe((data) => {
        if (data) {
          this.allPaymentData = data;
        }
      });
  }

  onChangeTab(tab: ITabsPayment) {
    this.selectedTab = tab;
  }

  onPaymentMethodSelect(method: string) {
    if (method === 'LS') {
      this.store.dispatch(
        loadLoanAddress({ loadType: 'kbj', isSelected: true })
      );
    } else {
      this.store.dispatch(selectedLoanAddress({ isSelected: false }));
    }
    this.selectedPaymentType = '';
    this.currentBankData = [];
    this.currentInstallmentData = [];
    this.selectedPaymentMethod = method;
    this.userPaymentSelected.method = method;
    this.userPaymentSelected.bankNameEn = '';
    this.userPaymentSelected.bankNameTh = '';
    this.userPaymentSelected.bankAbbr = '';
    // this.cleanForm();
    this.buttonStateChangeHandset.emit(false);
    this.emitPaymentSelected();
  }

  isPaymentMethodExist(type: string, indexPayment: number): boolean {
    const payment = this.allPaymentData.payments[indexPayment];
    const isFullPaid =
      payment.banksFullPaid?.length !== 0 && type === 'fullPaid';
    const isInstallment =
      payment.banksInstallment?.length !== 0 && type == 'installment';

    return isFullPaid || isInstallment;
  }

  onPaymentTypeSelect(paymentType: string, indexPayment: number) {
    this.onUpdateBank('', '', '');
    this.currentInstallmentData = [];
    this.selectedPaymentType = paymentType;
    const payment = this.allPaymentData.payments[indexPayment];

    if (paymentType == 'fullPaid') {
      this.userPaymentSelected.isInstallment = false;
      this.currentBankData = payment.banksFullPaid ?? [];
    } else if (paymentType == 'installment') {
      this.userPaymentSelected.isInstallment = true;
      this.currentBankData = payment.banksInstallment ?? [];
    }
    this.userPaymentSelected.paymentType = paymentType;
    this.emitPaymentSelected();
  }

  onSelectBankFullPaid(indexPayment: number) {
    this.userPaymentSelected.installment =
      this.currentInstallmentData[indexPayment];
    this.cardDigi = this.currentInstallmentData[indexPayment]?.cardDigits || 0;
    this.onNextCondition();
    this.getCreditCardNumber();
    this.emitPaymentSelected();
  }

  onUpdateBank(bankDescTh: string, bankDescEn: string, bankAbbr: string) {
    this.userPaymentSelected.bankNameTh = bankDescTh;
    this.userPaymentSelected.bankNameEn = bankDescEn;
    this.userPaymentSelected.bankAbbr = bankAbbr;
    this.cleanForm();
    this.emitPaymentSelected();
  }

  getPayment(method: string, indexPayment: number): IPaymentBank[] {
    const payment = this.allPaymentData.payments[indexPayment];
    if (method == 'fullPaid') {
      return payment.banksFullPaid ?? [];
    } else {
      return payment.banksInstallment ?? [];
    }
  }

  onSelectBankInstallment(index: number) {
    this.cardDigi = 0;
    this.onCheckLesingLength();
    this.currentInstallmentData = this.currentBankData[index].installments;
    this.userPaymentSelected.bankNameTh =
      this.currentBankData[index].bankDescTh;
    this.userPaymentSelected.bankNameEn =
      this.currentBankData[index].bankDescEn;

    this.emitPaymentSelected();
  }

  emitPaymentSelected(): void {
    this.userPaymentSelected.paymentMethod = this.selectedTab;
    this.paymentSelected.emit(this.userPaymentSelected);
  }

  initCreditCardInput() {
    for (let i = 0; i < this.creditCardNo.length; i++) {
      this.creditCardNoForm.addControl(
        i.toString(),
        this.fb.control('', [Validators.required, Validators.maxLength(1)])
      );
    }
    for (let index = 6; index < 12; index++) {
      this.creditCardNoForm.controls[index.toString()].disable();
      this.creditCardNoForm.controls[index.toString()].patchValue('X');
    }
  }

  messageCheckCreditCardNo = '';
  focusNext(event: KeyboardEvent, index: number) {
    setTimeout(() => {
      this.onNextCondition();
      this.getCreditCardNumber();
      if (event.key === 'Backspace') {
        if (index !== 0) {
          if (index === 12) {
            this.otpInputs.toArray()[5].nativeElement.focus();
            return;
          }
          this.otpInputs.toArray()[index - 1].nativeElement.focus();
        }
      } else {
        if (isNaN(Number(event.key))) {
          this.creditCardNoForm.controls[index.toString()].patchValue('');
          return;
        }
        this.creditCardNoForm.controls[index.toString()].patchValue(event.key);
        if (index < this.creditCardNo.length - 1) {
          if (index == 5) {
            this.otpInputs.toArray()[12].nativeElement.focus();
            return;
          }
          this.otpInputs.toArray()[index + 1].nativeElement.focus();
        }
      }
    });
  }

  checkCreditCardLength: boolean = false;
  checkLeasingLength: boolean = false;

  onNextCondition() {
    if (this.contractNo.value!.length >= this.cardDigi) return;
    this.checkCreditCardLength =
      this.userPaymentSelected.method == 'CC' &&
      Object.values(this.creditCardNoForm.value).join('').length === 10 &&
      this.checkCreditCardAlertSuccess;
    this.checkLeasingLength =
      this.userPaymentSelected.method === 'LS' &&
      (this.contractNo.value!.length + 1 === this.cardDigi ||
        this.userPaymentSelected.paymentType === 'fullPaid');

    this.onCheckLesingLength();
    if (this.checkCreditCardLength || this.checkLeasingLength) {
      this.buttonStateChangeHandset.emit(true);
      return;
    }
    this.buttonStateChangeHandset.emit(false);
  }

  onCheckLesingLength() {
    if (this.userPaymentSelected.method !== 'LS' || this.flow === 'AIS') return;
    this.validateContractLength();
  }

  validateContractLength() {
    if (this.contractLength !== this.cardDigi) {
      this.checkLesingAlertSuccess = false;
      this.messageCheckLesing = `กรุณากรอกเลขสัญญา ${this.cardDigi} ตัว (${this.contractLength})`;
    } else {
      this.checkLesingAlertSuccess = true;
      this.messageCheckLesing =
        messageConstant.SUCCESS_PAYMENT_LS_CONTRACT_NUMBER;
    }
  }

  prefix: string = '';
  getCreditCardNumber() {
    const prefixNew = Object.values(this.creditCardNoForm.value)
      .slice(0, 6)
      .join('');

    if (this.prefix === prefixNew) {
      return;
    }

    this.prefix = prefixNew;

    if (!isNaN(Number(prefixNew)) && prefixNew.length === 6) {
      this.checkCreditCardInfo(prefixNew, 'CREDIT');
    }
  }

  checkCreditCardAlertSuccess: boolean = false;
  checkCreditCardInfo(prefixCard: string, cardCategory: string) {
    this.paymentService
      .checkQueryCardInfo(prefixCard, cardCategory)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response: ICheckCardInfo) => {
        if (response?.bankAbbr === this.userPaymentSelected?.bankAbbr) {
          this.checkCreditCardAlertSuccess = true;
          this.resQueryCardInfo = response;
          this.messageCheckCreditCardNo = response.bankAbbr!;
        } else {
          this.checkCreditCardAlertSuccess = false;
          this.messageCheckCreditCardNo =
            messageConstant.ERROR_PAYMENT_CREDIT_CARD_BANK_NOT_MATCH;
        }
      });
  }

  cleanForm() {
    for (let index = 0; index < 16; index++) {
      if (index < 6 || index > 11) {
        this.creditCardNoForm.controls[index.toString()].patchValue('');
      }
    }
    this.contractNo.patchValue('');
    this.remark.patchValue('');
    this.messageCheckCreditCardNo = '';
    this.messageCheckLesing = '';
    this.userPaymentSelected.installment = {
      installmentId: 0,
      installmentRate: '',
      installmentTerms: '',
      balloonMonth: 0,
      cardDigits: 0,
    };
    this.onNextCondition();
  }

  assetsFileImageError(paymentMethod: IPaymentMethod): void {
    paymentMethod.methodName = 'Cash';
  }

  urlImageError(payment: IPaymentBank): void {
    payment.imageUrl = '';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.subscribe();
    this.subscription.unsubscribe();
  }
}
