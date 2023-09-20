import {
  ISimCardCart,
  ICustomerCart,
  IDeviceCart,
  ISellerCart,
  IOrderCart,
  IBillingInformationCart,
  IAirTimeCart,
  IReceiptCart,
  IMobileCareAis,
  IDeviceCareApple,
  IDeviceCarePayment,
  IPromotionsCart,
} from 'src/app/shared/model/cart.model';
import { ICustomerData } from 'src/app/shared/model/customer.model';
import {
  IConfigFlowDetail,
  ICustomerCriteria,
} from 'src/app/shared/model/mc-config.model';
import {
  ICheckStockRes,
  IProductDetail,
} from 'src/app/shared/model/product.model';
import {
  ICampaignResponseData,
  ITradePrice,
  ITrades,
} from 'src/app/shared/model/promotion.model';
import { ISeller } from 'src/app/shared/model/seller.model';
import { IMobileCareSelected } from 'src/app/shared/model/service-care.model';
import { SharedService } from 'src/app/shared/service/shared.service';
export class TranfromTransactionDataService {
  mapCustomer(customer: ICustomerData): ICustomerCart {
    const [firstName, lastName] = (customer?.customerName ?? '').split(' ');
    const [birthdate, _] = (customer?.birthday || '').split(' ');
    const [day, month, year] = (birthdate || '').split('/');
    const inputYear = +year + 543;
    const birthDayFormat = `${day}/${month}/${inputYear}`;
    return {
      idCardNo: customer?.idCardNo || '',
      idCardType: customer?.idCardType || '',
      titleName: customer?.title || '',
      firstName: firstName || '',
      lastName: lastName || '',
      birthdate: birthDayFormat || '',
      gender: customer?.gender || '',
      expireDate: customer?.exprireDate || '',
      homeNo: customer?.receiptAddress?.houseNo || '',
      moo: customer?.receiptAddress?.moo || '',
      mooBan: customer?.receiptAddress?.mooban || '',
      room: customer?.receiptAddress?.room || '',
      floor: customer?.receiptAddress?.floor || '',
      buildingName: customer?.receiptAddress?.building || '',
      soi: customer?.receiptAddress?.soi || '',
      street: customer?.receiptAddress?.street || '',
      province: customer?.receiptAddress?.province || '',
      amphur: customer?.receiptAddress?.amphur || '',
      tumbol: customer?.receiptAddress?.tumbol || '',
      zipCode: customer?.receiptAddress?.zipCode || '',
      citizenship: '',
      accountSubCat: customer?.accountSubCat || '',
      engFlag: customer?.engFlag || '',
      billLanguage: customer?.billLanguage || '',
      isKYC: false,
      isOCR: false,
    };
  }

  mapSimCard(customer: ICustomerData): ISimCardCart {
    return {
      memberSimCard: [],
      mobileNo: customer.mobileNo,
      isAis: customer.isMobileAis,
    };
  }

  getImageProduct(
    productDetail: IProductDetail,
    selectedColor: number
  ): string {
    return (
      productDetail.colors!.find((color) => color.colorId === selectedColor)
        ?.imageUrl?.[0] || ''
    );
  }

  mapDevice(
    device: IProductDetail,
    colorName: string,
    selectedColor: number,
    company: string
  ): IDeviceCart {
    return {
      amount: 1,
      matCode: device.matCode || '',
      imei: device.imei?.code || '',
      brand: device.brand,
      model: device.model,
      colorName: colorName,
      imageUrl: this.getImageProduct(device, selectedColor),
      name: device.productName,
      company: company,
      productSubType: device.productSubtype,
      productType: device.productType,
    };
  }

  mapBillingInformation(customer: ICustomerData): IBillingInformationCart {
    return {
      billCycles: [
        {
          from: '0',
          to: '0',
        },
      ],
      customer: this.mapCustomer(customer),
    };
  }

  mapMobileCarePackage(mobileCare: IMobileCareSelected): IMobileCareAis {
    if (mobileCare.productType === 'ไม่สนใจ') {
      return {
        accountFees: [],
        orderFees: [],
        reason: mobileCare.option.name,
      };
    }
    if (mobileCare.productType === 'AIS Care Plus') {
      return {
        accountFees: [],
        orderFees: [],
        title: mobileCare.title,
        promotionCode: mobileCare.option.promotionCode,
        customAttributes: {
          promotionName: mobileCare.option.name,
          promotionCode: mobileCare.option.promotionCode,
          offeringCode: mobileCare.option.offeringCode,
        },
        reason: '',
        email: mobileCare.email,
      };
    }
    return {
      accountFees: [],
      orderFees: [],
    };
  }

