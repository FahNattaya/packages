import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { LocationService } from 'src/app/shared/service/location.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ReceiptAddressFormComponent } from './receipt-address-form.component';

describe('receipt-address-form-component', () => {
  let component: ReceiptAddressFormComponent;
  let locationService: LocationService;
  let formBuilder: FormBuilder;
  let formGroup: FormGroup;
  let store: any;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      post: jest.fn(),
      get: jest.fn(),
    };

    store = {
      select: jest.fn(),
      dispatch: jest.fn(),
    } as any;

    locationService = new LocationService(httpMock as any, new SharedService());
    formBuilder = new FormBuilder();
    formGroup = new FormGroup({});
    component = new ReceiptAddressFormComponent(
      locationService,
      formBuilder,
      store,
    );
  });

  test('Should init', () => {
    httpMock.get.mockReturnValueOnce(
      of({
        provinces: [
          { PROVINCE_NAME: 'a' },
          { PROVINCE_NAME: 'c' },
          { PROVINCE_NAME: 'b' },
        ],
        zipCodes: '300',
      }),
    );
    store.select.mockReturnValueOnce(of({}));
    component.formCanvas = { nativeElement: { addEventListener: jest.fn() } };
    component.ngOnInit();
    component.ngAfterViewInit();
    component.ngOnDestroy();
    expect(component.zipCode).toEqual('300');
    expect(component.province).toEqual([
      { PROVINCE_NAME: 'a' },
      { PROVINCE_NAME: 'b' },
      { PROVINCE_NAME: 'c' },
    ]);
  });

  test('email or hyphen validator', () => {
    const validator = component.emailOrHyphenValidator();
    const control = { value: 'hello' };
    expect(validator(control as any)?.['invalidEmailOrHyphen']).toBeTruthy();
    control.value = 'email@valid.com';
    expect(validator(control as any)).toBeNull();
  });

  test('should clear form when form canvas is closed', () => {
    component.submitted = true;
    component.zipCodeByTumbol = '1050';
    component.myForm = { resetForm: jest.fn() };
    component.closeForm();
    expect(component.zipCodeByTumbol).toBeFalsy();
    expect(component.submitted).toBeFalsy();
  });

  test('get ais form when flow is not partner', () => {
    component.shopType = 'AIS';
    component.aisShopForm.patchValue({ email: 'ais' });
    component.partnerForm.patchValue({ email: 'partner' });
    expect(component.formControl['email']['value']).toEqual('ais');
  });

  test('get partner form when flow is not partner', () => {
    component.shopType = 'PARTNER';
    component.aisShopForm.patchValue({ email: 'ais' });
    component.partnerForm.patchValue({ partnerEmail: 'partner' });
    expect(component.formControl['partnerEmail']['value']).toEqual('partner');
  });

  test('on submit form success for partner', () => {
    component.submitted = false;
    component.shopType = 'PARTNER';
    component.partnerForm = {
      inValid: false,
      status: '',
      get: jest.fn(),
    } as any;
    component.myForm = { resetForm: jest.fn() };
    component.onSubmit();
    expect(component.submitted).toBeFalsy();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  test('on submit form success for ais', () => {
    component.submitted = false;
    component.shopType = 'AIS';
    component.aisShopForm = {
      inValid: false,
      status: '',
      get: jest.fn(),
    } as any;
    component.myForm = { resetForm: jest.fn() };
    component.onSubmit();
    expect(component.submitted).toBeFalsy();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  test('on submit should not save if form invalid', () => {
    component.myForm = { resetForm: jest.fn() };
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should load address from state for ais shop', () => {
    store.select = jest
      .fn()
      .mockReturnValueOnce(of({ otherAddress: { room: 'AIS' } }));
    component.shopType = 'AIS';
    component.onEditForm();
    expect(component.aisShopForm.value['room']).toEqual('AIS');
  });

  it('should load address from state for partner shop', () => {
    store.select = jest
      .fn()
      .mockReturnValueOnce(of({ otherAddress: { name: 'ASC' } }));
    component.shopType = 'PARTNER';
    component.onEditForm();
    expect(component.partnerForm.value['partnerCustomerName']).toEqual('ASC');
  });

  it('should empty form if no data in state for partner', () => {
    store.select = jest.fn().mockReturnValueOnce(of({}));
    component.shopType = 'AIS';
    component.onBuilderFormAISShop = jest.fn();
    component.onEditForm();
    expect(component.onBuilderFormAISShop).toHaveBeenCalled();
  });

  it('should empty form if no data in state for partner', () => {
    store.select = jest.fn().mockReturnValueOnce(of({}));
    component.shopType = 'PARTNER';
    component.partnerForm.reset = jest.fn();
    component.onEditForm();
    expect(component.partnerForm.reset).toHaveBeenCalled();
  });

  test('map city fucntion', () => {
    const data = component.mapCities([{ CITY: 'a' }, { CITY: 'b' }]);
    expect(data).toEqual([{ CITY: 'a' }, { CITY: 'b' }]);
  });

  test('multifilter fucntion', () => {
    const data = component.multiFilter(
      [{ PROVINCE_ID: [1, 2, 3] }, { PROVINCE_ID: [2] }, { PROVINCE_ID: [1] }],
      { PROVINCE_ID: [1] },
    );
    expect(data).toEqual([{ PROVINCE_ID: [1, 2, 3] }, { PROVINCE_ID: [1] }]);
  });

  test('on select tumbol', () => {
    component.zipCode = [
      { ZIPCODE: 2, TUMBOL: ['a'], CITY: ['k'] },
      { ZIPCODE: 1, TUMBOL: ['a'], CITY: ['l'] },
      { ZIPCODE: 3, TUMBOL: ['o'], CITY: ['k'] },
    ] as any;
    component.onSelectedTumbol({ TUMBOL: 'a', CITY: 'l' });
    expect(component.zipCodeByTumbol).toEqual(1);
  });

  test('on select amphur', () => {
    component.address = [
      { CITY: 'A', tumbol: 'K' },
      { CITY: 'E', tumbol: 'O' },
      { CITY: 'U', tumbol: 'T' },
      { CITY: 'A', tumbol: 'I' },
    ] as any;
    component.onSelectedAmphur({ CITY: 'A' });
    expect(component.selectedAmphur).toEqual('A');
    expect(component.tumbol).toEqual([
      { CITY: 'A', tumbol: 'K' },
      { CITY: 'A', tumbol: 'I' },
    ]);
  });

  test('on select province', () => {
    component.onSelectProvice({ PROVINCE_NAME: 'K' });
    expect(component.selectedProvince).toEqual('K');
  });

  describe('getFilledOtherAddress', () => {
    const testString = 'AIS Customer';
    formGroup = new FormGroup({});
    formBuilder = new FormBuilder();
    formGroup.get = jest.fn();
    component = new ReceiptAddressFormComponent(
      locationService,
      formBuilder,
      store as any,
    );
    beforeEach(() => {
      component.aisShopForm.get('homeNo')?.patchValue(testString);
    });

    it('should return value of AIS form if shop type is AIS', () => {
      component.shopType = 'AIS';
      let result = component.getFilledOtherAddress();
      expect(result.homeNo).toEqual(testString);
    });
    it('should return value of PARTNER form if shop type is PARTNER', () => {
      component.shopType = 'PARTNER';
      let result = component.getFilledOtherAddress();
      expect(result.homeNo).toEqual('');
    });
  });
});
