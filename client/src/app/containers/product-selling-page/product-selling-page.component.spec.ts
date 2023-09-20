import { ProductSellingPageComponent } from './product-selling-page.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { SharedService } from 'src/app/shared/service/shared.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { ICampaignResponseData } from 'src/app/shared/model/promotion.model';
import { of } from 'rxjs';
import { IProductDetail } from 'src/app/shared/model/product.model';
import { ICustomerCriteria } from 'src/app/shared/model/mc-config.model';
import { ErrorService } from 'src/app/core/service/error.service';
import { Router } from '@angular/router';

let component: ProductSellingPageComponent;
let store: Store<AppState> = {
  select: jest.fn().mockReturnValue(of(['1', '2'])), // Mock your observable data here
  dispatch: jest.fn(),
} as any;

let cartService: CartService;
let promotionService = {
  getTradePromotion: jest.fn(),
};
let errorService: ErrorService;
let sharedService: SharedService = new SharedService();
let router : Router

const mockProductDetail: IProductDetail = {
  productType: 'DEVICE',
  productSubtype: 'HANDSET',
  brand: 'APPLE',
  productName: 'IPHONEXSM512',
  model: 'IPHONEXSM512',
  normalPrice: '57900',
  location: '1100',
  colors: [
    {
      colorId: 0,
      code: '#FBD7BD',
      name: 'GOLD',
      stock: '0',
      imageUrl: [
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-gold-pureangles-1_2.jpg',
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-gold-pureangles-2_1.jpg',
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-gold-pureangles-3_1.jpg',
      ],
    },
    {
      colorId: 1,
      code: '#4E4F54',
      name: 'SPACE GREY',
      stock: '0',
      imageUrl: [
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_3.jpg',
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-2_2.jpg',
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-3_2.jpg',
      ],
    },
    {
      colorId: 2,
      code: '#D1D3D2',
      name: 'SILVER',
      stock: '0',
      imageUrl: [
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-1_2.jpg',
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-2_1.jpg',
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-silver-pureangles-3_1.jpg',
      ],
    },
  ],
};

const mockCustomerConfigFlow: ICustomerCriteria[] = [
  {
    flowNameTh: 'เปิดเบอร์ใหม่',
    flowNameEN: '',
    codeID: '001',
    codeCPC: 'New Register',
    orderType: 'New Registration',
    menuCode: 'NEW',
    statusEnable: 'N',
    isShowCurrentPack: true,
    details: [
      {
        outChnSalesCode: ['AISSHOP', 'AISMINICORNER'],
        transactionType: 'NewRegisterAIS',
      },
      {
        outChnSalesCode: ['ASP', 'TELEWIZ', 'RETAILCHAIN', 'AISBUDDYEXCLUSIVE'],
        transactionType: 'NewRegisterASP',
      },
    ],
  },
  {
    flowNameTh: 'เปลี่ยนเป็นรายเดือน',
    flowNameEN: '',
    codeCPC: 'Convert Pre to Post',
    codeID: '002',
    orderType: 'Change Charge Type',
    menuCode: 'P2P',
    statusEnable: 'N',
    isShowCurrentPack: true,
    details: [
      {
        outChnSalesCode: ['AISSHOP', 'AISMINICORNER'],
        transactionType: 'ConvertPreToPostAIS',
      },
      {
        outChnSalesCode: ['ASP', 'TELEWIZ', 'RETAILCHAIN', 'AISBUDDYEXCLUSIVE'],
        transactionType: 'ConvertPreToPostASP',
      },
    ],
  },
  {
    flowNameTh: 'ย้ายค่าย',
    flowNameEN: '',
    codeID: '003',
    codeCPC: 'MNP',
    orderType: 'Port - In',
    menuCode: 'MNP',
    statusEnable: 'N',
    isShowCurrentPack: true,
    details: [
      {
        outChnSalesCode: ['AISSHOP', 'AISMINICORNER'],
        transactionType: 'Port-InAIS',
      },
      {
        outChnSalesCode: ['ASP', 'TELEWIZ', 'RETAILCHAIN', 'AISBUDDYEXCLUSIVE'],
        transactionType: 'Port-InASP',
      },
    ],
  },
  {
    flowNameTh: 'ลูกค้าปัจจุบัน',
    flowNameEN: '',
    codeID: '004',
    codeCPC: 'Existing',
    orderType: 'Change Promotion',
    menuCode: 'EXT',
    statusEnable: 'N',
    isShowCurrentPack: true,
    details: [
      {
        outChnSalesCode: ['AISSHOP', 'AISMINICORNER'],
        transactionType: 'ExistingAIS',
      },
      {
        outChnSalesCode: ['ASP', 'TELEWIZ', 'RETAILCHAIN', 'AISBUDDYEXCLUSIVE'],
        codeCPC: 'Existing',
        transactionType: 'ExistingASP',
      },
    ],
  },
  {
    flowNameTh: 'เครื่องเปล่าราคาปกติ',
    flowNameEN: '',
    codeID: '005',
    codeCPC: 'ALL',
    orderType: '',
    menuCode: 'ONLY',
    statusEnable: 'Y',
    isShowCurrentPack: true,
    details: [
      {
        outChnSalesCode: ['AISSHOP', 'AISMINICORNER'],
        transactionType: 'DeviceOnlyAIS',
      },
      {
        outChnSalesCode: ['ASP', 'TELEWIZ', 'RETAILCHAIN', 'AISBUDDYEXCLUSIVE'],
        transactionType: 'DeviceOnlyASP',
      },
    ],
  },
  {
    flowNameTh: 'เปิดเบอร์ใหม่+ย้ายค่าย',
    flowNameEN: '',
    codeCPC: 'New Register',
    codeID: '006',
    orderType: 'New Registration',
    menuCode: 'SHPL',
    statusEnable: 'N',
    isShowCurrentPack: true,

    details: [
      {
        outChnSalesCode: ['AISSHOP', 'AISMINICORNER'],
        transactionType: 'NewRegisterMNPAIS',
      },
      {
        outChnSalesCode: ['ASP'],
        transactionType: 'NewRegisterMNPASP',
      },
      {
        outChnSalesCode: ['TELEWIZ', 'AISBUDDYEXCLUSIVE'],
        transactionType: 'NewRegisterMNPTELEWIZ',
      },
      {
        outChnSalesCode: ['RETAILCHAIN'],
        transactionType: 'NewRegisterMNPRETAILCHAIN',
      },
    ],
  },
];

