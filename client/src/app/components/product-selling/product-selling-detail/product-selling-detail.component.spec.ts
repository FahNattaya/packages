import { ProductSellingDetailComponent } from './product-selling-detail.component';
import { IProductDetail, IProductStockRequest, IProductStockResponse } from 'src/app/shared/model/product.model';
import { SharedService } from '../../../shared/service/shared.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { ISeller } from 'src/app/shared/model/seller.model';
import { IDataProductDetailPage } from 'src/app/shared/model/product.model';
import { of } from 'rxjs';

const MOCK_TEST_DATA: IProductDetail = {
  productType: 'DEVICE',
  productSubtype: 'HANDSET',
  brand: 'APPLE',
  productName: 'iPhone 11 Pro 256GB',
  model: 'IPHONE11P256',
  normalPrice: '48,900',
  location: '1100',
  colors: [
    {
      colorId: 1,
      code: '#E5E1C4',
      name: 'Cream',
      stock: '100',
      imageUrl: [
        'https://media-cdn.bnn.in.th/11944/Apple-iPhone-11-64GB-Black-2.jpg',
        'https://media-cdn.bnn.in.th/11946/Apple-iPhone-11-64GB-Black-4-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11945/Apple-iPhone-11-64GB-Black-3-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11943/Apple-iPhone-11-64GB-Black-1-square_medium.jpg',
      ],
    },
    {
      colorId: 2,
      code: '#425051',
      name: 'Green',
      stock: '82',
      imageUrl: [
        'https://media-cdn.bnn.in.th/11943/Apple-iPhone-11-64GB-Black-1-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11944/Apple-iPhone-11-64GB-Black-2.jpg',
        'https://media-cdn.bnn.in.th/11945/Apple-iPhone-11-64GB-Black-3-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11946/Apple-iPhone-11-64GB-Black-4-square_medium.jpg',
      ],
    },
    {
      colorId: 3,
      code: '#DED4ED',
      name: 'Lavender',
      stock: '40',
      imageUrl: [
        'https://media-cdn.bnn.in.th/11945/Apple-iPhone-11-64GB-Black-3-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11944/Apple-iPhone-11-64GB-Black-2.jpg',
        'https://media-cdn.bnn.in.th/11946/Apple-iPhone-11-64GB-Black-4-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11943/Apple-iPhone-11-64GB-Black-1-square_medium.jpg',
      ],
    },
    {
      colorId: 4,
      code: '#1F1F1F',
      name: 'Phantom Black',
      stock: '1',
      imageUrl: [
        'https://media-cdn.bnn.in.th/11946/Apple-iPhone-11-64GB-Black-4-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11944/Apple-iPhone-11-64GB-Black-2.jpg',
        'https://media-cdn.bnn.in.th/11943/Apple-iPhone-11-64GB-Black-1-square_medium.jpg',
        'https://media-cdn.bnn.in.th/11945/Apple-iPhone-11-64GB-Black-3-square_medium.jpg',
      ],
    },
  ],
};


