import { FormControl } from '@angular/forms';
import { ValidateCustomerPageComponent } from './validate-customer-page.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { TokenService } from 'src/app/core/service/token.service';
import { ErrorService } from 'src/app/core/service/error.service';
import { SessionStorageService } from 'src/app/core/service/session-storage.service';
import { of } from 'rxjs';
import {
  loadCustomerDataByIdentityCard,
  loadCustomerDataByPhone,
} from 'src/app/store-ngrx/actions/customer.action';
import { CreateTransactionService } from 'src/app/shared/service/createTransaction.service';
import { IValidateInputType } from 'src/app/shared/model/customer.model';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { CustomerService } from 'src/app/shared/service/customer.service';

describe('ValidateCustomerPageComponent', () => {
  let component: ValidateCustomerPageComponent;
  let store: Store<AppState> = {
    select: jest.fn().mockImplementation(() => {
      return {
        pipe: jest.fn().mockImplementation(() => {
          return {
            subscribe: jest.fn().mockReturnValueOnce(of({})),
          };
        }),
      };
    }),
    dispatch: jest.fn(),
  } as any;
  let errorService: ErrorService = {
    handleError: jest.fn(),
  } as any;
  let router: Router = {
    navigate: jest.fn(),
  } as any;
  let tokenService: TokenService = {
    getDataToken: jest.fn(),
  } as any;
  let sessionStorage: SessionStorageService = {
    removeItem: jest.fn(),
  } as any;
  let createTransactionService: CreateTransactionService = {
    onReserveStock: jest.fn(),
  } as any;
  let customerService: CustomerService = {
    getBlackListLimit: jest.fn(),
    getQueryContractMobile: jest.fn(),
  } as any;
  beforeEach(() => {
    component = new ValidateCustomerPageComponent(
      router,
      store,
      errorService,
      tokenService,
      sessionStorage,
      createTransactionService,
      customerService
    );
    component.mobileNoAndIdNoInput = new FormControl();
    jest.spyOn(store, 'select').mockReturnValue(
      of({
        productDetail: {},
        sellerData: {},
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should activeNextBtn is false whene formControl is length > 0', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('****');
    expect(component.activeNextBtn).toBe(false);
  });

  it('should activeNextBtn is true whene formControl is length === 0', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('');
    expect(component.activeNextBtn).toBe(true);
  });
  it('should set errorMessage to *กรุณากรอกรูปแบบให้ถูกต้อง whene format contain ภาษาไทย is not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('ภาษาไทย');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกรูปแบบให้ถูกต้อง');
  });
  it('should set errorMessage to *กรุณากรอกรูปแบบให้ถูกต้อง whene format contain @ is not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('@');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกรูปแบบให้ถูกต้อง');
  });
  it('should set errorMessage to *กรุณากรอกรูปแบบให้ถูกต้อง whene format contain test@ is not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('test@');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกรูปแบบให้ถูกต้อง');
  });
  it('should set errorMessage to *กรุณากรอกรูปแบบให้ถูกต้อง whene format contain ภาษาไทย @ is not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('ภาษาไทย @ นะทำไมกันนะ');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกรูปแบบให้ถูกต้อง');
  });
  it('should set errorMessage to *กรุณากรอกรูปแบบให้ถูกต้อง whene format is not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('*');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกรูปแบบให้ถูกต้อง');
  });
  it('should set errorMessage Emtpy whene Id card is correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('1111111111119');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('');
  });
  it('should set errorMessage to กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง whene Id card not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('1111111111118');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง');
  });
  it('should set errorMessage Emtpy whene Id card is correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('6125488640281');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('');
  });
  it('should set errorMessage *กรุณากรอกเลขบัตรประจำตัวคนต่างด้าวให้ถูกต้อง whene Id card contain 0671111111119 not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('0671111111119');
    component.checkInputFormat();
    expect(component.errorMessage).toBe(
      '*กรุณากรอกเลขบัตรประจำตัวคนต่างด้าวให้ถูกต้อง'
    );
  });
  it('should set errorMessage *กรุณากรอกเลขบัตรประจำตัวคนต่างด้าวให้ถูกต้อง whene alien Number contain 6100201116712 not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('6100201116712');
    component.checkInputFormat();
    expect(component.errorMessage).toBe(
      '*กรุณากรอกเลขบัตรประจำตัวคนต่างด้าวให้ถูกต้อง'
    );
  });
  it('should set errorMessage Empty passport is correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('AA9900890');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('');
  });
  it('should set errorMessage *กรุณากรอกเลขบัตรหนังสือเดินทางให้ถูกต้อง  whene passport contain 123456789 not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('123456789');
    component.checkInputFormat();
    expect(component.errorMessage).toBe(
      '*กรุณากรอกเลขบัตรหนังสือเดินทางให้ถูกต้อง'
    );
  });
  it('should set errorMessage *กรุณากรอกเลขบัตรหนังสือเดินทางให้ถูกต้อง whene passport contain 000000000 not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('000000000');
    component.checkInputFormat();
    expect(component.errorMessage).toBe(
      '*กรุณากรอกเลขบัตรหนังสือเดินทางให้ถูกต้อง'
    );
  });
  it('should set errorMessage *กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง whene phone contain 098765432w not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('098765432w');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
  });
  it('should set errorMessage *กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง whene phone contain 885009476w not correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('885009476w');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('*กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
  });
  it('should set errorMessage Empty whene phone contain 8850094767 correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('8850094767');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('');
  });
  it('should set errorMessage Empty whene phone contain 0850094767 correct.', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('0850094767');
    component.checkInputFormat();
    expect(component.errorMessage).toBe('');
  });
  it('should set phone number action api getSubScriptionProfile and getSubScriptionAccount is correct', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('0934000801');
    component.checkInputFormat();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadCustomerDataByPhone({ mobileNo: '0934000801' })
    );
  });
  it('should set phone number action api getSubScriptionProfile and getSubScriptionAccount is not correct', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('093400080w');
    component.checkInputFormat();
    expect(store.dispatch).not.toHaveBeenCalledWith(
      loadCustomerDataByPhone({ mobileNo: '093400080w' })
    );
  });
  it('should set phone number action api customerProfile is correct contain Id Card', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('1111111111119');
    component.seller = { username: 'sasithth' } as any;
    component.checkInputFormat();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadCustomerDataByIdentityCard({
        identityCard: '1111111111119',
        username: 'sasithth',
      })
    );
  });
  it('should set phone number action api customerProfile is correct contain alien Card', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('6125488640281');
    component.seller = { username: 'sasithth' } as any;
    component.checkInputFormat();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadCustomerDataByIdentityCard({
        identityCard: '6125488640281',
        username: 'sasithth',
      })
    );
  });
  it('should set phone number action api customerProfile is correct contain passport Card', async () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('AA9900890');
    component.seller = { username: 'sasithth' } as any;
    component.checkInputFormat();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadCustomerDataByIdentityCard({
        identityCard: 'AA9900890',
        username: 'sasithth',
      })
    );
  });

  it('should go to service care page when phone number is ais', () => {
    const inputType: IValidateInputType = {
      input: '0934000624',
      inputLength: 10,
      isPhoneNumber: true,
      isIdCard: false,
      isForeign: false,
      isPasport: false,
      checkInvalidThaiID: false,
      containsThaiAndSpecialCharacters: false,
    };
    const isAis = true;

    component.onNextPath(inputType, isAis);

    expect(router.navigate).toHaveBeenCalledWith([PathConstant.SERVICE_CARE]);
  });

  it('should go to list number page when id card is ais', () => {
    const inputType: IValidateInputType = {
      input: '1321100000000',
      inputLength: 13,
      isPhoneNumber: false,
      isIdCard: true,
      isForeign: false,
      isPasport: false,
      checkInvalidThaiID: false,
      containsThaiAndSpecialCharacters: false,
    };
    const isAis = true;

    component.onNextPath(inputType, isAis);

    expect(router.navigate).toHaveBeenCalledWith([PathConstant.LIST_NUMBER]);
  });

  it('should go to list number page when passprot is ais', () => {
    const inputType: IValidateInputType = {
      input: '1234567890',
      inputLength: 10,
      isPhoneNumber: false,
      isIdCard: false,
      isForeign: false,
      isPasport: true,
      checkInvalidThaiID: false,
      containsThaiAndSpecialCharacters: false,
    };
    const isAis = true;

    component.onNextPath(inputType, isAis);

    expect(router.navigate).toHaveBeenCalledWith([PathConstant.LIST_NUMBER]);
  });

  it('should go to list number page when foreign is ais', () => {
    const inputType: IValidateInputType = {
      input: '1234567890',
      inputLength: 10,
      isPhoneNumber: false,
      isIdCard: false,
      isForeign: true,
      isPasport: false,
      checkInvalidThaiID: false,
      containsThaiAndSpecialCharacters: false,
    };
    const isAis = true;

    component.onNextPath(inputType, isAis);

    expect(router.navigate).toHaveBeenCalledWith([PathConstant.LIST_NUMBER]);
  });

  it('should alert message when input is not ais', () => {
    const inputType: IValidateInputType = {
      input: '0934000624',
      inputLength: 10,
      isPhoneNumber: true,
      isIdCard: false,
      isForeign: false,
      isPasport: false,
      checkInvalidThaiID: false,
      containsThaiAndSpecialCharacters: false,
    };

    tokenService.getDataToken = jest.fn().mockReturnValueOnce({locationCode:'1100'});
    component.checkStatus({ isError: true }, inputType);

    expect(errorService.handleError).toHaveBeenCalled();
    // expect(errorService.handleError).toHaveBeenCalledWith({
    //   customMessage: messageConstant.ERROR_CUSTOMER_DATA_NOT_FOUND,
    //   isSuccessAlert: false,
    //   cancelButtonLabel: 'skip',
    //   callback: () => {
    //     router.navigate([PathConstant.SERVICE_CARE]);
    //   }
    // });
  });

  it('should save mobileNo when input is phone number and is not ais', () => {
    const inputType: IValidateInputType = {
      input: '0934000624',
      inputLength: 10,
      isPhoneNumber: true,
      isIdCard: false,
      isForeign: false,
      isPasport: false,
      checkInvalidThaiID: false,
      containsThaiAndSpecialCharacters: false,
    };

    tokenService.getDataToken = jest.fn().mockReturnValueOnce({locationCode:'1100'});

    component.checkStatus({ isError: true }, inputType);

    expect(store.dispatch).toHaveBeenCalledWith({
      mobileNo: '0934000624',
      type: '[Customer] save Mobile Number',
    });
  });

  it('should go to show info when read card and id card is not ais', () => {
    const inputType: IValidateInputType = {
      input: '1111111111119',
      inputLength: 13,
      isPhoneNumber: false,
      isIdCard: true,
      isForeign: false,
      isPasport: false,
      checkInvalidThaiID: false,
      containsThaiAndSpecialCharacters: false,
    };
    const isAis = false;
    component.havePhoneNumber = false;
    component.isReadCard = true;

    component.onNextPath(inputType, isAis);

    expect(router.navigate).toHaveBeenCalledWith([
      PathConstant.CUSTOMER_INFO_PAGE,
    ]);
  });

  it('should init mobile in input field when have customerData', async () => {
    store.select = jest.fn().mockReturnValueOnce(
      of({
        customerName: 'John Doe',
        mobileNo: '0901234567',
        idCardNo: '1111111111119',
        isMobileAis: false,
        customerAddress: {
          engFlag: 'English Flag',
          houseNo: '123',
          moo: 'Moo 5',
          mooban: 'Mooban Subdivision',
          building: 'Building A',
          floor: 'Floor 2',
          room: 'Room 203',
          soi: 'Soi 7',
          street: 'Downtown Street',
          amphur: 'Amphur City',
          tumbol: 'Tumbol District',
          province: 'Province County',
          zipCode: '12345',
        },
      })
    );

    await component.initMoblieNo();

    expect(component.mobileNoAndIdNoInput.value).toBe('0901234567');
  });

  it('should set isByPassCheckCustomer to be false when start page', () => {
    expect(component.isByPassCheckCustomer).toBe(false);
  });

  it('should change isByPassCheckCustomer to be turn when have customerData', async () => {
    store.select = jest.fn().mockReturnValueOnce(
      of({
        customerName: 'John Doe',
        mobileNo: '0901234567',
        idCardNo: '1111111111119',
        isMobileAis: false,
        customerAddress: {
          engFlag: 'English Flag',
          houseNo: '123',
          moo: 'Moo 5',
          mooban: 'Mooban Subdivision',
          building: 'Building A',
          floor: 'Floor 2',
          room: 'Room 203',
          soi: 'Soi 7',
          street: 'Downtown Street',
          amphur: 'Amphur City',
          tumbol: 'Tumbol District',
          province: 'Province County',
          zipCode: '12345',
        },
      })
    );

    await component.initMoblieNo();

    expect(component.isByPassCheckCustomer).toBe(true);
  });
});
