import { Store } from '@ngrx/store';
import { AppState } from '../../../store-ngrx/app.state';
import { StockMyShopComponent } from './stock-my-shop.component';
import { of } from 'rxjs';
import { IListData } from 'src/app/shared/model/product.model';

const mockStockData: IListData[] = [
  {
    locationCode: '1100',
    locationName: 'สาขาอาคารเอไอเอส 2',
    productStock: [
      {
        productName: 'APPLE IPHONE864',
        totalStockAval: '144',
        colorStock: [
          {
            color: 'GOLD',
            stockAval: '79',
          },
          {
            color: 'SILVER',
            stockAval: '51',
          },
          {
            color: 'SPACE GREY',
            stockAval: '14',
          },
        ],
      } as any,
    ],
  },
];

describe('StockMyShopComponent', () => {
  let component: StockMyShopComponent;
  let store = {
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn() })),
  } as unknown as Store<AppState>;

  beforeEach(async () => {
    component = new StockMyShopComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[ngOnInit] should be initial data', () => {
    const mockIsLoaded: boolean = true;

    component.ngOnInit();
    const mockObservable = of(mockIsLoaded);
    component.isLoaded$ = mockObservable;
    mockObservable.subscribe(() => {
      component.onGetStockList();
    });

    expect(component.stockListData).toEqual([]);
    expect(component.isEmptyStock).toEqual(false);
    expect(component.errorText).toEqual('');
  });

  it('Stock List Data should be assign', () => {
    const mockObservable = of(mockStockData);
    component.selectStockData$ = mockObservable;
    mockObservable.subscribe(() => {
      component.onSetData();
    });

    expect(component.stockListData).toEqual(mockStockData);
    expect(component.isEmptyStock).toEqual(false);
    expect(component.errorText).toEqual('');
  });
});
