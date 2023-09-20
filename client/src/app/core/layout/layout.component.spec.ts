import { LayoutComponent } from './layout.component';
import { of } from 'rxjs';
import { ICustomerData } from 'src/app/shared/model/customer.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store-ngrx/app.state';

describe('ProductSellingTradeComponent', () => {
  let component: LayoutComponent;
  let store: Store<AppState> = {
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn().mockImplementation(()=>({ unsubscribe: jest.fn()})) })),
  } as any;

  beforeEach(async () => {
    component = new LayoutComponent(store);
  });

  it('should update customer account when call updateCustomerAccount', () => {
    const mockCustomerData: ICustomerData = {
      title: 'นาย',
      customerName: 'ทดสอบ ระบบ',
      mobileNo: '0659330882',
      serviceYear: '2',
      chargeType: 'Prepaid',
      subscriptionState: 'Active',
    } as any;

    const mockObservable = of(mockCustomerData);
    component.accountData$ = mockObservable;
    mockObservable.subscribe(() => {
      component.updateCustomerAccount();
    });

    expect(component.customer).toEqual(mockCustomerData);
  });
  it('should call updateCustomerAccount when call ngOnInit', () => {
    jest.spyOn(component, 'updateCustomerAccount');
    component.ngOnInit();
    expect(component.updateCustomerAccount).toBeCalled();
  });
});
