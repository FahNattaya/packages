import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { AppState } from '../../store-ngrx/app.state';
import { HandsetListPageComponent } from './handset-list-page.component';
import { TokenService } from 'src/app/core/service/token.service';

describe('Handset-List PageComponent', () => {
  let component: HandsetListPageComponent;
  let store = {
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn() })),
    dispatch: jest.fn(),
  } as any as Store<AppState>;
  let router = {
    navigate: jest.fn(),
  } as any as Router;
  let tokenService: TokenService;

  let mockIDataSubProduct = {
    productType: 'productType',
    productSubtype: 'productSubtype',
    brand: 'brand',
    name: 'name',
    model: 'model',
    imageUrl:
      'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-gold-pureangles-1_1.jpg',
    normalPrice: '24500',
    promotionPrice: {
      min: '6420',
      max: '24500',
    },
  };

  beforeEach(async () => {
    component = new HandsetListPageComponent(router, store, tokenService);
  });

  it('should set the variable disabledButtonNext as input value', () => {
    let DISABLED = true;
    component.onDisabledButtonNext(DISABLED);
    expect(component.disabledButtonNext).toBe(DISABLED);
  });

  it('should set allModelByProduct as input value', () => {
    component.setDataProduct(mockIDataSubProduct);
    let updatedModelData = {
      producType: component.selectedModelData.productType,
      brand: component.selectedModelData.brand,
      model: component.selectedModelData.model,
      productSubtype: component.selectedModelData.productSubtype,
      locationCode: '1100',
    };
    expect(updatedModelData).toEqual(updatedModelData);
  });
  it('should call setDataProduct when call onSelectProduct', () => {
    jest.spyOn(component, 'setDataProduct');
    component.onSelectProduct(mockIDataSubProduct);
    expect(component.setDataProduct).toBeCalled();
  });

  it('should sub to product state when call onNext and navigate', () => {
    component.productState$.subscribe = jest
      .fn()
      .mockImplementation((fn) => fn({ isLoaded: true }));
    component.onNext();
    expect(component.productState$.subscribe).toBeCalled();
    expect(router.navigate).toBeCalledWith([PathConstant.PRODUCT_SELLING_PAGE]);
  });
});
