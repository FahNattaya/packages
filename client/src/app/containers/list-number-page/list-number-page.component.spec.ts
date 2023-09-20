import { ListNumberPageComponent } from './list-number-page.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store-ngrx/app.state';
import { ErrorService } from 'src/app/core/service/error.service';
import { CreateTransactionService } from 'src/app/shared/service/createTransaction.service';
import { of } from 'rxjs';
import { TokenService } from 'src/app/core/service/token.service';

describe('ListNumberPageComponent', () => {
  let component: ListNumberPageComponent;
  let router = {
    navigate: jest.fn()
  } as unknown as Router;
  let store = {
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn().mockReturnValue(of(false)) })),
  } as unknown as Store<AppState>;
  let errorService: ErrorService
  let tokenService: TokenService
  let createTransactionService: CreateTransactionService

  beforeEach(() => {
    component = new ListNumberPageComponent(
      router,
      store,
      errorService,
      tokenService,
      createTransactionService
    );
  });

  it('should create a list-number-page component', () => {
    expect(component).toBeTruthy();
  });


  it('should set the activePill property to the specified value when setActivePill(pill: number) is called', () => {
    const pill = 2;

    component.setActivePill(pill);

    expect(component.activePill).toBe(pill);
  });

  it('should set the disabledButtonNext is false when have phone number', () => {
    const moblieNo = '0934000624';

    component.onEmitMoblieNo(moblieNo);

    expect(component.disabledButtonNext).toBe(false);
  });

});
