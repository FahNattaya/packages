import { RecordedSalesComponent } from './recorded-sales.component';
import { ICustomerData } from 'src/app/shared/model/customer.model';
import { of } from 'rxjs';

describe('RecordedSalesComponent', () => {
  const testCustomerData = { customerName: 'testCustomer' } as ICustomerData;
  let component: RecordedSalesComponent;
  let store = {
    select: jest.fn(),
  };
  Object.defineProperty(window, 'location', {
    value: {
      href: '',
    },
  });
  beforeEach(async () => {
    component = new RecordedSalesComponent(store as any);
  });

  it('should create', () => {
    store.select = jest.fn().mockReturnValueOnce(of(testCustomerData));
    component = new RecordedSalesComponent(store as any);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('getCustomerData', () => {
    it('should get any customer data from store', () => {
      store.select = jest.fn().mockReturnValueOnce(of(testCustomerData));
      component = new RecordedSalesComponent(store as any);
      component.getCustomerData();
      expect(component.customerData).toEqual(testCustomerData);
    });
  });

  describe('directToMainMenu', () => {
    it('should navigate with the given url', () => {
      component.gotoHomePage();
      expect(window.location.href).toBe('/newlogin/landing');
    });
  });
});
