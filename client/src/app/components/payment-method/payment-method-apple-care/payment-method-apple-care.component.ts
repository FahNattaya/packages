import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ICollapsedPaymentType,
  IPaymentBank,
  IPaymentInstallment,
  IPaymentResponse,
  IPayment,
  ITabsPayment,
} from 'src/app/shared/model/payment.model';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { TokenService } from 'src/app/core/service/token.service';
@Component({
  selector: 'app-payment-method-apple-care',
  templateUrl: './payment-method-apple-care.component.html',
  styleUrls: [
    './payment-method-apple-care.component.scss',
    '../payment-method.component.scss',
  ],
})
export class PaymentMethodAppleCareComponent {
  @Input() onToggleCollapse!: (key: ICollapsedPaymentType) => void;
  @Input() getIconChevron!: (key: ICollapsedPaymentType) => string;
  @Input() onCheckCollapse!: (key: ICollapsedPaymentType) => boolean;
  @Input() productDetail!: any;
  @Output() paymentSelected: EventEmitter<IPayment> =
    new EventEmitter<IPayment>();
  @Output() tabSelected: EventEmitter<ITabsPayment> =
    new EventEmitter<ITabsPayment>();
  selectedTab: ITabsPayment = 'counter';
  allPaymentData: IPaymentResponse = {
    statusCode: '',
    statusDesc: '',
    payments: [],
  };

  userPaymentSelected: IPayment = {
    paymentMethod: 'counter',
    method: '',
    paymentType: '',
    bankNameTh: '',
    bankNameEn: '',
    bankAbbr: '',
    installment: {} as any,
    isInstallment: false,
  };
  totalNetPrice: number = 0;
  selectedPaymentType: string = '';
  selectedPaymentMethod: string = '';
  currentBankData: IPaymentBank[] = [];
  currentInstallmentData: IPaymentInstallment[] = [];

  constructor(
    private payment: PaymentService,
    private tokenService: TokenService
  ) { }

  async ngOnInit(): Promise<void> {
    let locationCode: string = '';
    locationCode = this.tokenService.getDataToken().locationCode;
    this.payment.getPaymentAppleCare(locationCode).subscribe((data) => {
      this.allPaymentData.payments = data.payments;
    });
    this.getTotalNetPrice()
  }

  getTotalNetPrice() {
    if (this.productDetail.mobileCare?.isBuyDeviceCare) {
      this.totalNetPrice = Number((this.productDetail?.device_care_payment?.amount || '0').replace(
        /,/g,
        ''
      ))
      return
    }
    this.totalNetPrice = 0
  }

  onChangeTab(tab: ITabsPayment) {
    this.selectedTab = tab;
  }

  onPaymentMethodSelect(method: string) {
    this.selectedPaymentType = '';
    this.currentBankData = [];
    this.currentInstallmentData = [];
    this.selectedPaymentMethod = method;
    this.userPaymentSelected.method = method;
    this.userPaymentSelected.paymentType = 'fullPaid';
    this.userPaymentSelected.bankNameEn = '';
    this.userPaymentSelected.bankNameTh = '';
    this.userPaymentSelected.bankAbbr = '';

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
    this.currentInstallmentData = [];
    this.selectedPaymentType = paymentType;
    const payment = this.allPaymentData.payments[indexPayment];

    if (paymentType == 'fullPaid') {
      this.currentBankData = payment.banksFullPaid ?? [];
    } else if (paymentType == 'installment') {
      this.currentBankData = payment.banksInstallment ?? [];
      this.userPaymentSelected.paymentType = 'installment';
    }
  }

  onSelectBankFullPaid(indexPayment: number) {
    this.userPaymentSelected.installment =
      this.currentInstallmentData[indexPayment];
  }

  onUpdateBank(bankDescTh: string, bankDescEn: string, bankAbbr: string) {
    this.userPaymentSelected.bankNameTh = bankDescTh;
    this.userPaymentSelected.bankNameEn = bankDescEn;
    this.userPaymentSelected.bankAbbr = bankAbbr;
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

  getInstallment(index: number) {
    this.currentInstallmentData = this.currentBankData[index].installments;
    this.userPaymentSelected.bankNameTh =
      this.currentBankData[index].bankDescTh;
    this.userPaymentSelected.bankNameEn =
      this.currentBankData[index].bankDescEn;
  }

  emitPaymentSelected(): void {
    this.userPaymentSelected.paymentMethod = this.selectedTab;
    this.paymentSelected.emit(this.userPaymentSelected);
  }

  getImageSource(methodName: any): string {
    const imagePath = `assets/images/${methodName}.png`;
    const img = new Image();
    img.src = imagePath;
    if (
      img.complete &&
      methodName === 'CC' &&
      methodName === 'CA' &&
      methodName === 'LS'
    ) {
      return imagePath;
    } else {
      return 'assets/images/Cart.png';
    }
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/Cart.png';
  }
}
