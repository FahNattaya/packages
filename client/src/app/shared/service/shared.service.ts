import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IOrderList } from '../model/cart.model';
import { IIdCardAddress } from '../model/customer.model';
import { ITradeDiscount } from '../model/promotion.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public dataStoreDeviceSales: any = {};

  public postHead = { 'Content-Type': 'application/json' };
  constructor() {}

  getUrl(api_path: string) {
    return `/api/device-sales/v1/${api_path}`;
  }

  numberWithComma(num: number | string): string {
    let parts = num?.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  customRound(number: number) {
    let numberSplitByDot = number.toString().split('.');
    let decimal = numberSplitByDot.length >= 2 ? numberSplitByDot[1] : '';
    let thirdDecimal = decimal[2];
    let decimalLength = decimal.length;

    if (!thirdDecimal) return number;

    if (thirdDecimal == '5') {
      number +=
        decimalLength > 3 && decimal[decimalLength - 1] > '0' ? 0.01 : 0;
      return Math.trunc(number * 100) / 100;
    }

    return +number.toFixed(2);
  }

  callFunctionWithTimeout = async (asyncPromise: any, timeLimit: number) => {
    let timeoutHandle: any;

    const timeoutPromise = new Promise((_resolve, reject) => {
      timeoutHandle = setTimeout(
        () => reject(new Error('function call timeout limit reached')),
        timeLimit
      );
    });

    return Promise.race([asyncPromise, timeoutPromise]).then((result) => {
      clearTimeout(timeoutHandle);
      return result;
    });
  };

  public generateTransactionId = (): string => {
    return (
      moment().format('YYYYMMDDHHmmssSSS') +
      this._padLeft(Math.floor(Math.random() * 10000 - 1), 4)
    );
  };

  private _padLeft = (nr: number, n: number): string => {
    return Array(n - String(nr).length + 1).join('0') + nr;
  };

  onMapPaymentRemark(transaction: any) {
    let paymentRemark = '';
    if (
      transaction &&
      transaction.package &&
      transaction.package.packageName != ''
    ) {
      paymentRemark += `[PM]${transaction.package.packageName}\n`;
    }
    paymentRemark += `[DV][${transaction.payment.paymentMethod}], `;
    if (transaction.payment && transaction.payment.paymentMethod === 'CC') {
      paymentRemark += `[B]${transaction.payment.bankAbbr}, `;
      if (transaction.payment.installmentTerms > 0) {
        paymentRemark += `[I]${transaction.payment.installmentRate}% ${transaction.payment.installmentTerms}เดือน, `;
      }
    }
    if (transaction.main_promotion) {
      paymentRemark +=
        transaction.main_promotion.trade &&
        transaction.main_promotion.trade.tradeNo
          ? `[T]${transaction.main_promotion.trade.tradeNo}, `
          : '[T],';
      paymentRemark +=
        `[D]${transaction.main_promotion.campaign.discountIncludeVat}, ` ||
        '[D],';
      paymentRemark +=
        `[RC]${transaction.main_promotion.campaign.privilegeReturnCode}, ` ||
        '[RC],';
      paymentRemark +=
        `[OT]${transaction.main_promotion.trade.orderType}, ` || '[OT],';
    }
    paymentRemark += transaction.package
      ? `[PC]${transaction.package.packagePromotionCode}\n`
      : '[PC],';
    if (
      transaction.mobileCare &&
      transaction.mobileCare.productType != 'ไม่สนใจ'
    ) {
      paymentRemark += `[MCC] ${transaction.mobileCare.promotionCode}, [MC]${transaction.mobileCare.title}, `;
    }
    paymentRemark += `[PN]${transaction.main_promotion.campaign.campaignName}`;
    return paymentRemark;
  }

  onMapReqCreateOrderList(
    transaction: any,
    selectedAddress?: IIdCardAddress,
    flow?: string,
    queueNo: string = ''
  ): IOrderList {
    const deviceData = transaction ? transaction.device : {};
    const campaignData = transaction ? transaction.main_promotion.campaign : {};
    const tradeData = transaction ? transaction.main_promotion.trade : {};
    campaignData.priceIncludeVat = campaignData.priceIncludeVat?.replaceAll(
      ',',
      ''
    );
    campaignData.discountIncludeVat =
      campaignData.discountIncludeVat?.replaceAll(',', '');

    transaction.device_care_payment.amount =
      transaction?.device_care_payment?.amount.replaceAll(',', '');
    campaignData.netPrice = campaignData.netPrice?.replaceAll(',', '');
    campaignData.summaryPrice = transaction?.device_care_package
      ?.isBuyDeviceCare
      ? campaignData.netPrice + transaction?.device_care_payment?.amount
      : campaignData.netPrice;

    const customerData = transaction ? transaction.customer : {};
    const paymentData = transaction ? transaction.payment : {};
    const simCard = transaction ? transaction.simCard : {};
    const devicecPaymentData =
      transaction && transaction.device_care_payment
        ? transaction.device_care_payment
        : {};
    let req: IOrderList;
    let aisCareReq: IOrderList = {
      soId: transaction?.soId,
      locationSource:
        transaction && transaction.seller
          ? transaction.seller.locationCode
          : '',
      locationReceipt:
        transaction && transaction.seller
          ? transaction.seller.locationCode
          : '',
      userId:
        transaction && transaction.seller ? transaction.seller.sellerName : '',
      queueNo: queueNo,
      cusNameOrder: customerData
        ? customerData.titleName +
            customerData.firstName +
            ' ' +
            customerData.lastName || ''
        : '',
      soChannelType: 'CSP',
      soDocumentType: 'RESERVED',
      productList: [
        {
          productType: deviceData.productType || 'DEVICE',
          soCompany: deviceData.company || 'AWN',
          productSubType: deviceData.productSubType || 'HANDSET',
          brand: deviceData.brand || '',
          model: deviceData.model || '',
          qty: deviceData.amount || '',
          color: deviceData.colorName || '',
          priceIncAmt: (
            parseFloat(campaignData?.priceIncludeVat || 0).toFixed(2) || 0.0
          ).toString(),
          priceDiscountAmt: (
            parseFloat(campaignData?.discountIncludeVat || 0).toFixed(2) || 0.0
          ).toString(),
          matAirTime: tradeData?.payAdvance?.matAirtime || '',
          tradeNo: tradeData?.tradeNo || '',
          ussdCode:
            tradeData && tradeData?.privileges[0]
              ? tradeData?.privileges[0].ussdCode
              : '',
          returnCode: campaignData?.privilegeReturnCode || '',
          tradeAirtimeId:
            tradeData && tradeData.payAdvance
              ? tradeData.payAdvance.payAdvanceGroupId
              : '',
          tradeDiscountId:
            tradeData &&
            tradeData.discount &&
            tradeData.discount.tradeDiscountId
              ? String(tradeData.discount.tradeDiscountId)
              : '',
          matCode: !(
            flow === 'PARTNER' &&
            transaction?.mobileCare?.isBuyDeviceCare &&
            this.checkDevice().isTabletDevice
          )
            ? deviceData.matCode || ''
            : '',
          listMatFreeGoods: [
            {
              matCodeFG:
                tradeData && tradeData.freegoods
                  ? tradeData.freegoods.matCodeFG
                  : '',
              qtyFG:
                tradeData && tradeData.freegoods
                  ? tradeData.freegoods.qtyFG
                  : '',
              tradeFreeGoodsId:
                tradeData && tradeData.freegoods
                  ? tradeData.freegoods.tradeFreeGoodsId
                  : '',
            },
          ],
        },
      ],
      grandTotalAmt: parseFloat(campaignData.summaryPrice).toFixed(2),
      saleCode:
        transaction && transaction.seller ? transaction.seller.sellerName : '',
      taxCardId: customerData.idCardNo,
      cusMobileNoOrder: simCard.mobileNo,
      customerAddress: {
        addrNo: customerData.homeNo || '',
        moo: customerData.moo || '',
        mooban: customerData.mooban || '',
        buildingName: customerData.building || '',
        floor: customerData.floor || '',
        room: customerData.room || '',
        soi: customerData.soi || '',
        streetName: customerData.street || '-',
        tumbon: customerData.tumbol || '',
        amphur: customerData.amphur || '',
        province: customerData.province || '',
        country: customerData.engFlag != 'N' ? 'ประเทศไทย' : 'ต่างประเทศ',
        zipCode: customerData.zipCode || '',
      },
      receipt: {
        customer: {
          firstName: customerData.firstName || '',
          lastName: customerData.lastName || '',
          homeNo: selectedAddress?.houseNo || '',
          moo: selectedAddress?.moo || '',
          mooban: selectedAddress?.mooban || '',
          buildingName: selectedAddress?.building || '',
          floor: selectedAddress?.floor || '',
          room: selectedAddress?.room || '',
          soi: selectedAddress?.soi || '',
          streetName: selectedAddress?.street || '-',
          tumbon: selectedAddress?.tumbol || '',
          amphur: selectedAddress?.amphur || '',
          province: selectedAddress?.province || '',
          country: selectedAddress?.engFlag != 'N' ? 'ประเทศไทย' : 'ต่างประเทศ',
          zipCode: selectedAddress?.zipCode || '',
        },
      },
      paymentMethod: paymentData?.paymentMethod || '',
      installmentTerm: paymentData?.installmentTerms || 0,
      installmentRate: paymentData?.installmentRate || 0,
      mobileAisFlg: simCard.isAis ? 'Y' : 'N',
      bankAbbr: paymentData?.paymentBank?.abb,
      receiptType:
        flow === 'PARTNER' || (customerData.idCardNo && simCard.mobileNo)
          ? 'ABB'
          : 'FULL',
      customerType: '',
    };
    req = aisCareReq;
    if (transaction?.mobileCare?.isBuyDeviceCare) {
      let appleCareReq = {
        ...req,
        qrOrderIdCarePlus: paymentData?.qrOrderIdCarePlus || '',
        qrTransIdCarePlus: paymentData?.qrTransIdCarePlus || '',
        qrAmtCarePlus: paymentData?.qrAmtCarePlus || '',
        bankCodeCarePlus: paymentData?.bankCodeCarePlus || '',
        qrSecretKeyCarePlus: paymentData?.qrSecretKeyCarePlus || '',
        paymentRemark: this.onMapPaymentRemark(transaction),

        paymentMethodCarePlus: devicecPaymentData?.paymentMethod
          ? devicecPaymentData?.paymentMethod
          : '',
        bankAbbrCarePlus: devicecPaymentData?.bankAbbr
          ? devicecPaymentData?.bankAbbr
          : '',
        matCodeCarePlus: devicecPaymentData?.matCodeCarePlus
          ? devicecPaymentData?.matCodeCarePlus
          : '',
      };
      req = appleCareReq;
    }
    return req;
  }
  calculateDiscount(
    discount: ITradeDiscount,
    priceIncludeVat: number,
    priceExcludeVat: number
  ): any {
    const vatRate = +discount.vatRate! / 100;
    let discountPrice = 0;
    if (discount.specialDiscountBy && discount.specialDiscountIncludeVat) {
      discountPrice +=
        discount.specialDiscountBy === 'B'
          ? discount.specialDiscountIncludeVat
          : priceIncludeVat * (discount.specialDiscountIncludeVat / 100);
    }
    if (discount.discountExcludeBy && discount.discountExcludeVat) {
      discountPrice +=
        discount.discountExcludeBy === 'B'
          ? discount.discountExcludeVat! * (vatRate + 1)
          : ((priceExcludeVat * discount.discountExcludeVat!) / 100) *
            (vatRate + 1);
    }
    if (discount.tradePriceExcludeVat || discount.tradePriceIncludeVat) {
      priceIncludeVat = discount.tradePriceIncludeVat
        ? discount.tradePriceIncludeVat
        : discount.tradePriceExcludeVat! * vatRate +
          discount.tradePriceExcludeVat!;
      priceIncludeVat = this.customRound(priceIncludeVat);
    }
    return { discount: discountPrice, priceInclude: priceIncludeVat };
  }

  checkDevice() {
    const userAgent: string = navigator.userAgent;

    const isMobileDevice = (): boolean => {
      const regexs = [
        /(Android)(.+)(Mobile)/i,
        /BlackBerry/i,
        /iPhone|iPod/i,
        /Opera Mini/i,
        /IEMobile/i,
      ];
      return regexs.some((device) => userAgent.match(device));
    };

    const isTabletDevice = (): boolean => {
      const regex =
        /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
      return regex.test(userAgent.toLowerCase());
    };

    const isDesktopDevice = (): boolean =>
      !isMobileDevice() && !isTabletDevice();

    const isIOS = (): boolean => {
      const regexs = [/iPhone|iPod|ipad|iPad/i];
      return regexs.some((device) => userAgent.match(device));
    };

    return {
      isMobileDevice: isMobileDevice(),
      isTabletDevice: isTabletDevice(),
      isDesktopDevice: isDesktopDevice(),
      isIOS: isIOS(),
    };
  }

  maskingData(
    wording: string,
    startIndex: number = 0,
    endIndex: number = wording.length,
    replacement: string = 'X'
  ) {
    const masking = wording.slice(startIndex, endIndex);
    let textMasking = '';
    for (let i = 0; i < masking.length; i++) {
      textMasking += replacement;
    }

    const isMaskingAll = startIndex === 0 && endIndex === wording.length;
    if (isMaskingAll) return masking.replace(masking, textMasking);

    return wording.slice(0, startIndex) + textMasking + wording.slice(endIndex);
  }
}
