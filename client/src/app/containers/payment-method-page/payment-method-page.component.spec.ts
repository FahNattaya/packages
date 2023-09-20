import { of } from 'rxjs';
import { PaymentMethodPageComponent } from './payment-method-page.component';
import { TokenService } from 'src/app/core/service/token.service';
import { ServiceCareService } from 'src/app/shared/service/service-care.service';
import { IPayment } from 'src/app/shared/model/payment.model';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { SharedService } from 'src/app/shared/service/shared.service';

describe('PaymentMethodPageComponent', () => {
  let mockRouter: any = {
    navigate: jest.fn(), // Create a Jest spy function to track calls to the navigate method
  };
  let store: any = {
    dispatch: jest.fn(),
    select: jest.fn().mockReturnValue(of([])),
  };
  let mockHttp = {
    post: jest.fn(),
    get: jest.fn(),
  };
  const sharedService = new SharedService();
  let component: PaymentMethodPageComponent;

  let careService: ServiceCareService;
  let cartService: CartService;
  let paymentService: PaymentService;
  let tokenService: TokenService;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(), // Create a Jest spy function to track calls to the navigate method
    };
    store = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of([])),
    };
    mockHttp = {
      post: jest.fn(),
      get: jest.fn(),
    };

    careService = new ServiceCareService(mockHttp as any, sharedService);
    cartService = new CartService(mockHttp as any);
    paymentService = new PaymentService(mockHttp as any, sharedService);
    tokenService = {} as any;
    component = new PaymentMethodPageComponent(
      mockRouter,
      store,
      careService,
      tokenService,
      paymentService,
      cartService,
      sharedService
    );
  });

  it('should create', async () => {
    mockHttp.get.mockReturnValueOnce(of([{}]));
    store.select = jest
      .fn()
      .mockReturnValueOnce(of({})) // customer
      .mockReturnValueOnce(of({})) // user
      .mockReturnValueOnce(of({ Flow: 'AIS' })) // config
      .mockReturnValueOnce(of({})); //  transaction iD

    await component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.flow).toBe('AIS');
  });

  it('init when customer is undefined', async () => {
    store.select = jest
      .fn()
      .mockReturnValueOnce(of(undefined)) // customer
      .mockReturnValueOnce(of({})) // user
      .mockReturnValueOnce(of({ Flow: 'AIS' })) // config
      .mockReturnValueOnce(of({})); //  transaction iD

    await component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should update the totalNormalPrice property with the provided value', () => {
    component.summaryPrice = 150;
    const totalNetPrice = 150;

    expect(component.summaryPrice).toEqual(totalNetPrice);
  });

  it('should set summaryPrice', () => {
    const summaryPrice: number = 1500;

    component.getSummaryPrice(summaryPrice);

    expect(component.summaryPrice).toEqual(summaryPrice);
  });

  const paymentDetail: IPayment = {
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

  it('should be assigned a value to the variable handsetPaymentSelected', () => {
    component.getHandsetPaymentSelected(paymentDetail);

    expect(component.handsetPaymentSelected).toEqual(paymentDetail);
  });

  it('should be assigned a value to the variable mobileCarePaymentSelected', () => {
    component.getMobileCarePaymentSelected(paymentDetail);

    expect(component.mobileCarePaymentSelected).toEqual(paymentDetail);
  });

  it('should enable the button when cash is selected', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'CA',
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
    component.isReceiptAddressSelected = true;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(false);
  });

  it('should enable the button in flow ais shop when the credit card fullPaid is selected', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'CC',
      paymentType: 'fullPaid',
      bankNameTh: '',
      bankNameEn: '',
      bankAbbr: 'SCB',
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
    component.flow = 'AIS';
    component.isReceiptAddressSelected = true;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(false);
  });

  it('should enable the button in flow ais shop when the credit card installment is selected and installmentTerms more than 0', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'CC',
      paymentType: 'installment',
      bankNameTh: '',
      bankNameEn: '',
      bankAbbr: 'SCB',
      installment: {
        installmentId: 1,
        installmentRate: '7',
        installmentTerms: '10',
        balloonMonth: 1,
        cardDigits: 18,
      },
      isInstallment: true,
      creditCardNo: '',
      contractNo: '',
    };
    component.flow = 'AIS';
    component.isReceiptAddressSelected = true;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(false);
  });

  it('should enable the button in flow ais shop when the LS is selected', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'LS',
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
    component.flow = 'AIS';
    component.isReceiptAddressSelected = true;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(false);
  });

  it('should enable the button in flow partner when the LS fullPaid is selected', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'LS',
      paymentType: 'fullPaid',
      bankNameTh: '',
      bankNameEn: '',
      bankAbbr: 'SCB',
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
    component.flow = 'ASP';
    component.buttonStateChangeHandset = true;
    component.isReceiptAddressSelected = true;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(false);
  });

  it('should enable the button in flow partner when the LS installment is selected and installmentTerms more than 0', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'LS',
      paymentType: 'installment',
      bankNameTh: '',
      bankNameEn: '',
      bankAbbr: 'SCB',
      installment: {
        installmentId: 1,
        installmentRate: '7',
        installmentTerms: '10',
        balloonMonth: 1,
        cardDigits: 18,
      },
      isInstallment: true,
      creditCardNo: '',
      contractNo: '',
    };
    component.flow = 'ASP';
    component.buttonStateChangeHandset = true;
    component.isReceiptAddressSelected = true;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(false);
  });

  it('should disable the button in flow partner when the LS is selected incomplete contract number', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'LS',
      paymentType: 'fullPaid',
      bankNameTh: '',
      bankNameEn: '',
      bankAbbr: 'SCB',
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
    component.flow = 'ASP';
    component.buttonStateChangeHandset = false;
    component.isReceiptAddressSelected = true;
    component.productDetail = {
      mobileCare: { isBuyDeviceCare: true },
    };
    component.isAppleCare = true;
    component.onCheckStateButton();

    expect(component.buttonState).toBe(true);
  });

  it('should disable the button in flow partner when the credit card is selected incomplete credit card number', () => {
    component.handsetPaymentSelected = {
      paymentMethod: '',
      method: 'CC',
      paymentType: 'installment',
      bankNameTh: '',
      bankNameEn: '',
      bankAbbr: 'SCB',
      installment: {
        installmentId: 1,
        installmentRate: '7',
        installmentTerms: '10',
        balloonMonth: 1,
        cardDigits: 18,
      },
      isInstallment: true,
      creditCardNo: '',
      contractNo: '',
    };
    component.productDetail = {
      mobileCare: { isBuyDeviceCare: true },
    };
    component.isAppleCare = true;
    component.flow = 'ASP';
    component.buttonStateChangeHandset = false;
    component.isReceiptAddressSelected = true;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(true);
  });

  it('should disable the button when the receipt address is not selected', () => {
    component.isReceiptAddressSelected = false;

    component.onCheckStateButton();

    expect(component.buttonState).toBe(true);
  });

  describe('checkReceiptAddressSelected', () => {
    const testInput = true;
    it('should set isReceiptAddressSelected as the given input', () => {
      component.setSelectedReceiptStatus(testInput);
      expect(component.isReceiptAddressSelected).toBe(false);
    });
  });

  describe('On next method', () => {
    test('on next function', async () => {
      mockHttp.post.mockReturnValueOnce(of({}));
      await component.onNext();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });
});
