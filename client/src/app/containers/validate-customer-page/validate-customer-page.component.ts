import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { ErrorService } from 'src/app/core/service/error.service';
import { SessionStorageService } from 'src/app/core/service/session-storage.service';
import { TokenService } from 'src/app/core/service/token.service';
import { messageConstant } from 'src/app/shared/constant/message.constant';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import {
  ICustomerData,
  ICustomerDataReadCard,
  IGetBlackListLimit,
  IMobileNumberByIdCardNumber,
  IValidateInputType,
} from 'src/app/shared/model/customer.model';
import { ISeller } from 'src/app/shared/model/seller.model';
import { CreateTransactionService } from 'src/app/shared/service/createTransaction.service';
import { loadCartList } from 'src/app/store-ngrx/actions/cart.action';
import {
  loadCustomerDataByIdentityCard,
  loadCustomerDataByPhone,
  loadDataBackListLimitSuccess,
  loadDataContractMobileSuccess,
  loadMobileNumberByIdCardNumber,
  saveCustomerData,
  saveMoblieNo,
} from 'src/app/store-ngrx/actions/customer.action';
import { loadConfigMcOutCh } from 'src/app/store-ngrx/actions/mc-config.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getCartList } from 'src/app/store-ngrx/selectors/cart.selectors';
import {
  getCustomerData,
  getCustomerDataState,
  getLoading,
} from 'src/app/store-ngrx/selectors/customer.selectors';
import { getUserData } from 'src/app/store-ngrx/selectors/seller.selectors';
import * as moment from 'moment';
import { CustomerService } from 'src/app/shared/service/customer.service';

declare let window: any;
declare let $: any;

@Component({
  selector: 'app-validate-customer-page',
  templateUrl: './validate-customer-page.component.html',
  styleUrls: ['./validate-customer-page.component.scss'],
})
export class ValidateCustomerPageComponent implements OnInit, OnDestroy {
  mobileNoAndIdNoInput = new FormControl('');
  activeNextBtn: boolean = true;
  backPageUrl = PathConstant.PRODUCT_SELLING_PAGE;
  destroyed$: Subject<void> = new Subject();
  errorMessage = '';
  identityNumber = '';
  customMessage = '';
  seller?: ISeller;
  mobileNumberByIdCardNumber: IMobileNumberByIdCardNumber = {
    prepaidMobileList: [],
    postpaidMobileList: [],
  };
  timerID: any;
  progressTimer: number = 1000;
  isReadCard: boolean = false;
  readCardData: ICustomerDataReadCard = {
    idCardNo: '',
    imageReadSmartCard: '',
    idCardType: '',
    titleName: '',
    firstName: '',
    lastName: '',
    firstNameEn: '',
    lastNameEn: '',
    birthdate: '',
    gender: '',
    address: {
      homeNo: '',
      moo: '',
      street: '',
      soi: '',
      tumbol: '',
      amphur: '',
      province: '',
    },
    issueDate: '',
    expireDate: '',
    isMobileAis: false,
  };
  progress?: number;
  finishProgress?: boolean;
  profilePhoto: any;
  showProgress?: boolean;
  customerData?: ICustomerData;
  isByPassCheckCustomer: boolean = false;

  @ViewChild('readCardLoadingModal') readCardLoadingModal?: ElementRef;