describe('ProductSellingDetailComponent', () => {
  let component: ProductSellingDetailComponent;
  const mockSharedService = { numberWithComma: jest.fn() } as any as SharedService;
  const mockStockService = {
    getStockList: jest.fn().mockImplementation(() => ({
      subscribe: jest.fn()
    }))
  } as any as ProductService;

  // const mockStore = { 
  //   dispatch: jest.fn(),
  //   select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn() })),
  // } as any;
  beforeEach(() => {
    component = new ProductSellingDetailComponent(
      mockSharedService,
      mockStockService
    );
  });

  it('Should created a product-selling-detail component', () => {
    expect(component).toBeTruthy();
  });

  it('Image active should be change', () => {
    const newImageList = MOCK_TEST_DATA.colors[0].imageUrl;

    component.onSetImageList(newImageList);

    expect(component.imageList).toBe(newImageList);
  });

  it('Image list should be change', () => {
    const newImage = MOCK_TEST_DATA.colors[0].imageUrl[0];

    component.onSelectImage(newImage);

    expect(component.imageActive).not.toEqual('');
    expect(component.imageActive).toBe(newImage);
  });

  it('Image list and Color should be change', () => {
    const COLOR_ID = 2;
    component.productDetail = MOCK_TEST_DATA
    const newImageList = MOCK_TEST_DATA.colors.find(
      (data) => data.colorId === COLOR_ID
    )?.imageUrl!;

    component.onSelectColor(COLOR_ID);
    component.onSetImageList(newImageList);
    component.onSelectImage(newImageList?.[0]);

    expect(component.colorActive).toBe(COLOR_ID);
    expect(component.imageList).toStrictEqual(newImageList);
    expect(component.imageActive).toStrictEqual(newImageList?.[0]);
  });

  it('Stock should be increase', () => {
    component.onIncrease();
    expect(component.stock).toBe(2);
  });

  it('Data should be ready for use', () => {
    expect(MOCK_TEST_DATA).not.toBeUndefined();
    component.productDetail = MOCK_TEST_DATA;
    expect(component.productDetail).not.toBeUndefined();
    const product = component.productDetail;
    component.colorActive = product.colors[0].colorId;
    component.imageList = product.colors[0].imageUrl;
    component.imageActive = product.colors[0].imageUrl[0];
    expect(component.colorActive).toBe(1);
    expect(component.imageList).toHaveLength(4);
    expect(component.imageActive).toEqual(MOCK_TEST_DATA.colors[0].imageUrl[0]);
  });

  it('Price should be have a comma', () => {
    const price = MOCK_TEST_DATA.normalPrice;
    component.numberWithComma(price);
    expect(price).toContain(',');
  });

  it('disable decrease when stock is down to 1', () => {
    component.stock = 2;
    component.onDecrease();
    expect(component.stock).toBe(1);
    expect(component.isDisabledDecreaseStock).toBeTruthy;
  });

  it('should not call getStockList when not have subStockCode', () => {
    component.stockConfig = {
      subStockCode: '',
      stockType: 'stockType'
    }
    component.productDetail = {
      productType: 'productType',
      productSubtype: 'productSubtype',
      brand: 'brand',
      model: 'model'
    } as IProductDetail
    const getStockListSpy = jest.spyOn(mockStockService, 'getStockList');

    component.onSetStock();

    expect(getStockListSpy).not.toHaveBeenCalled();
  })

  const mockStockRes: IProductStockResponse = {
    "response": {
      "resultCode": "20000",
      "resultDescription": "Success",
      "developerMessage": "Success",
      "listData": [
        {
          "locationCode": "97439",
          "locationName": "TestEasyApp_เอส พี วี ไอ สาขา โลตัส ระยอง_ASP",
          "productStock": [
            {
              "brand": "APPLE",
              "model": "IPHONEXSM256",
              "productName": "APPLE IPHONEXSM256",
              "productType": "DEVICE",
              "productSubType": "HANDSET",
              "company": "AWN",
              "totalStockAval": '1523',
              "colorStock": [
                {
                  "color": "GOLD",
                  "stockAval": '302'
                },
                {
                  "color": "SPACE GREY",
                  "stockAval": '1126'
                },
                {
                  "color": "SILVER",
                  "stockAval": '95'
                }
              ]
            }
          ]
        },
        {
          "locationCode": "97440",
          "locationName": "เอส พี วี ไอ สาขา ห้างบิ๊กซี อรัญประเทศ_ASP",
          "productStock": [
            {
              "brand": "APPLE",
              "model": "IPHONEXSM256",
              "productName": "APPLE IPHONEXSM256",
              "productType": "DEVICE",
              "productSubType": "HANDSET",
              "company": "AWN",
              "totalStockAval": '100',
              "colorStock": [
                {
                  "color": "SPACE GREY",
                  "stockAval": '100'
                }
              ]
            }
          ]
        }
      ]
    }
  }

  it('should call getStockList when have subStockCode', () => {
    component.stockConfig = {
      subStockCode: 'subStockCode',
      stockType: 'stockType'
    }
    component.productDetail = {
      productType: 'productType',
      productSubtype: 'productSubtype',
      brand: 'brand',
      model: 'model'
    } as IProductDetail
    component.userData = {
      locationCode: '4289'
    } as ISeller
    const getStockListSpy = jest.spyOn(mockStockService, 'getStockList').mockReturnValue(of(mockStockRes));

    component.onSetStock();

    expect(getStockListSpy).toHaveBeenCalled();
  })

  it('should update productDetail and call methods when dataFromStore changes', () => {
    const mockProductDetail: IDataProductDetailPage = {
      productDetail: {
        productType: 'productType',
        productSubtype: 'productSubtype',
        brand: 'brand',
        model: 'model',
        colors: [{
          colorId: 0,
          code: 'code',
          name: 'name',
          stock: 'stock',
          imageUrl: ['imageUrl1', 'imageUrl2']
        }]
      }
    } as IDataProductDetailPage
    const changes: any = {
      dataFromStore: {
        currentValue: {
          productDetail: 'new data'
        },
      },
    };

    component.dataFromStore = mockProductDetail

    component.ngOnChanges(changes);

    expect(component.productDetail).toBe(mockProductDetail.productDetail);
  });

  it('should call ais stock online when partner is ASP', () => {
    component.userData = {
      locationCode: '4289',
      outChnSalesCode: 'ASP'
    } as ISeller
    const mockReqStock: IProductStockRequest = {
      stockType: 'stockType',
      locationCodeSource: 'locationCodeSource',
      locationCodeDest: 'locationCodeDest',
      productType: 'productType',
      productSubType: 'productSubType',
      subStock: 'subStock',
      brand: 'brand',
      model: 'model',
    }

    const getStockListSpy = jest.spyOn(mockStockService, 'getStockList').mockReturnValue(of(mockStockRes));

    component.getStockOnline(mockReqStock);

    expect(getStockListSpy).toHaveBeenCalledWith({
      stockType: 'AIS',
      locationCodeSource: 'locationCodeSource',
      locationCodeDest: '4289',
      productType: 'productType',
      productSubType: 'productSubType',
      subStock: 'OLS',
      brand: 'brand',
      model: 'model'
    });
  })

  it('should call stock online follow with stockType from config', () => {
    component.userData = {
      locationCode: '4289',
      outChnSalesCode: 'otherPartner'
    } as ISeller
    const mockReqStock: IProductStockRequest = {
      stockType: 'stockType',
      locationCodeSource: 'locationCodeSource',
      locationCodeDest: 'locationCodeDest',
      productType: 'productType',
      productSubType: 'productSubType',
      subStock: 'subStock',
      brand: 'brand',
      model: 'model',
    }

    const getStockListSpy = jest.spyOn(mockStockService, 'getStockList').mockReturnValue(of(mockStockRes));

    component.getStockOnline(mockReqStock);

    expect(getStockListSpy).toHaveBeenCalledWith({
      stockType: 'stockType',
      locationCodeSource: 'locationCodeSource',
      locationCodeDest: '4289',
      productType: 'productType',
      productSubType: 'productSubType',
      subStock: 'OLS',
      brand: 'brand',
      model: 'model'
    });
  })
});
