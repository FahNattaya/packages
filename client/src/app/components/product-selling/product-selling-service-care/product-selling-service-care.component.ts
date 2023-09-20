import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  Subscription,
  firstValueFrom,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import { IVerifyingOtpRequest } from 'src/app/shared/model/customer.model';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { ServiceCareService } from 'src/app/shared/service/service-care.service';
import { loadCustomerDataByPhone } from 'src/app/store-ngrx/actions/customer.action';
import { ICustomerState } from 'src/app/store-ngrx/reducers/customer.reducer';
import { getCustomerDataState } from 'src/app/store-ngrx/selectors/customer.selectors';
import {
  ILimitCare,
  IMobileCare,
  IExistingMobileCare,
  IMobileCareRequest,
  IMobileCareSelected,
  IMobileCareServiceTypeOption,
  IOrderFees,
} from '../../../shared/model/service-care.model';
import { AppState } from '../../../store-ngrx/app.state';
import { getSelectProduct } from '../../../store-ngrx/selectors/product.selectors';
import { ErrorService } from 'src/app/core/service/error.service';
import * as moment from 'moment';

const SEND_OTP = 'Send OTP';

@Component({
  selector: 'app-mobile-care',
  templateUrl: './product-selling-service-care.component.html',
  styleUrls: ['./product-selling-service-care.component.scss'],
})
export class ProductSellingServiceCareComponent implements OnChanges {
  @Input() isCart: boolean = false;
  @Input() productEditable?: any;
  @Output() selectedChange = new EventEmitter();
  @Output() mobileCareForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() limitCareService = new EventEmitter();
  @ViewChild('packageIsLimit') packageModal?: ElementRef;