  async ngOnInit(): Promise<void> {
    this.mobileNoAndIdNoInput.valueChanges.subscribe((e: string | null) => {
      this.errorMessage = '';
      if (e !== null && e?.length! > 0) {
        this.activeNextBtn = false;
      } else {
        this.activeNextBtn = true;
      }
    });

    this.seller = await firstValueFrom(this.store.select(getUserData));
    await this.initMoblieNo();

    this.timerID = setInterval(() => { }, this.progressTimer); //Timer
    this.onPostMessageIOS('readIDCard', 'start');
    this.iosCallBack();
  }

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private errorService: ErrorService,
    private tokenService: TokenService,
    private sessionStorage: SessionStorageService,
    private createTransactionService: CreateTransactionService,
    private customerService: CustomerService
  ) {
    this.sessionStorage.removeItem('appState');
    this.store.dispatch(
      loadConfigMcOutCh({ nameConfig: 'outChannelSales_criteria' })
    );
  }

  async initMoblieNo(): Promise<void> {
    this.customerData = await firstValueFrom(
      this.store.select(getCustomerData)
    );
    if (this.customerData?.mobileNo && this.customerData?.idCardNo) {
      this.isByPassCheckCustomer = true;
      this.mobileNoAndIdNoInput.patchValue(this.customerData?.mobileNo);
    }
  }

  isPasport(Pasport: string) {
    const regex =
      /^((?!.*(012345|123456|234567|345678|456789|000000|111111|222222|333333|444444|555555|666666|777777|888888|999999))([0-9A-Za-z]{1}[0-9]{5,7}[0-9A-Za-z]{0,1}|[0-9A-Za-z]{1}[0-9]{4}[0-9A-Za-z]{1}|[0-9A-Za-z]{2}[0-9]{3,6}[0-9A-Za-z]{1}|[0-9A-Za-z]{2}[0-9]{4,6}[0-9A-Za-z]{0,1}|[0-9]{2}[A-Za-z]{2}[0-9]{5}))$/;
    return regex.test(Pasport);
  }
  isPhone(phoneNumber: string) {
    const regex = /^(0|88)+([0-9]{8}|[0-9]{9})+$/;
    return regex.test(phoneNumber);
  }
  isForeign(alienNumber: string) {
    const regex = /^[0|6|7]{1}[0-9]{12}/;
    return regex.test(alienNumber);
  }
  isIdCard(idCard: string) {
    const regex = /^[1-5|8-9]{1}[0-9]{12}/;
    return regex.test(idCard);
  }
  checkInvalidThaiID(id: string) {
    let sum = 0;
    let i = 0;
    if (id !== null && id.length === 13) {
      for (; i < 12; i++) {
        sum += parseFloat(id.charAt(i)) * (13 - i);
      }
      if ((11 - (sum % 11)) % 10 !== parseFloat(id.charAt(12))) {
        return false;
      }
    }
    return true;
  }

  containsThaiAndSpecialCharacters(text: string) {
    const regex = /[\u0E00-\u0E7F\s\p{P}\p{S}]/u;
    return regex.test(text);
  }

  validateInputType(): IValidateInputType {
    const InputValue = this.mobileNoAndIdNoInput.value!;
    return {
      input: InputValue,
      inputLength: InputValue?.length,
      isPhoneNumber: this.isPhone(InputValue),
      isPasport: this.isPasport(InputValue),
      isForeign: this.isForeign(InputValue),
      isIdCard: this.isIdCard(InputValue),
      checkInvalidThaiID: this.checkInvalidThaiID(InputValue),
      containsThaiAndSpecialCharacters:
        this.containsThaiAndSpecialCharacters(InputValue),
    };
  }

  validateInvalidPhoneNumberFormat(phoneNumber: number) {
    return phoneNumber < 8 || phoneNumber === 11 || phoneNumber === 12;
  }

  async checkInputFormat() {
    const inputType: IValidateInputType = this.validateInputType();

    if (inputType.input === this.customerData?.mobileNo) {
      this.checkCartList(inputType, this.customerData.isMobileAis)
      return;
    }

    const validateValidThaiCitizensCardFormat =
      inputType.inputLength === 13 &&
      inputType.isIdCard &&
      !inputType.checkInvalidThaiID;
    const validateValidForeignCardFormat =
      inputType.inputLength === 13 &&
      inputType.isForeign &&
      !inputType.checkInvalidThaiID;
    const validateValidPassportFormat =
      inputType.inputLength >= 6 &&
      inputType.inputLength <= 9 &&
      !inputType.isPasport;
    const validateValidPhoneNumberFormat =
      inputType.inputLength === 10 && !inputType.isPhoneNumber;

    if (inputType.containsThaiAndSpecialCharacters) {
      this.errorMessage = '*กรุณากรอกรูปแบบให้ถูกต้อง';
      return;
    }
    if (this.validateInvalidPhoneNumberFormat(inputType.inputLength)) {
      this.errorMessage = '*กรุณากรอกรูปแบบให้ถูกต้อง';
      return;
    }

    if (validateValidThaiCitizensCardFormat) {
      this.errorMessage = '*กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง';
      return;
    }
    if (validateValidForeignCardFormat) {
      this.errorMessage = '*กรุณากรอกเลขบัตรประจำตัวคนต่างด้าวให้ถูกต้อง';
      return;
    }
    if (validateValidPassportFormat) {
      this.errorMessage = '*กรุณากรอกเลขบัตรหนังสือเดินทางให้ถูกต้อง';
      return;
    }

    if (validateValidPhoneNumberFormat) {
      this.errorMessage = '*กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง';
      return;
    }

    this.callStore(inputType);
  }

  callStore(inputType: IValidateInputType) {
    const lodingSub: Subject<void> = new Subject(); 

    if (inputType.inputLength === 10 && inputType.isPhoneNumber) {
      this.store.dispatch(
        loadCustomerDataByPhone({ mobileNo: inputType.input })
      );
    } else if (
      inputType.isIdCard ||
      inputType.isPasport ||
      inputType.isForeign
    ) {
      this.store.dispatch(
        loadCustomerDataByIdentityCard({
          identityCard: inputType.input,
          username: this.seller?.username || '',
        })
      );

      this.store.dispatch(
        loadMobileNumberByIdCardNumber({
          identityCard: inputType.input,
        })
      );
    }

    this.store
      .select(getLoading)
      .pipe(takeUntil(lodingSub))
      .subscribe((loadingStatus) => {
        if (!loadingStatus) {
          this.getCustomerData(inputType);
          lodingSub.next();
          lodingSub.unsubscribe();
        }
      });
  }

  checkBlackListLimit(idCardNo: string) {
    this.customerService
      .getBlackListLimit(idCardNo)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((blackListData: IGetBlackListLimit) => {
        if (blackListData.data) {
          this.store.dispatch(
            loadDataBackListLimitSuccess({ data: blackListData.data })
          );
        }
      });
  }

  checkQueryContractMobile(idCardNo: string) {
    this.customerService
      .getQueryContractMobile(idCardNo)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((queryContractData: IGetBlackListLimit) => {
        if (queryContractData.data) {
          this.store.dispatch(
            loadDataContractMobileSuccess({ data: queryContractData.data })
          );
        }
      });
  }

  async getCustomerData(inputType: IValidateInputType) {
    const customerSub: Subject<void> = new Subject();

    this.store.select(getCustomerDataState).pipe(takeUntil(customerSub)).subscribe((data) => {
      if (data.dataCustomer || data.isError) {
        this.checkStatus(data, inputType);
        customerSub.next();
        customerSub.unsubscribe();
      }
    });
  }

  isHaveCartList: boolean = false
  checkCartList(inputType: IValidateInputType, isMobileAis: boolean) {
    const cartListSub: Subject<void> = new Subject();

    this.store.dispatch(
      loadCartList({
        mobileNo: inputType.input,
        locationCode: this.tokenService.getDataToken().locationCode,
      })
    );

    this.store.select(getCartList).pipe(takeUntil(cartListSub)).subscribe((cartList) => {
      console.log('cartList', cartList);

      if (cartList) {
        cartListSub.next();
        cartListSub.unsubscribe();
        if (cartList.length >= 1) {
          this.errorService.handleError({
            customMessage: messageConstant.ERROR_CART_LIST_LIMIT,
          });
          this.isHaveCartList = true
          return;
        }
        this.isHaveCartList = false
        this.onNextPath(inputType, isMobileAis)
      }
    });
  }

  checkStatus(data: any, inputType: IValidateInputType) {
    const isMobileAis: boolean = Boolean(data.dataCustomer?.isMobileAis);
    const idCard: string = data.dataCustomer?.idCardNo

    if (idCard) {
      this.checkBlackListLimit(idCard);
      this.checkQueryContractMobile(idCard);
    }

    if (inputType.isPhoneNumber) {
      this.havePhoneNumber = true;
      this.store.dispatch(saveMoblieNo({ mobileNo: inputType.input }));
      this.checkCartList(inputType, isMobileAis);
      return;
    }
    this.onNextPath(inputType, isMobileAis);
    // if (isMobileAis) {
    //   localStorage.setItem('id', 'test');
    //   if (inputType.isPhoneNumber) {

    //     this.checkCartList(inputType, isMobileAis);
    //     return;
    //   }

    //   if (inputType.isIdCard || inputType.isPasport || inputType.isForeign) {
    //     this.onNextPath(inputType, isMobileAis);
    //     return;
    //   }
    // } else {
    //   this.checkCartList(inputType, isMobileAis);
    // }
  }

  havePhoneNumber: boolean = false;

  onNextPath(inputType: IValidateInputType, isMobileAis: boolean) {
    if (
      inputType.isPhoneNumber &&
      (isMobileAis || this.isByPassCheckCustomer)
    ) {
      this.createTransactionService.onReserveStock();
      this.router.navigate([PathConstant.SERVICE_CARE]);
      return;
    }
    if (
      (inputType.isIdCard || inputType.isPasport || inputType.isForeign) &&
      isMobileAis &&
      !this.havePhoneNumber &&
      !this.isReadCard
    ) {
      this.router.navigate([PathConstant.LIST_NUMBER]);
      return;
    }
    if (
      (inputType.isIdCard || inputType.isPasport || inputType.isForeign) &&
      !this.havePhoneNumber &&
      this.isReadCard
    ) {
      if (!isMobileAis) {
        this.store.dispatch(
          saveCustomerData({ customerDataReadCard: this.readCardData })
        );
      }
      this.router.navigate([PathConstant.CUSTOMER_INFO_PAGE]);
      return;
    }
    if (inputType.isPhoneNumber && !isMobileAis) {
      if (this.isHaveCartList) return;
      this.errorService.handleError({
        customMessage: messageConstant.ERROR_CUSTOMER_DATA_NOT_FOUND,
        isSuccessAlert: false,
        cancelButtonLabel: messageConstant.SKIP,
        callback: () => {
          this.createTransactionService.onReserveStock();
          this.router.navigate([PathConstant.SERVICE_CARE]);
        },
      });
      return;
    }
    if (
      (inputType.isIdCard || inputType.isPasport || inputType.isForeign) &&
      !isMobileAis
    ) {
      this.errorService.handleError({
        customMessage: messageConstant.ERROR_CUSTOMER_DATA_NOT_FOUND,
        isSuccessAlert: false,
        cancelButtonLabel: messageConstant.SKIP,
        callback: () => {
          this.router.navigate([PathConstant.MOBILE_NUMBER_PAGE]);
        },
      });
      return;
    }
  }

  onReadCard() {
    this.isReadCard = true;

    if (this.havePhoneNumber) {
      this.store.dispatch(
        saveCustomerData({ customerDataReadCard: this.readCardData })
      );
      this.router.navigate([PathConstant.CUSTOMER_INFO_PAGE]);
      return;
    }
    if (!this.havePhoneNumber) {
      this.callStore({
        input: this.readCardData?.idCardNo,
        inputLength: this.readCardData?.idCardNo.length,
        isPhoneNumber: false,
        isPasport: false,
        isForeign: false,
        isIdCard: true,
        checkInvalidThaiID: false,
        containsThaiAndSpecialCharacters: false,
      });
      return;
    }
  }

  onPostMessageIOS(req: any, param: any) {
    try {
      window.webkit?.messageHandlers.aisNative.postMessage({
        request: req,
        parameter: param,
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  iosCallBack(): void {
    let finish: number = 100;
    let second: number = 10;
    window.aisNativeCallback = (data: any) => {
      let resp = JSON.parse(data);
      if (resp.request === 'readIDCard') {
        if (resp.response.message === 'onLoadProgress') {
          this.progress = parseInt(resp.response.data);
          if (this.progress <= finish) {
            $('.custom').animate({ width: this.progress + '%' }, second, () => {
              /**/
            });
          }
        } else if (resp.response.message === 'onLoadCompleted') {
          if (resp.response.hasOwnProperty('image')) {
            if (
              typeof resp.response.image === 'string' &&
              resp.response.image.includes('data:image')
            ) {
              let photoResponse = resp.response.image;
              this.finishProgress = true;
              let result: any = resp.response.data;
              this.onGetPhotoIOS(photoResponse);
              this.mappingCardDataIOS(result);
              this.onReadCard();
              return;
            }
          }
        } else if (resp.response.message === 'onError') {
          this.finishProgress = false;
          this.showProgress = false;
          this.errorService.handleError({
            customMessage:
              'ไม่สามารถอ่านบัตรประชาชนได้ กรุณากรอกเลขที่บัตรประชาชน',
          });
        } else if (
          resp.response.message === 'onCardStatusChanged' &&
          resp.response.data == 'presented'
        ) {
          this.progress = 0;
          $('.custom').css('width', 0);
          this.finishProgress = false;
          this.showProgress = true;
        } else if (
          resp.response.message === 'onCardStatusChanged' &&
          resp.response.data == 'empty'
        ) {
          if (this.progress === 100) {
            this.finishProgress = true;
            this.showProgress = true;
          } else {
            this.finishProgress = false;
            this.showProgress = false;
            $('.custom').css('width', 0);
          }
        }
      }
    };
  }

  onGetPhotoIOS(image: any): void {
    this.profilePhoto = image;
    setTimeout(function () {
      $('#imgRegNumVerifyScanIdProfilePhoto').attr('src', image);
    }, 1000);
  }

  async mappingCardDataIOS(textProfile: any): Promise<void> {
    const birth = this.extractBirthDateIdCardPc(textProfile.birthdate);
    const province = this.defaultIfEmpty(textProfile.province).replace(
      /(^จังหวัด)/,
      ''
    );
    const issueDate = textProfile.issueDate;
    const expire = this.extractExpireDateIdCardPc(textProfile.expireDate);

    this.readCardData = {
      idCardNo: this.defaultIfEmpty(textProfile.nationalID),
      imageReadSmartCard:
        this.profilePhoto && this.profilePhoto.length > 0
          ? this.profilePhoto
          : '',
      idCardType: 'บัตรประชาชน',
      titleName: this.defaultIfEmpty(textProfile.thaiTitleName),
      firstName: this.defaultIfEmpty(textProfile.thaiFirstName),
      lastName: this.defaultIfEmpty(textProfile.thaiLastName),
      firstNameEn: this.defaultIfEmpty(textProfile.englishFirstName),
      lastNameEn: this.defaultIfEmpty(textProfile.englishLastName),
      birthdate: `${birth.day}/${birth.month}/${birth.year}`,
      gender: this.defaultIfEmpty(textProfile.sex) === '1' ? 'M' : 'F',
      address: {
        homeNo: this.defaultIfEmpty(textProfile.address),
        moo: this.defaultIfEmpty(textProfile.moo).replace(/^หมู่ที่/, ''),
        street: this.defaultIfEmpty(textProfile.thanon).replace(/^ถนน/, ''),
        soi: this.defaultIfEmpty(textProfile.soi).replace(/^ซอย/, ''),
        tumbol: this.defaultIfEmpty(textProfile.tumbol).replace(
          /^(ตำบล|แขวง)/,
          ''
        ),
        amphur: this.defaultIfEmpty(textProfile.amphur).replace(
          /^(อำเภอ|เขต)/,
          ''
        ),
        province: province === 'กรุงเทพมหานคร' ? 'กรุงเทพ' : province,
      },
      issueDate:
        issueDate.substring(6, 8) +
        '/' +
        issueDate.substring(4, 6) +
        '/' +
        issueDate.substring(0, 4),
      expireDate: `${expire.day}/${expire.month}/${expire.year}`,
    };
  }

  defaultIfEmpty(text: any): any {
    return (text || '').trim();
  }

  extractBirthDateIdCardPc(date: string = '00000000') {
    // YYYYMMDD
    let year;
    let month;
    let day;
    try {
      year = moment(date.substring(0, 4), 'YYYY');
      if (year.isValid()) {
        year = year.format('YYYY');
      } else {
        year = '0000';
      }
    } catch (error) {
      year = '0000';
    }
    try {
      month = moment(date.substring(4, 6) + year, 'MMYYYY');
      if (month.isValid()) {
        month = month.format('MM');
      } else {
        month = '01';
      }
    } catch (error) {
      month = '01';
    }
    try {
      day = moment(date.substring(6, 8) + month + year, 'DDMMYYYY');
      if (day.isValid()) {
        day = day.format('DD');
      } else {
        day = '01';
      }
    } catch (error) {
      day = '01';
    }
    return { year, month, day };
  }

  extractExpireDateIdCardPc(date: string = '99999999') {
    // YYYYMMDD
    let year;
    let month;
    let day;
    try {
      year = moment(date.substring(0, 4), 'YYYY');
      if (year.isValid()) {
        year = year.format('YYYY');
      } else {
        year = '9999';
      }
    } catch (error) {
      year = '9999';
    }
    try {
      month = moment(date.substring(4, 6) + year, 'MMYYYY');
      if (month.isValid()) {
        month = month.format('MM');
      } else {
        month = '01';
      }
    } catch (error) {
      month = '01';
    }
    try {
      day = moment(date.substring(6, 8) + month + year, 'DDMMYYYY');
      if (day.isValid()) {
        day = day.format('DD');
      } else {
        day = '01';
      }
    } catch (error) {
      day = '01';
    }
    return { year, month, day };
  }

  onStopReadCard() {
    window.webkit?.messageHandlers?.aisNative.postMessage({
      request: 'readIDCard',
      parameter: 'stop',
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
    this.onStopReadCard();
  }
}
