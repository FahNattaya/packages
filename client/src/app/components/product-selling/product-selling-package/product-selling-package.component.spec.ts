import { of } from 'rxjs';
import { ProductSellingPackageComponent } from './product-selling-package.component';

describe('ProductSellingPackageComponent', () => {
  let component: ProductSellingPackageComponent;
  const mockStore: any = {
    dispatch: jest.fn(),
    select: jest.fn(),
  };
  beforeEach(async () => {
    component = new ProductSellingPackageComponent(mockStore);
  });

  it('should create', () => {
    mockStore.select = jest
      .fn()
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(of({}));
    component = new ProductSellingPackageComponent(mockStore);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  test('on changes when on cart page', () => {
    component.isCart = true;
    component.selectedTrade = {
      minnimumPackagePrice: '100',
    };
    component.ngOnChanges({
      productEditable: {
        currentValue: {
          trade: {
            requireChangePromotion: '',
          },
        },
      },
    } as any);
    expect(component.tradeData.minnimumPackagePrice).toEqual('100');
  });

  test('check select radio', ()=>{
    component.checkSelectedRadio();
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
