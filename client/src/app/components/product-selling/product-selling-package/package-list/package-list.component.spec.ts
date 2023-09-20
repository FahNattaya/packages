import {
  IContractFirstPack,
  IDataPackage,
} from '../../../../shared/model/product-package.model';
import { ICustomerData } from '../../../../shared/model/customer.model';
import { PackageListComponent } from './package-list.component';
import { of } from 'rxjs';
import { ISeller } from 'src/app/shared/model/seller.model';
import { loadMinimumPackages } from 'src/app/store-ngrx/actions/product-package.action';
import { ITrades } from 'src/app/shared/model/promotion.model';

describe('PackageListComponent', () => {
  let component: PackageListComponent;

  const mockStore = {
    overrideSelector: jest.fn(),
    dispatch: jest.fn(),
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn() })),
  };

  beforeEach(async () => {
    component = new PackageListComponent(mockStore as any);
    component.customerData = {
      mobileNo: '1234567890',
      idCardNo: '1234567890123',
    } as ICustomerData;
    component.tradeData = {
      tradeNo: '1235324',
      minnimumPackagePrice: 1000,
    } as ITrades;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('index greater than zero', () => {
    component.customerData = {
      mobileNo: '1234567890',
      idCardNo: '1234567890123',
    } as ICustomerData;
    component.userData = {
      locationCode: 'locationCode',
    } as ISeller;
    component.tradeData = {
      tradeNo: '1235324',
    } as ITrades;
    const mockData = {
      sanitizedName: 'sanitized name',
      subshelfTitle: 'title',
      tradeNo: '12354',
      mobileNo: '1234567890',
      idCardNo: '1234567890123',
    };
    component.toggleCollapse(1, mockData);
    expect(component.indexShowDataSubShelves).toEqual(1);
    expect(component.indexShowPackage).toEqual(-1);
  });

  it('should load minimum packages action', async () => {
    component.userData = {
      locationCode: 'locationCode',
    } as ISeller;
    component.customerData = {
      billingSystem: 'string',
    } as ICustomerData;
    component.contractFirstPackData = {} as IContractFirstPack;
    await component.saveMinimumPackageToStore('sanitizedName');
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      loadMinimumPackages({
        packageReq: {
          sanitizedName: 'sanitizedName',
          minimumPackagePrice: 1000,
          billingSystem: 'string',
          location: 'locationCode',
          orderType: '',
          productClass: 'Main',
          province: '',
          disctrict: '',
          subDistrict: '',
          contractPack: {} as IContractFirstPack,
        },
      })
    );
  });

  it('should set current promotion shelves index', () => {
    const promotionShelvesIndex = 2;
    component.onSelectPromotionShelves(promotionShelvesIndex);
    expect(component.currentPromotionShelvesIndex).toEqual(
      promotionShelvesIndex
    );
  });

  it('should getSelectPromotionShelves', () => {
    const spy = jest.spyOn(component.promotionShelvesData$, 'subscribe');
    component.getSelectPromotionShelves(0);
    expect(spy).toHaveBeenCalled();
  });

  it('should show selected promotion shelves data', () => {
    const index = 0;
    const data = [
      { title: 'title1', sanitizedName: 'sanitizedName1' },
      { title: 'title2', sanitizedName: 'sanitizedName2' },
    ];
    const promotionShelvesData$ = of(data);
    component.promotionShelvesData$ = promotionShelvesData$;
    component.getSelectPromotionShelves(index);
    expect(component.selectedPromotionShelvesData).toEqual(data[index]);
  });

  it('should get customer data called', () => {
    const subscribeSpy = jest.spyOn(component.customerData$, 'subscribe');
    component.getCustomerData();
    expect(subscribeSpy).toHaveBeenCalled();
  });

  // it('should subscribe tradeData$', () => {
  //   const spy = jest.spyOn(component.tradeData$, 'subscribe');
  //   component.getTradeInfo();
  //   expect(spy).toHaveBeenCalled();
  // });

  it('should sets index checkShowDetailPackage', () => {
    component.checkShowDetailPackage(1, 2, {} as IDataPackage);
    expect(component.indexShowPackage).toEqual(1);
  });
});