  existingMobileCareServices: IExistingMobileCare[] = [];
  isDisableMobileCare: boolean = true;
  transactionIdOtp: string = '';

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private serviceCareService: ServiceCareService,
    private customerService: CustomerService,
    private errorService: ErrorService
  ) {
    this.formMobileCare = this.formBuilder.group({
      serviceType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: [''],
      otpCode: [''],
    });
    this.formIgnoreCase = this.formBuilder.group({
      serviceType: ['', Validators.required],
      reason: ['ไม่สนใจ', Validators.required],
    });
  }

  isCollapsed: boolean = false;
  isLoading: boolean = false;
  isLimitCare: boolean = false;
  formMobileCare!: FormGroup;
  formIgnoreCase!: FormGroup;
  mobileCareData$!: IMobileCare[];
  productDetailData$ = this.store.select(getSelectProduct);
  notInterestWord = 'ไม่สนใจ';
  currentService: number = -1;
  productType: string = '';
  isBuyCare = false;
  selectServiceType: string | null = null;
  heightOfServiceTypeValue = 190;
  mobileCareService: IMobileCare[] | undefined = [];
  mobileCareRequest: IMobileCareRequest = {};
  selectedMobileCare!: IMobileCareSelected;
  textSendOtp: string = SEND_OTP;
  counter = 300;
  isSendedOtp = false;
  countDown: Subscription | any;
  milliSec = 1000;
  disabled = true;
  numberShowData = 10;
  isEnableVerifyOtp = true;
  dataCustomerStore$: Observable<ICustomerState> =
    this.store.select(getCustomerDataState);
  destroyed$: Subject<void> = new Subject();
  notInterest = [
    'ราคาเครื่องถูกอยู่แล้ว',
    'รักษาเครื่องดีอยู่แล้ว',
    'เปลี่ยนเครื่องบ่อย',
    'ค่าบริการสูงเกินไป',
    'ยังไม่ตัดสินใจ',
    'ไม่สะดวกแจ้งเหตุผล',
  ];
  limitCare: ILimitCare = {
    limitCareList: {
      productName: '',
      packageName: '',
      packagePrice: '',
    },
    displayStatus: false,
  };
  date: Date = new Date();

  async ngOnInit(): Promise<void> {
    if (!this.isCart) {
      this.productDetailData$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((response) => {
          this.mobileCareRequest = {
            ...this.mobileCareRequest,
            handsetPrice: response?.normalPrice,
            language: 'TH',
            productType: response?.productType,
            productSubType: response?.productSubtype,
            brand: response?.brand,
            model: response?.model,
            productName: response?.productName,
            activeDate: moment(this.date).format('DD/MM/YYYY'),
          };
          this.onGetMobileCare();
        });
    }
    this.formMobileCare.get('serviceType')?.valueChanges.subscribe((_) => {
      setTimeout(() => {
        if (this.productType) {
          if (
            this.productType === 'AIS Mobile Care' ||
            this.productType === 'AIS Care Plus'
          ) {
            this.formMobileCare
              .get('mobileNo')
              ?.addValidators([Validators.required]);
            this.formMobileCare
              .get('otpCode')
              ?.addValidators([Validators.required]);
          } else if (this.productType.split(' ')[0] === 'AppleCare+') {
            this.formMobileCare
              .get('mobileNo')
              ?.removeValidators(Validators.required);
            this.formMobileCare
              .get('otpCode')
              ?.removeValidators(Validators.required);
            this.formMobileCare.get('mobileNo')?.patchValue('');
            this.formMobileCare.get('otpCode')?.patchValue('');
          }
          this.formMobileCare.get('mobileNo')?.updateValueAndValidity();
          this.formIgnoreCase.get('otpCode')?.updateValueAndValidity();
          this.emitFormsValid();
        }
      });
    });
  }

  showCountdown() {
    this.countDown = timer(0, this.milliSec)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        this.isSendedOtp = true;
        this.textSendOtp = this.transformTime(this.counter) + ' (s)';
        if (this.counter == 0) {
          this.isSendedOtp = false;
          this.textSendOtp = SEND_OTP;
          this.countDown.unsubscribe();
        }
      });
  }

  validateCustomer() {
    let mobileNo = this.formMobileCare.get('mobileNo')?.value || '';
    this.store.dispatch(loadCustomerDataByPhone({ mobileNo: mobileNo }));
    this.subscribeValidate();
  }

  subscribeValidate() {
    this.dataCustomerStore$
      .pipe(take(2))
      .subscribe(this.checkStatus.bind(this));
  }

  checkStatus(data: any) {
    if (data.isLoaded && data.isError) {
      const mobileNo = this.formMobileCare.get('mobileNo')?.value;
      this.isSendedOtp = false;
      this.isEnableVerifyOtp = true;
      this.textSendOtp = SEND_OTP;
      this.errorService.handleError({
        customMessage: mobileNo
          ? 'เบอร์นี้ไม่ใช่เบอร์ AIS กรุณาเปลี่ยนเบอร์ใหม่'
          : 'กรุณากรอกเบอร์โทรศัพท์',
      });
    } else if (data.isLoaded) {
      this.isEnableVerifyOtp = false;
      this.showCountdown();
      this.sendOtp();
    }
  }

  sendOtp(): void {
    const firstIndex = 1;
    let mobileNo = this.formMobileCare.get('mobileNo')?.value || '';
    mobileNo = mobileNo.substring(firstIndex, mobileNo.length);
    this.customerService
      .sendOtp(mobileNo)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isEnableVerifyOtp = false;
          this.transactionIdOtp = res.transactionID;
        },
        error: (err) => {
          if (err) {
            this.errorService.handleError({
              customMessage: 'รหัส OTP ไม่ถูกต้อง กรุณาระบุใหม่อีกครั้ง',
            });
            this.isSendedOtp = false;
            this.textSendOtp = SEND_OTP;
            this.countDown.unsubscribe();
          }
        },
      });
  }

  closePackageModal() {
    const modalElement = this.packageModal?.nativeElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }

  async verifyOtp() {
    if (this.formMobileCare.get('otpCode')?.value == '0000') {
      if (await this.checkCurrentMobileCares()) {
        this.errorService.handleError({
          customMessage: 'ยืนยันสิทธิ สำเร็จ',
          isSuccessAlert: true,
        });
        this.limitCareService.emit(false);
        this.isLimitCare = false;
        this.isEnableVerifyOtp = true;
      } else {
        this.limitCareService.emit(true);
        this.isLimitCare = true;
        this.isEnableVerifyOtp = true;
        this.countDown.unsubscribe();
        const modalElement = this.packageModal?.nativeElement;
        if (modalElement) {
          modalElement.classList.add('show');
          modalElement.style.display = 'block';
        }
      }
      this.isSendedOtp = false;
      this.textSendOtp = SEND_OTP;
      this.countDown.unsubscribe();
      return;
    }
    let firstIndex = 1;
    let mobileNo = this.formMobileCare.get('mobileNo')?.value || '';
    mobileNo = mobileNo.substring(firstIndex, mobileNo.length);
    let body: IVerifyingOtpRequest = {
      msisdn: mobileNo,
      pwd: this.formMobileCare.get('otpCode')?.value || '',
      transactionID: this.transactionIdOtp || '',
    };

    this.customerService
      .verifyOtp(body)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res.isSuccess !== 'true') {
            this.errorService.handleError({
              customMessage: 'รหัส OTP ไม่ถูกต้อง กรุณาระบุใหม่อีกครั้ง',
            });
            return;
          }
          this.checkCurrentMobileCares();
          this.countDown.unsubscribe();
        },
        error: (err) => {
          if (err) {
            this.errorService.handleError({
              customMessage: 'ระบบ OTP ไม่สามารถทำงานได้ในขณะนี้',
            });
          }
        },
      });
  }

  async checkCurrentMobileCares() {
    let maxLimit = await this.getCurrentLimitMobileCare();
    this.existingMobileCareServices = await this.updateMobileCareData();
    if (this.existingMobileCareServices.length >= maxLimit) {
      const modalElement = this.packageModal?.nativeElement;
      if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
      }
      return false;
    }
    return true;
  }

  transformTime(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isCart && changes['productEditable'].currentValue) {
      this.isLoading = true;
      const productEditable = changes['productEditable'].currentValue;
      this.mobileCareRequest = {
        ...this.mobileCareRequest,
        handsetPrice: productEditable?.netPrice?.toString(),
        language: 'TH',
        productType: 'DEVICE',
        productSubType: 'HANDSET',
        brand: productEditable?.brand,
        model: productEditable?.model,
        productName: productEditable?.productName,
        activeDate: moment(this.date).format('DD/MM/YYYY'),
      };
      if (productEditable.mobileCare.promotionCode) {
        this.formMobileCare.patchValue({
          serviceType: productEditable.mobileCare.promotionCode,
        });
      } else {
        this.formIgnoreCase.patchValue({
          serviceType: this.notInterestWord,
        });
      }
      this.onGetMobileCare();
    }
  }

  emitFormsValid() {
    const isValid = this.formMobileCare.valid || this.formIgnoreCase.valid;
    this.mobileCareForm.emit(isValid);
    this.selectedChange.emit(this.selectedMobileCare);
  }

  onSetDataEditable() {
    this.isLoading = false;
    const mobileCareEditable = this.productEditable?.mobileCare;
    let email = '';
    if (this.productEditable?.mobileCare.hasOwnProperty('email')) {
      email = this.productEditable?.mobileCare.email;
    }
    console.log('in onSetDataEditable', mobileCareEditable);

    if (mobileCareEditable.title) {
      const isAppleCare = mobileCareEditable?.isBuyDeviceCare;
      const isAisCare = mobileCareEditable?.title === 'AIS Mobile Care';
      this.isBuyCare = isAppleCare || isAisCare;
      this.productType = mobileCareEditable!.productType;
      this.currentService = isAppleCare ? 0 : isAisCare ? 1 : -1;

      this.onSelectServiceType(
        mobileCareEditable!.title,
        mobileCareEditable!.option,
        mobileCareEditable!.productType,
        mobileCareEditable!.email,
        mobileCareEditable!.orderFees[0] || {}
      );
      console.log('isAppleCare', isAppleCare);
      console.log('isAisCare', isAisCare);
      if (isAppleCare || isAisCare) {
        this.formIgnoreCase.reset();
        this.formMobileCare.patchValue({
          mobileNo: this.productEditable?.simCard.mobileNo,
          otpCode: '',
          email: email,
          serviceType: this.productEditable?.mobileCare?.customAttributes?.promotionCode || '',
        });
        this.isCollapsed = true;
      }
    } else {
      this.formMobileCare.reset();
      this.formIgnoreCase.setValue({
        serviceType: 'ไม่สนใจ',
        reason: mobileCareEditable?.reason,
      });
    }
    this.selectedChange.emit(this.selectedMobileCare);
  }

  onGetMobileCare() {
    this.serviceCareService
      .getMobileCare(this.mobileCareRequest)
      .subscribe((mobileCareResponse) => {
        const mobileCare = mobileCareResponse?.filter(
          (mobileCare: any) => !!mobileCare.productType
        );
        this.mobileCareData$ = mobileCare;
        this.heightOfServiceType(mobileCare);
        this.isCart && this.onSetDataEditable();
      });
  }

  onSelectedService(
    indexService: number,
    service: IMobileCare,
    serviceType: IMobileCareServiceTypeOption,
    orderFees?: IOrderFees
  ) {
    this.formIgnoreCase.reset();
    this.isBuyCare = true;
    this.productType = service.productType;
    this.currentService = indexService;
    this.onSelectServiceType(
      service.serviceType.title,
      serviceType,
      service.productType,
      service.crossMatCode || '',
      orderFees || {}
    );
  }

  onSelectServiceType(
    title: string,
    option: IMobileCareServiceTypeOption,
    productType: string,
    crossMatCode?: string,
    orderFees?: any
  ) {
    this.formMobileCare.patchValue({
      email: null,
    });
    if (productType === 'AppleCare+' || this.formIgnoreCase.valid) {
      this.limitCareService.emit(false);
    } else if (productType === ' AIS Care Plus' || this.isLimitCare) {
      this.limitCareService.emit(true);
    }
    this.selectedMobileCare = {
      ...this.selectedMobileCare,
      productType: productType,
      title: title,
      option: option,
      email: this.formMobileCare.get('email')?.value || '',
      matCodeCarePlus: crossMatCode ? crossMatCode : '',
      orderFees: orderFees,
    };
  }
  onChangeEmail() {
    this.selectedMobileCare = {
      ...this.selectedMobileCare,
      email: this.formMobileCare.get('email')?.value,
    };
    this.emitFormsValid();
  }

  onSelectNotInterest() {
    const option = {
      name: this.formIgnoreCase.get('reason')?.value,
      price: '',
      promotionCode: '',
      offeringCode: '',
    };
    this.limitCareService.emit(false);
    this.onSelectServiceType('', option, this.notInterestWord);
    this.emitFormsValid();
  }

  onSelectIgnore() {
    this.formMobileCare.reset();
    this.formIgnoreCase.patchValue({
      serviceType: this.notInterestWord,
    });
    this.currentService = -1;
    this.isBuyCare = false;
  }

  heightOfServiceType(res: IMobileCare[]) {
    for (let i = 0; i < res.length; i++) {
      if (res[i].productType === 'AIS Care Plus') {
        this.heightOfServiceTypeValue = 0;
        this.heightOfServiceTypeValue = res[i].serviceType.option.length * 48;
      }
    }
  }
  async getCurrentLimitMobileCare(): Promise<number> {
    return (
      (await firstValueFrom(this.customerService.getMaximumLimit()))
        .mobileCareLimit - 1
    );
  }
  async updateMobileCareData() {
    let mobileNo = this.formMobileCare.get('mobileNo')?.value || '';
    return await firstValueFrom(
      this.customerService.getExistingMobileCare(mobileNo)
    );
  }

  onChangeExpanded(isCollapsed: boolean) {
    this.isCollapsed = !isCollapsed;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.subscribe();
  }
}