const mockCampaignData: ICampaignResponseData[] = [
  {
    campaignId: 1,
    campaignDesc: 'test',
    campaignName: 'test',
    imageUrl: 'imageUrl',
    icon: 'icon',
    recommendFlag: true,
    payAdvanceFlag: true,
    installmentFlag: true,
    maximumContract: 10,
    customerGroup: 'customerGroup',
    conditionCode: 'conditionCode',
    fullPaymentFlag: true
  },
  {
    campaignId: 2,
    campaignDesc: 'test2',
    campaignName: 'test2',
    imageUrl: 'imageUrl',
    icon: 'icon',
    recommendFlag: true,
    payAdvanceFlag: true,
    installmentFlag: true,
    maximumContract: 10,
    customerGroup: 'customerGroup',
    conditionCode: 'conditionCode',
    fullPaymentFlag: true
  },
  {
    campaignId: 3,
    campaignDesc: 'test3',
    campaignName: 'test3',
    imageUrl: 'imageUrl',
    icon: 'icon',
    recommendFlag: true,
    payAdvanceFlag: true,
    installmentFlag: true,
    maximumContract: 10,
    customerGroup: 'customerGroup',
    conditionCode: 'conditionCode',
    fullPaymentFlag: true
  },
];

const mockCriteria: ICustomerCriteria = {
  flowNameTh: 'เครื่องเปล่าราคาปกติ',
  flowNameEN: '',
  codeID: '005',
  codeCPC: 'ALL',
  orderType: '',
  menuCode: 'ONLY',
  statusEnable: 'Y',
  isShowCurrentPack: true,
  details: [
    {
      outChnSalesCode: ['AISSHOP', 'AISMINICORNER'],
      transactionType: 'DeviceOnlyAIS',
    },
    {
      outChnSalesCode: ['ASP', 'TELEWIZ', 'RETAILCHAIN', 'AISBUDDYEXCLUSIVE'],
      transactionType: 'DeviceOnlyASP',
    },
  ],
};

