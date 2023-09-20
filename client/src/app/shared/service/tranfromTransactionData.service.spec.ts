import { ICustomerData } from 'src/app/shared/model/customer.model';
import {
  IBillingInformationCart,
  ICustomerCart,
  IDeviceCareApple,
  IDeviceCarePayment,
  IDeviceCart,
  IMobileCareAis,
  INotCareData,
  INotInterestedCare,
  IOrderCart,
  ISimCardCart,
} from 'src/app/shared/model/cart.model';
import { IMobileCareSelected } from 'src/app/shared/model/service-care.model';
import { ISeller } from 'src/app/shared/model/seller.model';
import {
  ICheckStockRes,
  IProductDetail,
} from 'src/app/shared/model/product.model';
import { ICustomerCriteria } from '../model/mc-config.model';
import { TranfromTransactionDataService } from './tranfromTransactionData.service';
let tranfromTransactionDataService: TranfromTransactionDataService;

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

const mockSeller = {
  locationCode: '1100',
  outChnSales: '',
  outChnSalesCode: 'AISSHOP',
  userType: '',
  channelType: '',
  username: 'seller kub',
  mobileNo: '0901234567',
};

describe('map data', () => {
  beforeEach(async () => {
    tranfromTransactionDataService = new TranfromTransactionDataService();
  });

  const customer: ICustomerData = {
    title: 'title',
    customerName: 'test kub',
    birthday: '23/03/1999 00:00:00',
    mobileNo: 'mobileNo',
    segment: 'segment',
    serviceYear: 'serviceYear',
    chargeType: 'chargeType',
    subscriptionState: 'subscriptionState',
    billingSystem: 'billingSystem',
    billLanguage: 'THA',
    accountSubCat: 'THA',
    idCardNo: 'idCardNo',
    idCardType: 'idCardType',
    engFlag: 'engFlag',
    exprireDate: 'exprireDate',
    gender: 'gender',
    receiptAddress: {
      engFlag: 'engFlag',
      houseNo: 'houseNo',
      moo: 'moo',
      mooban: 'mooban',
      building: 'building',
      floor: 'floor',
      room: 'room',
      soi: 'soi',
      street: 'street',
      amphur: 'amphur',
      tumbol: 'tumbol',
      province: 'province',
      zipCode: 'zipCode',
    },
    isMobileAis: true,
  };

  const mapCustomer: ICustomerCart = {
    idCardNo: 'idCardNo',
    idCardType: 'idCardType',
    titleName: 'title',
    firstName: 'test',
    lastName: 'kub',
    birthdate: '23/03/2542',
    gender: 'gender',
    expireDate: 'exprireDate',
    homeNo: 'houseNo',
    moo: 'moo',
    mooBan: 'mooban',
    room: 'room',
    floor: 'floor',
    buildingName: 'building',
    soi: 'soi',
    street: 'street',
    province: 'province',
    amphur: 'amphur',
    tumbol: 'tumbol',
    zipCode: 'zipCode',
    citizenship: '',
    accountSubCat: 'THA',
    engFlag: 'engFlag',
    billLanguage: 'THA',
    isKYC: false,
    isOCR: false,
  };

  it('should return customer information follow with interface ICustomerCart', () => {
    const result: ICustomerCart =
      tranfromTransactionDataService.mapCustomer(customer);

    expect(result).toEqual(mapCustomer);
  });

  it('should return simCard information follow with interface ISimCardCart', () => {
    const expected: ISimCardCart = {
      memberSimCard: [],
      mobileNo: 'mobileNo',
      isAis: true
    };

    const result: ISimCardCart =
      tranfromTransactionDataService.mapSimCard(customer);

    expect(result).toEqual(expected);
  });

  it('should get image name', () => {
    expect(
      tranfromTransactionDataService.getImageProduct(mockProductDetail, 0)
    ).toBe(
      'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-gold-pureangles-1_2.jpg'
    );
  });

  it('should return device information follow with interface IDeviceCart', () => {
    const expected: IDeviceCart = {
      amount: 1,
      brand: 'APPLE',
      model: 'IPHONEXSM512',
      colorName: 'GOLD',
      imageUrl:
        'https://sit-admin-cpc.cdc.ais.th/admin-fe/assets/files/images/iphonexsmax-gold-pureangles-1_2.jpg',
      name: 'IPHONEXSM512',
      company: 'AIS',
      productSubType: 'HANDSET',
      productType: 'DEVICE',
      imei: '',
      matCode: '',
    };

    const result: IDeviceCart = tranfromTransactionDataService.mapDevice(
      mockProductDetail,
      'GOLD',
      0,
      'AIS'
    );

    expect(result).toEqual(expected);
  });

  it('should return billing information follow with interface IBillingInformationCart', () => {
    const expected: IBillingInformationCart = {
      billCycles: [
        {
          from: '0',
          to: '0',
        },
      ],
      customer: mapCustomer,
    };

    const result: IBillingInformationCart =
      tranfromTransactionDataService.mapBillingInformation(customer);

    expect(result).toEqual(expected);
  });

  it('should be a reason for not interested mobile care package', () => {
    const mobileCare: IMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'ไม่สนใจ',
      option: {
        name: 'name',
        price: 'price',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    };
    const expected: INotInterestedCare = {
      accountFees: [],
      orderFees: [],
      reason: 'name',
    };

    const result =
      tranfromTransactionDataService.mapMobileCarePackage(mobileCare);

    expect(result).toEqual(expected);
  });

  it('should return care data when interested ais care mobile care package', () => {
    const mobileCare: IMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'AIS Care Plus',
      option: {
        name: 'name',
        price: 'price',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    };
    const expected: IMobileCareAis = {
      accountFees: [],
      orderFees: [],
      title: 'title',
      promotionCode: 'promotionCode',
      customAttributes: {
        promotionName: 'name',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      reason: '',
      email: 'email'
    };

    const result =
      tranfromTransactionDataService.mapMobileCarePackage(mobileCare);

    expect(result).toEqual(expected);
  });

  it('should return accountFees and orderFees when taking mobile apple care package', () => {
    const mobileCare: IMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'Apple Care +',
      option: {
        name: 'name',
        price: 'price',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    };
    const expected: INotCareData = {
      accountFees: [],
      orderFees: [],
    };

    const result =
      tranfromTransactionDataService.mapMobileCarePackage(mobileCare);

    expect(result).toEqual(expected);
  });

  it('should be a reason for not interested device care package', () => {
    const mobileCare: IMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'ไม่สนใจ',
      option: {
        name: 'name',
        price: 'price',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    };
    const expected: INotInterestedCare = {
      accountFees: [],
      orderFees: [],
      reason: 'name',
      isBuyDeviceCare: false,
    };

    const result =
      tranfromTransactionDataService.mapDeviceCarePackage(mobileCare);

    expect(result).toEqual(expected);
  });

  it('should return care data when interested AppleCare+ mobile device care package', () => {
    const mobileCare: IMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'AppleCare+',
      option: {
        name: 'title',
        price: 'price',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    };
    const expected: IDeviceCareApple = {
      accountFees: [],
      orderFees: [],
      title: 'title',
      promotionCode: 'promotionCode',
      customAttributes: {
        promotionName: 'title',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      reason: '',
      isBuyDeviceCare: true,
      crossMatCode: 'matCodeCarePlus',
      costProductPrice: 'price',
      email: 'email'
    };

    const result =
      tranfromTransactionDataService.mapDeviceCarePackage(mobileCare);

    expect(result).toEqual(expected);
  });

  it('should return account and order fees when interested ais care device care package', () => {
    const mobileCare: IMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'AIS Care Plus',
      option: {
        name: 'name',
        price: 'price',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    };
    const expected: INotCareData = {
      accountFees: [],
      orderFees: [],
      isBuyDeviceCare: false,
    };

    const result =
      tranfromTransactionDataService.mapDeviceCarePackage(mobileCare);

    expect(result).toEqual(expected);
  });

  it('should return soId', () => {
    const stockRes: ICheckStockRes = {
      resultCode: 'resultCode',
      resultDescription: 'resultDescription',
      developerMessage: 'developerMessage',
      data: {
        resultCode: 'resultCode',
        resultMessage: 'resultMessage',
        soId: '123',
      },
    };
    const expected: IOrderCart = {
      soId: '123',
    };

    const result = tranfromTransactionDataService.mapOrder(stockRes);

    expect(result).toEqual(expected);
  });

  it('should return device care payment follow with IDeviceCarePayment', () => {
    const mobileCare: IMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'AIS Care Plus',
      option: {
        name: 'name',
        price: '6,400',
        promotionCode: 'promotionCode',
          offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus'
    };
    const expected: IDeviceCarePayment = {
      amount: 6400,
      matCodeCarePlus: 'matCodeCarePlus',
      email: 'email'
    };

    const result =
      tranfromTransactionDataService.mapDeviceCarePayment(mobileCare);

    expect(result).toEqual(expected);
  });

  it('should return transactionType when outChnSalesCode is matching', () => {
    const expected: string = 'DeviceOnlyAIS';

    const result = tranfromTransactionDataService.mapTransactionType(
      mockCriteria,
      mockSeller
    );

    expect(result).toEqual(expected);
  });

  it('should return empty string when outChnSalesCode is not matching', () => {
    const expected: string = '';
    const mockSellerNotMatch: ISeller = {
      locationCode: '1100',
      outChnSales: '',
      outChnSalesCode: 'NOTMATCH',
      userType: '',
      channelType: '',
      username: 'seller kub',
      mobileNo: '0901234567',
    };

    const result: string = tranfromTransactionDataService.mapTransactionType(
      mockCriteria,
      mockSellerNotMatch
    );

    expect(result).toEqual(expected);
  });
});
