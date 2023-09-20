import { FormBuilder } from '@angular/forms';
import { FormImeiComponent } from './form-imei.component';
import { ProductService } from '../../service/product.service';
import { TokenService } from 'src/app/core/service/token.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store-ngrx/app.state';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { SharedService } from '../../service/shared.service';

const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFTUE9UTzM5IiwidGltZXN0YW1wIjoiMjAyMzA4MzExMDEwIiwibG9jYXRpb25Db2RlIjoiOTc0MzkiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IuC4lOC4suC4o-C4suC4geC4suC4meC4leC5jCIsImxhc3RuYW1lIjoiLiIsInNoYXJlZFVzZXIiOiJBU1BPVE8zOSIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTUCIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IiIsInN1YiI6IlBBUlRORVJMREFQIiwicGluQ29kZSI6IiIsImF1dGhlbnRpY2F0aW9uIjoibmV3TG9naW4iLCJsb2NhdGlvbk9ubGluZSI6IiIsImZsYWdVc2VyVHlwZSI6IlNIQVJFIiwicm9sZUFjaW0iOiJBU1AiLCJvdXRQb3NpdGlvbiI6Ik1hbmFnZXIiLCJvdXRDaG5TYWxlcyI6IkFJUyBieSBQYXJ0bmVyIiwib3V0Q2huU2FsZXNDb2RlIjoiQVNQIiwib3UiOiJQQVJUTkVSIiwiaWF0IjoxNjkzNDUxNDAyLCJleHAiOjk5OTk5OTk5OTl9.Vr05CYMEo6zUnhpFjfIKwzKjlUN9mlSa2X4CsLM4PpY';

const httpMock = {
  post: jest.fn(),
  get: jest.fn(),
};

const sharedService = new SharedService();

describe('FormImeiComponent', () => {
  const form: FormBuilder = new FormBuilder();
  const router: Router = { navigate: jest.fn() } as any;
  const tokenService: TokenService = new TokenService({
    get: jest.fn().mockReturnValue(MOCK_TOKEN),
  } as any);
  let store: Store<AppState> = { dispatch: jest.fn() } as any;
  let component: FormImeiComponent;
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService(
      httpMock as any,
      sharedService,
      {} as any,
      tokenService,
    );
    component = new FormImeiComponent(
      form,
      productService,
      tokenService,
      store,
      router,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('on init when instanciate in cart page', () => {
    component.isCartPage = true;
    store.select = jest.fn().mockReturnValueOnce(of({ imei: '1234' }));
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  test('on changes', () => {
    component.ngOnChanges({
      resetForm: { currentValue: '1', previousValue: '2' },
    } as any);
    expect(component.isSuccess).toBeFalsy();
    expect(component.isLoading).toBeFalsy();
  });

  test('on scan success', () => {
    component.onScanSuccess('imei CODE');
    expect(component.imeiCode).toEqual('imei CODE');
    expect(component.isScanImei).toBeFalsy();
  });

  describe('check imei', () => {
    it('check imei with success response', () => {
      httpMock.post.mockReturnValueOnce(of({ data: {} }));
      component.checkImei();
      expect(component.isSuccess).toBeTruthy();
    });

    it('check reset imei when error accoured ', () => {
      httpMock.post.mockReturnValueOnce(throwError(() => 'error'));
      component.checkImei();
      expect(component.isSuccess).toBeFalsy();
    });
  });

  describe('on next', () => {
    test('when data form has color', () => {
      httpMock.post.mockReturnValueOnce(
        of({
          products: [
            {
              colorName: 'red',
              images: { baseView: [{ image: { imageUrl: 'image' } }] },
            },
          ],
        }),
      );
      component.dataForm = { color: 'red' } as any;
      component.onNext();
      expect(store.dispatch).toHaveBeenCalled();
    });

    test('when no color in data form', () => {
      tokenService.getDataToken = jest
        .fn()
        .mockReturnValue({ locationCode: '1100' });
      httpMock.post.mockReturnValueOnce(
        of({
          products: [
            {
              colorName: 'red',
              images: { baseView: [{ image: { imageUrl: 'image' } }] },
            },
          ],
        }),
      );
      component.dataForm = {} as any;
      component.onNext();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('saveForm', () => {
    it('should set price and modelName using patchValue', () => {
      component.dataForm = {
        price: 25000,
        brand: 'APPLE',
        model: 'IPhone 12',
        color: 'GOLD',
      } as any;

      component.saveForm();
      expect(component.imeiForm.get('price')?.value).toBe(25000);
      expect(component.imeiForm.get('modelName')?.value).toBe(
        'APPLE IPhone 12 GOLD',
      );
    });

    it('should set default values when dataForm is undefined', () => {
      component.dataForm = {} as any;

      component.saveForm();
      expect(component.imeiForm.get('price')?.value).toBe(0.0);
      expect(component.imeiForm.get('modelName')?.value).toBe(
        'undefined undefined undefined',
      );
    });

    it('should set default values when dataForm properties are undefined', () => {
      component.dataForm = {
        brand: 'APPLE',
      } as any;

      component.saveForm();

      expect(component.imeiForm.get('price')?.value).toBe(0.0);
      expect(component.imeiForm.get('modelName')?.value).toBe(
        'APPLE undefined undefined',
      );
    });

    it('should set isSuccess to true', () => {
      component.dataForm = {} as any;

      component.saveForm();
      expect(component.isSuccess).toBeTruthy();
    });
  });

  describe('onChangeImei', () => {
    it('should reset the form and set isSuccess to false when imeiNo is empty', () => {
      component.imeiForm.setValue({
        imeiNo: '123456789',
        modelName: 'APPLE',
        price: 42.0,
      });

      component.onChangeImei({ value: '' } as HTMLInputElement);

      expect(component.imeiForm.get('imeiNo')?.value).toBe(null);
      expect(component.imeiForm.get('modelName')?.value).toBe(null);
      expect(component.imeiForm.get('price')?.value).toBe(null);
      expect(component.isSuccess).toBe(false);
    });

    it('should patch the form and set isSuccess to false when imeiNo is changed', () => {
      component.imeiForm.setValue({
        imeiNo: '123456789',
        modelName: 'APPLE',
        price: 42.0,
      });

      component.imeiCode = '1234';
      component.onChangeImei({ value: '987654321' } as HTMLInputElement);

      expect(component.imeiForm.get('imeiNo')?.value).toBe('987654321');
      expect(component.imeiForm.get('modelName')?.value).toBe('');
      expect(component.imeiForm.get('price')?.value).toBe('');
      expect(component.isSuccess).toBe(false);
    });

    it('should not change the form or isSuccess when imeiNo is not changed', () => {
      component.imeiForm.setValue({
        imeiNo: '123456789',
        modelName: 'APPLE',
        price: 42.0,
      });

      component.isSuccess = true;
      component.imeiCode = '123456789';
      component.onChangeImei({ value: '123456789' } as HTMLInputElement);

      expect(component.imeiForm.get('imeiNo')?.value).toBe('123456789');
      expect(component.imeiForm.get('modelName')?.value).toBe('APPLE');
      expect(component.imeiForm.get('price')?.value).toBe(42.0);
      expect(component.isSuccess).toBe(true);
    });
  });

  describe('checkImei', () => {
    it('check call api checkImeiDT success', () => {});
  });

  describe('onScanImei', () => {
    it('should toggle the isScanImei property', () => {
      component.isScanImei = true;

      component.onScanImei();
      expect(component.isScanImei).toBeFalsy();

      component.onScanImei();
      expect(component.isScanImei).toBeTruthy();
    });
  });
});
