import { AppState } from 'src/app/store-ngrx/app.state';
import { ReceiptAddressComponent } from './receipt-address.component';
import { Store } from '@ngrx/store';
import { ErrorService } from 'src/app/core/service/error.service';
import { of } from 'rxjs';

describe('ReceiptAddressComponent', () => {
  let component: ReceiptAddressComponent;
  let store: Store<AppState>;
  let errorService: ErrorService;

  beforeEach(async () => {
    errorService = new ErrorService();
    store = {} as any;
    component = new ReceiptAddressComponent(store, errorService);
  });

  it('should create', () => {
    store.select = jest
      .fn()
      .mockReturnValueOnce(of({ mobileNo: '00' }))
      .mockReturnValueOnce(of({ isError: false, otherAddress: {} }))
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(of({}));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create but has addresss', () => {
    store.select = jest
      .fn()
      .mockReturnValueOnce(of({ mobileNo: '' }))
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(of({ isError: false, otherAddress: {} }))
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(of({}));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('map address', () => {
    expect(component.mapAddress({ name: 'a', email: 'b' })).toEqual('a b');
    expect(component.mapAddress({ buildingName: 'ab' })).toEqual('ab');
    expect(component.mapAddress({ room: 'a', floor: 'b' })).toEqual(
      'ห้อง a ชั้น b',
    );
    expect(component.mapAddress({ moo: 'a', soi: 'b' })).toEqual(
      'หมู่ที่ a ซอย b',
    );
  });

  it('it destroy', () => {
    component.destroyed$ = { next: jest.fn(), complete: jest.fn() } as any;
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

  it('get address no customer data', () => {
    store.dispatch = jest.fn();
    store.select = jest.fn().mockReturnValueOnce(of(undefined));
    component.mobileNumber.patchValue('1234567890');
    component.isReceiptAddressSelected.emit = jest.fn().mockClear();
    component.customerAddress = [{ key: '123' } as any];
    component.getAddress();
  });

  it('get address has customer data', () => {
    store.dispatch = jest.fn();
    store.select = jest.fn().mockReturnValueOnce(of({}));
    component.mobileNumber.patchValue('1234567890');
    component.isReceiptAddressSelected.emit = jest.fn().mockClear();
    component.customerAddress = [{ key: '123' } as any];
    component.getAddress();
  });

  it('get address no mobile number', () => {
    store.dispatch = jest.fn();
    store.select = jest.fn().mockReturnValueOnce(of({}));
    component.isReceiptAddressSelected.emit = jest.fn().mockClear();
    component.customerAddress = [{ key: '123' } as any];
    Object.defineProperty(window, 'alert', { value: jest.fn() });
    component.getAddress();
  });
});
