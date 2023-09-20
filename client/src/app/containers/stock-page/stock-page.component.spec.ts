import { StockPageComponent } from './stock-page.component';
import { IStockTabs,IHandset, ISubProduct } from 'src/app/shared/model/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store-ngrx/app.state';
import { getSelectedAllModel } from '../../store-ngrx/selectors/product.selectors';

describe('StockPageComponent', () => {
  let component: StockPageComponent;
  let store = {
    select: jest.fn().mockImplementation(() => {
      return { subscribe: jest.fn() };
    }),
    dispatch: jest.fn(),
  } as unknown as Store<AppState>;
  let mockConfigSaleChannelService = {
    getConfig: jest.fn().mockImplementation(() => {
      return { subscribe: jest.fn() };
    }),
  };
  beforeEach(async () => {
    component = new StockPageComponent(
      store,
      mockConfigSaleChannelService as any
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tabSeleted).toEqual('my-shop');
  });

  it('[tab data] should be equal to this mock value.', () => {
    const mockTabs: IStockTabs[] = [
      {
        key: 'my-shop',
        name: 'My Shop',
        dataTestId: 'tabMyShop',
      },
      {
        key: 'other-shop',
        name: 'สาขาอื่น',
        dataTestId: 'tabOtherShop',
      },
      {
        key: 'online-store',
        name: 'AIS Online Store',
        dataTestId: 'tabOnlineStock',
      },
    ];
    expect(component.tabs).toEqual(mockTabs);
  });

  describe('test function', () => {
    let mockSubProduct: ISubProduct = {
      name: 'iPhone Xs MAX',
      model: 'model',
      imageUrl:
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-gold-pureangles-1_1.jpg',
      normalPrice: {
        min: '6420',
        max: '24500',
      },
      promotionPrice: {
        min: '-5580',
        max: '24500',
      },
    };
    let mockModelDetail: IHandset = {
      brand: 'brand',
      name: 'name',
      model: 'model',
      imageUrl: 'imageUrl',
      itemType: 'imageType',
      flag5G: 'flag5G',
      dv: [],
      productType: 'productType',
      productSubtype: 'productSubtype',
      normalPrice: {
        min: '6420',
        max: '24500',
      },
      promotionPrice: {
        min: '-5580',
        max: '24500',
      },
      subProducts: [mockSubProduct],
    };

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA2MTAyMzU5IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiQ2hpcmFwaGFuIiwibGFzdG5hbWUiOiJSYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA4OTg5MTQ4ODkiLCJzdWIiOiIiLCJwaW5Db2RlIjoiMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJTdXBlcnZpc29yIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjg2Mjk4NTU3LCJleHAiOjE2ODYzODQ5NTd9.0acqF4FCsn9qcNd8CcoaFZR6jFR8bbnIZ-dvXsMlFvE';

    it('[selectTab] should be called getDataFromStock if tab my-shop or other-shop is selected', () => {
      jest.spyOn(component, 'getDataFromStock');
      component.modelDetail = mockModelDetail;

      component.selectTab('online-store');
      expect(component.getDataFromStock).toBeCalledTimes(1);

      component.selectTab('my-stock');
      expect(component.getDataFromStock).toBeCalledTimes(2);

      component.selectTab('other-shop');
      expect(component.getDataFromStock).toBeCalledTimes(2);
    });

    it('[selectTab] should change the tabSeleted value', () => {
      component.selectTab('online-store');
      expect(component.tabSeleted).toEqual('online-store');
    });

    it('[getDecodedAccessToken] should return data', () => {
      expect(component.getDecodedAccessToken(token).locationCode).toEqual(
        '1100'
      );
      expect(component.getDecodedAccessToken('')).toBeInstanceOf(Error);
    });

    it('[getDataFromModel] should be call', () => {
      component.selectedModel$.pipe = jest.fn().mockImplementation(() => {
        return { subscribe: jest.fn() };
      }) as any;
      component.getDataFromModel();
      component.ngOnInit();
      expect(store.select).toHaveBeenCalledWith(getSelectedAllModel);
    });
  });
});