describe('ProductSellingPageComponent', () => {
  beforeEach(async () => {
    component = new ProductSellingPageComponent(
      cartService,
      promotionService as any,
      sharedService,
      errorService,
      store,
      router
    );
  });

  it('should create Product Selling Page', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component and set initial values', () => {
    expect(component.customerConfigFlow).toEqual([]);
    expect(component.customerCriteria).toBeUndefined();
    expect(component.backPageUrl).toBe(PathConstant.HANDSET_LIST_PAGE);
    expect(component.campaignData).toBeUndefined();
    expect(component.sellerData).toBeUndefined();
    expect(component.loading).toBe(false);
    expect(component.price).toBeUndefined();
    expect(component.productDetail).toBeUndefined();
    expect(component.textAddCartButton).toBe('ADD TO CART');
    expect(component.textBuyNowButton).toBe('BUY NOW');
    expect(component.trades).toEqual([]);
    expect(component.isDisabledButton).toBe(false);
    expect(component.isOutOfStockOnHand).toBe(true);
    expect(component.isCheckSelectedCampaign).toBe(true);
    expect(component.selectTrade).toBeUndefined();
    expect(component.selectedCampaign).toBe(0);
    expect(component.campaignDataSelected).toBeUndefined();
    expect(component.selectedCompany).toBe('');
    expect(component.selectedColor).toBe(0);
    expect(component.stockRes).toBeUndefined();
    expect(component.isDisabledCheckSelectPackage).toBeUndefined();
    expect(component.dataPackageSelected).toBeUndefined();
    expect(component.returnCode).toBe('');
    expect(component.tradeIsSelected).toBe(false);
    expect(component.tradeForPackage).toBeUndefined();
  });

  it('should set the selected package when called', () => {
    component.setSelectPackage();

    expect(component.dataPackageSelected).toEqual({
      title: '',
      detailTH: '',
      promotionCode: '',
      currentPackage: true,
      isDisable: false,
    });
  });

  it('should get color name', () => {
    component.selectedColor = 0;
    component.productDetail = mockProductDetail;

    expect(component.getColorName()).toBe('GOLD');
  });

  it('should select select criteria', () => {
    component.customerConfigFlow = mockCustomerConfigFlow;

    component.onSelectCriteria(mockCriteria);

    expect(component.selectedCriteria).toBe('005');
    expect(component.customerCriteria).toBe(mockCriteria);
  });

  it('should get trade promotion', () => {
    let fn: any;
    promotionService.getTradePromotion.mockImplementationOnce(() => ({
      subscribe: jest
        .fn()
        .mockImplementationOnce((callback) => (fn = callback)),
    }));
    component.onGetTradePromotion();
    const SuccessCode = 20000;
    component.campaignData = [];
    component.campaignData[component.selectedCampaign] =
      {} as ICampaignResponseData;
    fn({
      statusCode: SuccessCode,
      data: {
        prices: [
          {
            includeVat: 10000,
          },
        ],
        trades: [
          {
            durationContract: 0,
            discount: {
              discountExcludeBy: 0,
              discountExcludeVat: 0,
              specialDiscountIncludeVat: 0,
            },
            payAdvance: {
              priceIncludeVat: 0,
            },
          },
        ],
      },
    });
    expect(component.trades.length).toEqual(0);
  });

  it('should select campaign', () => {
    const SelectedCampaign = 0;
    component.campaignData = mockCampaignData;
    component.onGetTradePromotion = jest.fn();
    component.onSelectCampaign(SelectedCampaign);
    expect(component.selectedCampaign).toEqual(SelectedCampaign);
    expect(component.onGetTradePromotion).toHaveBeenCalled();
  });

  const trade = [
    {
      tradeProductId: 0,
      freegoods: [
        {
          matCode: 'matCode1',
          name: 'matnameCode1',
          qty: 0
        },
        {
          matCode: 'matCode2',
          name: 'name2',
          qty: 0
        }
      ]
    }
  ] as any

  it('should return freeGoods when flow is ais shop', () => {
    component.trades = trade
    component.flow = 'AIS'
    component.selectTrade = 0

    expect(component.getSeclectedTrade()).toEqual({
        tradeProductId: 0,
        freegoods: [
            {
                matCode: 'matCode1',
                name: 'matnameCode1',
                qty: 0
            },
            {
                matCode: 'matCode2',
                name: 'name2',
                qty: 0
            }
        ]
    })
})

it('should return empty freeGoods when flow is not ais shop', () => {
    component.trades = trade
    component.flow = 'ASP'
    component.selectTrade = 0

    expect(component.getSeclectedTrade()).toEqual({
        tradeProductId: 0,
        freegoods: []
    })
})
});