  mapDeviceCarePackage(mobileCare: IMobileCareSelected): IDeviceCareApple {
    if (mobileCare.productType === 'ไม่สนใจ') {
      return {
        accountFees: [],
        orderFees: [],
        reason: mobileCare.option.name,
        isBuyDeviceCare: false,
      };
    }
    if (mobileCare.productType === 'AppleCare+') {
      return {
        accountFees: [],
        title: mobileCare.title,
        promotionCode: mobileCare.option.promotionCode,
        customAttributes: {
          promotionName: mobileCare.title,
          promotionCode: mobileCare.option.promotionCode,
          offeringCode: mobileCare.option.offeringCode,
        },
        reason: '',
        isBuyDeviceCare: true,
        crossMatCode: mobileCare.matCodeCarePlus,
        costProductPrice: mobileCare.option.price,
        email: mobileCare.email,
        orderFees: mobileCare.orderFees ? [mobileCare.orderFees] : [],
      };
    }
    return {
      accountFees: [],
      orderFees: [],
      isBuyDeviceCare: false,
    };
  }

  mapDeviceCarePayment(mobileCare: IMobileCareSelected): IDeviceCarePayment {
    return {
      amount: Number(mobileCare.option.price.replace(',', '')),
      matCodeCarePlus: mobileCare.matCodeCarePlus || '',
      email: mobileCare.email,
    };
  }

  formatNumber(number: number) {
    const sharedService = new SharedService();
    return sharedService.numberWithComma(sharedService.customRound(number));
  }

  getMobileCarePrice(mobileCare: IMobileCareSelected): number {
    return mobileCare.productType == 'AppleCare+'
      ? Number(mobileCare.option.price.replace(/,/g, ''))
      : 0;
  }

  mapMainPromotion(
    campaign: ICampaignResponseData,
    trade: ITrades,
    price: ITradePrice,
    company: string,
    color: string,
    orderType: string,
    returnCode: string
  ): IPromotionsCart {
    return {
      campaign: {
        campaignName: campaign.campaignName,
        conditionCode: campaign.conditionCode,
        company: company,
        color: color,
        priceIncludeVat: this.formatNumber(price.includeVat),
        discountIncludeVat: this.formatNumber(trade.discountPrice),
        netPrice: this.formatNumber(price.includeVat - trade.discountPrice),
        contract: trade.durationContract,
        advancePay: this.formatNumber(trade.payAdvance.priceIncludeVat),
        installmentFlag: campaign.installmentFlag,
        privilegeReturnCode: returnCode,
        summaryPrice: this.formatNumber(price.includeVat - trade.discountPrice),
      },
      trade: {
        ...trade,
        orderType,
        normalPrice: this.formatNumber(price.includeVat),
      },
    };
  }

  mapSeller(sellerData: ISeller): ISellerCart {
    return {
      locationCode: sellerData.locationCode,
      locationName: sellerData.locationName || '',
      sellerName: sellerData.username,
      ascCode: '',
      employeeId: '',
      soChannel: sellerData.userType || '',
    };
  }

  mapReceipt(): IReceiptCart {
    return {
      billCycles: [],
    };
  }

  mapOrder(stockRes: ICheckStockRes): IOrderCart {
    return {
      soId: stockRes.data.soId || '',
    };
  }

  mapAirTime(): IAirTimeCart {
    return {
      tradeAirtimeId: null,
      amount: 0,
      installmentFlag: 'N',
      matAirtime: null,
      description: null,
      payAdvanceGroupId: null,
      promotions: [],
      payment: {
        code: '',
      },
    };
  }

  mapTransactionType(
    customerCriteria: ICustomerCriteria,
    sellerData: ISeller
  ): string {
    return (
      customerCriteria.details?.find(
        (detail: IConfigFlowDetail) =>
          sellerData.outChnSalesCode &&
          detail.outChnSalesCode?.includes(sellerData.outChnSalesCode)
      )?.transactionType || ''
    );
  }

  mapUsername(username: string): string {
    return username;
  }
}
