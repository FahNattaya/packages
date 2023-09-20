import {
  ICustomer,
  IVerifyingOtpResponse,
} from './../../../shared/model/customer.model';
import {
  IExistingMobileCare,
  IMobileCareCondition,
  IMobileCareProtection,
  IMobileCareServiceType,
  IMobileCareServiceTypeOption,
} from '../../../shared/model/service-care.model';
import { ProductSellingServiceCareComponent } from './product-selling-service-care.component';
import { ServiceCareService } from 'src/app/shared/service/service-care.service';
import { of } from 'rxjs/internal/observable/of';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import {
  IMobileCare,
  IMobileCareSelected,
} from 'src/app/shared/model/service-care.model';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ISendingOtpResponse } from 'src/app/shared/model/customer.model';
import { mockExistingCareServices } from 'src/app/mock/mock.data.existing-care-service';

describe('ProductSellingServiceCareComponent', () => {
  let component: ProductSellingServiceCareComponent;
  let fixture: ComponentFixture<ProductSellingServiceCareComponent>;
  let mockStore: Partial<Store>;
  let mockServiceCareService: Partial<ServiceCareService>;
  let mockCustomerService: Partial<CustomerService>;
  let mockMobileNo = '0934009885';

  beforeEach(() => {
    mockStore = {
      select: jest.fn(() => of({})),
      subscribe: jest.fn(),
    };

    mockServiceCareService = {
      getMobileCare: jest.fn(() => of([{}])),
    };

    mockCustomerService = {
      getSubScriptionAccount: jest.fn(() => of({} as ICustomer)),
      sendOtp: jest.fn(() => of({} as ISendingOtpResponse)),
      verifyOtp: jest.fn(() => of({} as IVerifyingOtpResponse)),
      getExistingMobileCare: jest.fn(() => of([{}] as IExistingMobileCare[])),
      getMaximumLimit: jest.fn(() =>
        of({ mobileCareLimit: 3 } as { mobileCareLimit: number }),
      ),
    };

    TestBed.configureTestingModule({
      declarations: [ProductSellingServiceCareComponent, AlertComponent],
      providers: [
        FormBuilder,
        { provide: Store, useValue: mockStore },
        { provide: ServiceCareService, useValue: mockServiceCareService },
        { provide: CustomerService, useValue: mockCustomerService },
      ],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(ProductSellingServiceCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.productType = 'AIS Mobile Care';
    component.formMobileCare.patchValue({ serviceType: 'nvim' });
    tick();
    component.productType = 'AppleCare+';
    component.formMobileCare.patchValue({ serviceType: 'nvim' });
    tick();
    expect(component).toBeTruthy();
  }));

  test('onselect not interest', () => {
    component.limitCareService.emit = jest.fn();
    component.onSelectNotInterest();
    expect(component.limitCareService.emit).toHaveBeenCalledWith(false);
  });

  describe('Service-cares', () => {
    it('should load mobile care service data successfully', () => {
      const mobileCareData = [] as IMobileCare[];
      component.mobileCareRequest = {
        handsetPrice: '',
        language: '',
        productType: '',
        productSubType: '',
        brand: '',
        model: '',
        productName: '',
        matCode: '',
        activeDate: '',
      };
      jest
        .spyOn(mockServiceCareService, 'getMobileCare')
        .mockReturnValue(of(mobileCareData));
      component.onGetMobileCare();

      expect(component.mobileCareService).toEqual(mobileCareData);
    });

    it('should change isCollapsed', () => {
      const isCollapse = false;
      component.onChangeExpanded(isCollapse);
      expect(component.isCollapsed).toEqual(true);
    });

    it('should set height of service type container', () => {
      const mobileCare = [
        {
          productType: 'AIS Care Plus',
          serviceType: {
            title: 'Service Type 1',
            option: [
              { name: 'Option 1', price: '100' },
              { name: 'Option 2', price: '200' },
            ],
          },
        },
      ] as IMobileCare[];
      const expectedHeight = 96;
      component.heightOfServiceType(mobileCare);
      expect(component.heightOfServiceTypeValue).toEqual(expectedHeight);
    });

    it('should set ignore selected value', () => {
      const expectedFormMobileCare = {
        mobileNo: null,
        otpCode: null,
        serviceType: null,
        email: null,
      };
      component.onSelectIgnore();
      expect(component.formMobileCare.value).toEqual(expectedFormMobileCare);
    });

    it('should set value when selectIgnore case', () => {
      component.currentService = 0;

      const expectedFormIgnoreCase = {
        serviceType: 'ไม่สนใจ',
        reason: component.notInterestWord,
      };
      component.onSelectIgnore();
      expect(component.currentService).toEqual(-1);
      expect(component.formIgnoreCase.value).toEqual(expectedFormIgnoreCase);
    });

    it('should set value when onSelectNotInterest', () => {
      const option = {
        name: '',
        price: '',
        promotionCode: '',
        offeringCode: '',
      };
      component.formIgnoreCase.patchValue({
        reason: '',
      });
      component.onSelectNotInterest;
      component.selectedMobileCare = {
        email: '',
        matCodeCarePlus: '',
        productType: '',
        title: '',
        option: option,
      };
      expect(component.selectedMobileCare).toEqual({
        email: '',
        matCodeCarePlus: '',
        productType: '',
        title: '',
        option: option,
      });
    });

    it('should set email value when onChangeEmail', () => {
      const email = 'test@test.com';
      const initialSelectedMobileCare = {};
      const formMobileCare = {
        get: jest.fn().mockReturnValue({ value: email }),
      };
      const selectedMobileCare = {
        ...initialSelectedMobileCare,
      } as IMobileCareSelected;
      const expectedSelectedMobileCare = {
        ...initialSelectedMobileCare,
        email,
      };
      component.formMobileCare = formMobileCare as any;
      component.selectedMobileCare = selectedMobileCare;

      component.onChangeEmail();

      expect(component.selectedMobileCare).toEqual(expectedSelectedMobileCare);
    });

    it('should set the selectedMobileCare object with the correct properties when selecting a mobileCare service type of AIS Care Plus', () => {
      const title = 'AIS Care Plus';
      const option = {
        name: 'Option 1',
        price: '100',
        promotionCode: 'PROMO1',
        offeringCode: '',
      };
      const productType = 'AIS Care Plus';
      const crossMatCode = undefined;
      component.onSelectServiceType(title, option, productType, crossMatCode);
      expect(component.selectedMobileCare).toEqual({
        email: '',
        productType: 'AIS Care Plus',
        title: 'AIS Care Plus',
        option: {
          name: 'Option 1',
          price: '100',
          promotionCode: 'PROMO1',
          offeringCode: '',
        },
        matCodeCarePlus: '',
      });
    });

    it('should update the current service index when a service is selected', () => {
      const indexService = 1;
      const service = {
        productType: 'AIS Care Plus',
        title: 'AIS Care Plus 1',
        service: 'AIS Care Plus 1',
        protection: [] as IMobileCareProtection[],
        condition: [] as IMobileCareCondition[],
        serviceFee: '',
        serviceType: {
          productType: 'productType',
          title: 'AIS Care Plus 1',
          options: [
            {
              name: 'AIS Care Plus 1',
              price: '100',
              promotionCode: 'AISCP1',
              offeringCode: '',
            },
          ] as IMobileCareServiceTypeOption[],
        } as unknown as IMobileCareServiceType,
      } as IMobileCare;
      const serviceType = {
        name: 'AIS Care Plus 1',
        price: '100',
        promotionCode: 'AISCP1',
        offeringCode: '',
      };
      component.onSelectedService(indexService, service, serviceType);
      expect(component.currentService).toEqual(indexService);
    });

    it('check form valid', () => {
      component.formMobileCare.setValue({
        mobileNo: '',
        otpCode: '',
        serviceType: '',
        email: '',
      });
      component.formIgnoreCase.setValue({
        reason: '',
        serviceType: '',
      });
      component.emitFormsValid();
    });
  });
  describe('Send OTP', () => {
    beforeEach(() => {
      component.showCountdown = jest.fn();
    });
    it('should  call customerService.sendOtp and showCountdown', () => {
      component.sendOtp();
      expect(mockCustomerService.sendOtp).toBeCalled();
    });
  });
  // describe('Verify OTP', () => {
  //   it('should send a request to verify OTP with correct data and receive a successful response', () => {
  //     const mockOtpData = {
  //       transactionID: 'xxxxxxxxx',
  //       isSuccess: 'true',
  //       description: 'mock data',
  //       code: '200',
  //       customer: {} as any as ICustomerAddress,
  //     };
  //     const mockMobileNo = '0934000624';
  //     const mockOtpCode = '1234';

  //     jest.spyOn(component, 'getOtpData').mockReturnValue(mockOtpData);
  //     jest.spyOn(component.formMobileCare, 'get').mockReturnValueOnce({
  //       value: mockMobileNo,
  //     } as any);
  //     jest.spyOn(component.formMobileCare, 'get').mockReturnValueOnce({
  //       value: mockOtpCode,
  //     } as any);
  //     jest.spyOn(mockCustomerService, 'verifyOtp').mockReturnValue;

  //     component.verifyOtp();

  //     expect(component.getOtpData).toHaveBeenCalled();
  //     expect(mockCustomerService.verifyOtp).toHaveBeenCalledWith({
  //       msisdn: '934000624',
  //       pwd: mockOtpCode,
  //       transactionID: mockOtpData.transactionID,
  //     });
  //   });
  // });
  describe('getCurrentLimitMobileCare', () => {
    it('should call to getMaximumLimit in customer service', () => {
      let customerServiceSpy = jest.spyOn(
        mockCustomerService,
        'getMaximumLimit',
      );
      component.getCurrentLimitMobileCare();
      expect(customerServiceSpy).toBeCalled();
    });

    it('should return a value of limit of mobile care', async () => {
      let result = await component.getCurrentLimitMobileCare();
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('updateMobileCareData', () => {
    it('should call to getExistingMobileCare in customer service with the given mobile no', () => {
      let customerServiceSpy = jest.spyOn(
        mockCustomerService,
        'getExistingMobileCare',
      );
      component.formMobileCare.patchValue({ mobileNo: mockMobileNo });
      component.updateMobileCareData();
      expect(customerServiceSpy).toBeCalledWith(mockMobileNo);
    });
    it('should update existing mobile cares data on existingMobileCares variable', async () => {
      component.formMobileCare.patchValue({ mobileNo: mockMobileNo });
      jest
        .spyOn(mockCustomerService, 'getExistingMobileCare')
        .mockReturnValue(of(mockExistingCareServices));

      const expectData = await component.updateMobileCareData();
      expect(expectData).toBe(mockExistingCareServices);
    });
  });

  describe('checkCurrentMobileCares', () => {
    it('should call method getCurrentLimitMobileCare to get limit of mobile care', () => {
      let methodSpy = jest.spyOn(component, 'getCurrentLimitMobileCare');
      component.checkCurrentMobileCares();
      expect(methodSpy).toBeCalled();
    });
    it('should call method updateMobileCareData to update current mobile care data', async () => {
      let methodSpy = jest.spyOn(component, 'updateMobileCareData');
      await component.checkCurrentMobileCares();
      expect(methodSpy).toBeCalled();
    });
    it('should update visibility of package modal if the number of current cares limit greater than or equal to maximum limit', async () => {
      component.formMobileCare.patchValue({ mobileNo: mockMobileNo });
      jest
        .spyOn(mockCustomerService, 'getExistingMobileCare')
        .mockReturnValue(of(mockExistingCareServices));

      const expectData = await component.updateMobileCareData();
      expect(expectData).toBe(mockExistingCareServices);
    });
  });
});
