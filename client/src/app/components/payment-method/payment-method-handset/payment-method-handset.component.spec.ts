import { TokenService } from 'src/app/core/service/token.service';
import { PaymentMethodHandsetComponent } from './payment-method-handset.component';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { IPayment, ITabsPayment } from 'src/app/shared/model/payment.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { messageConstant } from 'src/app/shared/constant/message.constant';
import { IPaymentResponse } from 'src/app/shared/model/payment.model';

describe('PaymentMethodHandsetComponent', () => {
  let component: PaymentMethodHandsetComponent;
  let store: any = {
    dispatch: jest.fn(),
    select: jest.fn(),
  };
  let fb: any = {
    group: jest.fn(),
    value: jest.fn()
  };
  let tokenService: TokenService;
  let checkCreditCardInfoRes = {
    resultCode: "20000",
    resultDescription: "Success",
    developerMessage: "Success",
    prefixCard: "490734",
    paymentMethod: "CC",
    cardCategory: "CREDIT",
    bankCode: "14",
    bankNameTh: "ไทยพาณิชย์ จำกัด (มหาชน)",
    bankNameEn: "SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED",
    bankAbbr: "SCB",
    cardType: "VISA"
  }
  let paymentService: PaymentService = {
    checkQueryCardInfo: jest.fn().mockImplementation(() => ({
      pipe: jest.fn().mockImplementation(() => ({
        subscribe: jest.fn()
      })),
    })),
  } as unknown as PaymentService;
  beforeEach(async () => {
    component = new PaymentMethodHandsetComponent(
      store,
      fb,
      tokenService,
      paymentService
    );

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectTab data', () => {
    const tab: ITabsPayment = 'counter';

    component.onChangeTab(tab);

    expect(component.selectedTab).toEqual(tab);
  });

  it('should update bank data', () => {
    component.cleanForm = jest.fn();
    component.emitPaymentSelected = jest.fn();
    component.userPaymentSelected = {
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

    const expected = {
      paymentType: 'counter',
      method: '',
      paymentMethod: '',
      bankNameTh: 'bankNameTh',
      bankNameEn: 'bankNameEn',
      bankAbbr: 'bankAbbr',
      installment: {
        installmentId: 0,
        installmentRate: '',
        installmentTerms: '',
        balloonMonth: 0,
        cardDigits: 0,
      },
      isInstallment: false,
    };

    component.onUpdateBank('bankNameTh', 'bankNameEn', 'bankAbbr');

    expect(component.userPaymentSelected).toEqual(expected);
  });

  it('should show message success with constant message when LS number equal cardDigi follow with caedDigi from trade', fakeAsync(() => {
    const valueChanges = new Subject<string>();
    component.userPaymentSelected = { method: 'LS' } as IPayment;
    component.flow = 'ASP';
    component.contractNo = { value: '111112222233333444', valueChanges } as any;
    component.cardDigi = 18;
    component.contractLength = 18; // อัปเดต contractLength ให้เท่ากับ cardDigi

    component.onCheckLesingLength();
    valueChanges.next('111112222233333444');

    tick(300);

    expect(component.messageCheckLesing).toBe(messageConstant.SUCCESS_PAYMENT_LS_CONTRACT_NUMBER);
  }));

  it('should show message error when LS number not equal cardDigi', fakeAsync(() => {
    component.userPaymentSelected = { method: 'LS' } as IPayment;
    component.flow = 'ASP';
    component.contractNo = {
      value: '123456',
      valueChanges: of('123456'),
    } as any;
    component.cardDigi = 18;
    component.contractLength = 6;

    component.onCheckLesingLength();

    tick(300);

    expect(component.messageCheckLesing).toBe(`กรุณากรอกเลขสัญญา 18 ตัว (6)`);
  }));

  it('should have message lesing alert when flow is AIS', () => {
    component.userPaymentSelected = { method: 'LS' } as IPayment;
    component.flow = 'AIS';
    component.contractNo = { value: '123456' } as FormControl;
    component.cardDigi = 18;

    component.onCheckLesingLength();

    expect(component.messageCheckLesing).toBe('');
  });

  it('should show message success when method is not LS', () => {
    component.userPaymentSelected = { method: 'someone' } as IPayment;
    component.flow = 'ASP';
    component.contractNo = { value: '111112222233333444' } as FormControl;
    component.cardDigi = 18;

    component.onCheckLesingLength();

    expect(component.messageCheckLesing).toBe('');
  });

  it('should call checkCreditCardInfo when have credit card prefix 6 digi', () => {
    component.prefix = '';
    const formBuilder = TestBed.inject(FormBuilder);
    const mockFormGroup: FormGroup = formBuilder.group({
      '0': '1',
      '1': '1',
      '2': '1',
      '3': '1',
      '4': '1',
      '5': '1',
    });
    component.creditCardNoForm = mockFormGroup;
    component.checkCreditCardInfo = jest.fn();

    component.getCreditCardNumber();

    expect(component.checkCreditCardInfo).toHaveBeenCalledWith(
      '111111',
      'CREDIT'
    );
  });

  it('should not call checkCreditCardInfo when credit card prefix not change', () => {
    component.prefix = '111111';
    const formBuilder = TestBed.inject(FormBuilder);
    const mockFormGroup: FormGroup = formBuilder.group({
      '0': '1',
      '1': '1',
      '2': '1',
      '3': '1',
      '4': '1',
      '5': '1',
    });
    component.creditCardNoForm = mockFormGroup;
    component.checkCreditCardInfo = jest.fn();

    component.getCreditCardNumber();

    expect(component.checkCreditCardInfo).not.toHaveBeenCalled();
  });

  it('should set credit care information when bank selected match to credit card', () => {
    component.userPaymentSelected.bankAbbr = 'SCB'
    paymentService.checkQueryCardInfo = jest.fn().mockReturnValue(of(checkCreditCardInfoRes));

    component.checkCreditCardInfo('490734', 'CREDIT')

    expect(component.resQueryCardInfo).toEqual(checkCreditCardInfoRes)
  })

  it('should set messageCheckCreditCardNo when bank selected match to credit card', () => {
    component.userPaymentSelected.bankAbbr = 'SCB'
    paymentService.checkQueryCardInfo = jest.fn().mockReturnValue(of(checkCreditCardInfoRes));

    component.checkCreditCardInfo('490734', 'CREDIT')

    expect(component.messageCheckCreditCardNo).toEqual('SCB')
  })

  it('should show message alert success when bank selected match to credit card', () => {
    component.userPaymentSelected.bankAbbr = 'SCB'
    paymentService.checkQueryCardInfo = jest.fn().mockReturnValue(of(checkCreditCardInfoRes));

    component.checkCreditCardInfo('490734', 'CREDIT')

    expect(component.checkCreditCardAlertSuccess).toEqual(true)
  })

  it('should set messageCheckCreditCardNo error with constant message when bank selected not match to credit card', () => {
    component.userPaymentSelected.bankAbbr = 'KTB'
    paymentService.checkQueryCardInfo = jest.fn().mockReturnValue(of(checkCreditCardInfoRes));

    component.checkCreditCardInfo('490734', 'CREDIT')

    expect(component.messageCheckCreditCardNo).toEqual(messageConstant.ERROR_PAYMENT_CREDIT_CARD_BANK_NOT_MATCH)
  })

  it('should show message alert error when bank selected not match to credit card', () => {
    component.userPaymentSelected.bankAbbr = 'KTB'
    paymentService.checkQueryCardInfo = jest.fn().mockReturnValue(of(checkCreditCardInfoRes));

    component.checkCreditCardInfo('490734', 'CREDIT')

    expect(component.checkCreditCardAlertSuccess).toEqual(false)
  })

  // it('should emit true to buttonStateChangeHandset when checkCreditCardLength is true', fakeAsync(() => {
  //   // Arrange
  //   // const valueChanges = new Subject<string>();
  //   // component.userPaymentSelected = { 
  //   //   method: 'LS' 
  //   // } as IPayment;
  //   // component.flow = 'ASP';
  //   // component.contractNo = { value: '111112222233333444', valueChanges } as any;
  //   // component.cardDigi = 18
  //   component.userPaymentSelected.method = 'CC';
  //   const formBuilder = TestBed.inject(FormBuilder);
  //   const mockFormGroup: FormGroup = formBuilder.group({
  //     '0': '1',
  //     '1': '1',
  //     '2': '1',
  //     '3': '1',
  //     '4': '1',
  //     '5': '1',
  //     '12': '1',
  //     '13': '1',
  //     '14': '1',
  //     '15': '1',
  //   });
  //   component.creditCardNoForm = mockFormGroup;
  //   // Act
  //   component.onNextCondition();

  //   const emitSpy = jest.spyOn(component.buttonStateChangeHandset, 'emit');

  //   tick(300);
  //   // Assert
  //   expect(emitSpy).toHaveBeenCalled();
  // }));

  const changes: any = {
    productDetail: {
      currentValue: {},
    },
  };
  const mockProductDetail = {
    main_promotion: {
      trade: 'trade',
      campaign: 'campaign'
    },
    device: 'device',
    transactionType: 'transactionType'
  }

  it('should call getPaymentsPartner when flow not is AIS', () => {

    component.productDetail = mockProductDetail
    // component.main_promotion = mockProductDetail
    component.flow = 'ASP'
    const getPaymentsPartnerSpy = jest.spyOn(component, 'getPaymentsPartner').mockImplementation();

    component.ngOnChanges(changes);

    expect(getPaymentsPartnerSpy).toHaveBeenCalled();
  })

  it('should call getPaymentShop when flow is AIS', () => {
    const changes: any = {
      productDetail: {
        currentValue: {},
      },
    };
    component.productDetail = mockProductDetail
    component.flow = 'AIS'
    const getPaymentsPartnerSpy = jest.spyOn(component, 'getPaymentShop').mockImplementation();

    component.ngOnChanges(changes);

    expect(getPaymentsPartnerSpy).toHaveBeenCalled();
  })

  const mockCreditCardNoFormData = {
    '0': '1',
    '1': '1',
    '2': '1',
    '3': '1',
    '4': '1',
    '5': '1',
    '12': '1',
    '13': '1',
    '14': '1',
    '15': '1',
  }

  it('should reset creditCardNoForm', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    component.creditCardNoForm = formBuilder.group(mockCreditCardNoFormData);

    component.cleanForm();

    expect(Object.values(component.creditCardNoForm.value).join('').length).toEqual(0)
  })

  it('should reset contractNo', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    component.creditCardNoForm = formBuilder.group(mockCreditCardNoFormData);
    component.contractNo = new FormControl('123456');

    component.cleanForm();

    expect(component.contractNo.value).toEqual('')
  })

  it('should reset remark', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    component.creditCardNoForm = formBuilder.group(mockCreditCardNoFormData);
    component.remark = new FormControl('123456');

    component.cleanForm();

    expect(component.remark.value).toEqual('')
  })

  it('should reset messageCheckCreditCardNo', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    component.creditCardNoForm = formBuilder.group(mockCreditCardNoFormData);
    component.messageCheckCreditCardNo = 'someText'

    component.cleanForm();

    expect(component.messageCheckCreditCardNo).toEqual('')
  })

  it('should reset messageCheckLesing', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    component.creditCardNoForm = formBuilder.group(mockCreditCardNoFormData);
    component.messageCheckLesing = 'someText'

    component.cleanForm();

    expect(component.messageCheckLesing).toEqual('')
  })

  it('should reset userPaymentSelected installment', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    component.creditCardNoForm = formBuilder.group(mockCreditCardNoFormData);
    component.userPaymentSelected.installment = {
      installmentId: 1,
      installmentRate: '1',
      installmentTerms: '1',
      balloonMonth: 1,
      cardDigits: 1,
    }

    component.cleanForm();

    expect(component.userPaymentSelected.installment).toEqual({
      installmentId: 0,
      installmentRate: '',
      installmentTerms: '',
      balloonMonth: 0,
      cardDigits: 0,
    })
  })

  const mockAllPaymentData: IPaymentResponse = {
    statusCode: '',
    statusDesc: '',
    payments: [
      {
        method: 'method',
        cardType: 'cardType',
        banks: [],
        banksFullPaid: [{
          bankAbbr: 'bankAbbr',
          bankDescTh: 'bankDescTh',
          bankDescEn: 'bankDescEn',
          imageUrl: 'imageUrl',
          installments: []
        }],
        banksInstallment: [{
          bankAbbr: 'bankAbbr',
          bankDescTh: 'bankDescTh',
          bankDescEn: 'bankDescEn',
          imageUrl: 'imageUrl',
          installments: [{
            installmentId: 1,
            installmentRate: 'installmentRate',
            installmentTerms: 'installmentTerms',
            balloonMonth: 1,
            cardDigits: 1
          }]
        }],
        methodName: 'methodName',
        methodNameTh: 'methodNameTh',
      }
    ],
  };

  it('should return banksFullPaid when method is fullPaid', () => {
    component.allPaymentData = mockAllPaymentData

    expect(component.getPayment('fullPaid', 0)).toEqual([{
      bankAbbr: 'bankAbbr',
      bankDescTh: 'bankDescTh',
      bankDescEn: 'bankDescEn',
      imageUrl: 'imageUrl',
      installments: []
    }])
  })

  it('should return banksInstallment when method not is fullPaid', () => {
    component.allPaymentData = mockAllPaymentData

    expect(component.getPayment('installment', 0)).toEqual([{
      bankAbbr: 'bankAbbr',
      bankDescTh: 'bankDescTh',
      bankDescEn: 'bankDescEn',
      imageUrl: 'imageUrl',
      installments: [{
        installmentId: 1,
        installmentRate: 'installmentRate',
        installmentTerms: 'installmentTerms',
        balloonMonth: 1,
        cardDigits: 1
      }]
    }])
  })
});
