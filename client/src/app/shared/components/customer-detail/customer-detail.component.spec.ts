import { SharedService } from '../../service/shared.service';
import { CustomerDetailComponent } from './customer-detail.component';

describe('CustomerDetailComponent', () => {
  const sharedService: SharedService = new SharedService();
  let component: CustomerDetailComponent;
  let mockStore: any = {
    dispatch: jest.fn(),
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn() })),
  };
  beforeEach(() => {
    component = new CustomerDetailComponent(mockStore, sharedService);
  });

  it('should create', () => {
    component.customer = {
      serviceYear: {
        year: 1,
        month: 1,
        day: 1,
      },
      customerName: 'name surname',
      mobileNo: '0891234567',
    } as any;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('Expend function should be expended', () => {
    const expended = false;
    component.onExpend(expended);
    expect(component.expended).toBe(true);
  });

  it('should update black list', () => {
    let fn: any;
    component.blackListLimitDataStore$.subscribe = jest
      .fn()
      .mockImplementation((f) => {
        fn = f;
      });
    component.onUpdateBlackList();
    fn({ message: 'unit test' });
    expect(component.blackListMessage).toEqual('unit test');
  });

  it('should update contract', () => {
    let fn: any;
    component.dataContractMobileStore$.subscribe = jest
      .fn()
      .mockImplementation((f) => {
        fn = f;
      });
    component.onUpdateContractMobile();
    fn({
      profileTypeList: [
        { contractList: [{ contractDetailList: [{ status: 'Active' }] }] },
      ],
    });
    expect(component.contactUsedMsg).toEqual(`คุณมีสัญญาอยู่ 1 สัญญา`);
  });
});
