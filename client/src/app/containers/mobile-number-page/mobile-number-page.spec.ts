import { Router } from '@angular/router';
import { MobileNumberPageComponent } from './mobile-number-page';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { saveMoblieNo } from 'src/app/store-ngrx/actions/customer.action';
import { of } from 'rxjs';
import { CreateTransactionService } from 'src/app/shared/service/createTransaction.service';

describe('MobileNumberPageComponent', () => {
  let component: MobileNumberPageComponent;
  let createTransactionService: CreateTransactionService = {
    onReserveStock: jest.fn(),
  } as any;
  let router: Router = {
    navigate: jest.fn(),
  } as any;
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

  beforeEach(() => {
    component = new MobileNumberPageComponent(
      router,
      store,
      createTransactionService
    );
  });

  it('should create a mobile-number-page component', () => {
    expect(component).toBeTruthy();
  });
  it('should activeNextBtn is false whene formContrill is length !== 10', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('093400989');
    expect(component.activeNextBtn).toBe(true);
  });
  it('should activeNextBtn is false whene formContrill is length === 10', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('0934009898');
    expect(component.activeNextBtn).toBe(false);
  });
  it('should set phone number action call store', () => {
    component.ngOnInit();
    component.mobileNoAndIdNoInput.setValue('09876543210');
    component.onNext();
    expect(createTransactionService.onReserveStock).toHaveBeenCalledWith();
    expect(store.dispatch).toHaveBeenCalledWith(
      saveMoblieNo({
        mobileNo: '09876543210',
      })
    );
  });
});
