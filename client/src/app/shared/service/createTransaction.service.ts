import {
  ICustomerData,
  IGetBlackListLimit,
} from 'src/app/shared/model/customer.model';
import {
  ICheckStockReq,
  ICheckStockRes,
  IProductDetail,
} from 'src/app/shared/model/product.model';

import { ISeller } from 'src/app/shared/model/seller.model';
import { getCustomerData } from 'src/app/store-ngrx/selectors/customer.selectors';
import { ICheckPrivilegeRequest } from '../model/privilege.model';
import { checkPrivilege } from 'src/app/store-ngrx/actions/privilege.action';
import { filter, firstValueFrom, take } from 'rxjs';
import { getPrivilegeData } from 'src/app/store-ngrx/selectors/privilege.selectors';
import {
  loadCartList,
  saveDataFromValidateCustomer,
} from 'src/app/store-ngrx/actions/cart.action';
import {
  getDataCreateTransaction,
  getMergeDataProductSelling,
} from 'src/app/store-ngrx/selectors/shared.selector';
import { CartService } from './cart.service';
import { ErrorService } from 'src/app/core/service/error.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { ITradePrivileges } from '../model/promotion.model';
import { getDataFromProductSelling } from 'src/app/store-ngrx/selectors/cart.selectors';
import { SharedService } from './shared.service';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';

interface IReserveStock {
  trasactionId: string;
  mobileNo: string;
  privileges: ITradePrivileges[];
  customerName: string;
  locationCode: string;
  company: string;
  productType: string;
  productSubtype: string;
  brand: string;
  model: string;
  colorName: string;
  subStockCodeDT: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreateTransactionService {
  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService,
    private productService: ProductService,
    private cartService: CartService,
    private errorService: ErrorService,
    private customerService: CustomerService
  ) {}

  customer?: ICustomerData;
  device?: IProductDetail;
  seller?: ISeller;
  productSellingData?: any;
  returnCode: string = '';
  stockRes?: ICheckStockRes;
  bkackListLinit: IGetBlackListLimit = {
    resultCode: '',
    resultDescription: '',
    developerMessage: '',
    data: {},
  };
  queryContractMobile: any;

  async getAllData(): Promise<IReserveStock> {
    const transactionId = this.sharedService.generateTransactionId();
    const productSellingData = await firstValueFrom(
      this.store.select(getDataFromProductSelling)
    );
    const merageData = await firstValueFrom(
      this.store.select(getMergeDataProductSelling)
    );
    const device: IProductDetail | undefined = merageData.productDetail;
    const seller: ISeller | undefined = merageData.sellerData;
    const customer: ICustomerData | undefined = await firstValueFrom(
      this.store.select(getCustomerData)
    );
    this.customer = customer;
    return {
      trasactionId: transactionId || '',
      mobileNo: customer?.mobileNo || '',
      privileges: productSellingData?.tradeSelected?.privileges || [],
      customerName: customer?.customerName || 'MC',
      locationCode: seller?.locationCode || '',
      company: productSellingData.company || '',
      productType: device?.productType || '',
      productSubtype: device?.productSubtype || '',
      brand: device?.brand || '',
      model: device?.model || '',
      colorName: productSellingData.colorName || '',
      subStockCodeDT: merageData?.outChannelSales?.subStockCodeDT || '',
    };
  }

  async onCheckPrivilege(reserveData: IReserveStock): Promise<string> {
    let returnCode = '';

    const reqBody: ICheckPrivilegeRequest = {
      transactionID: reserveData.trasactionId,
      msisdn: reserveData.mobileNo,
      shortcode: reserveData.privileges[0].ussdCode,
    };

    this.store.dispatch(checkPrivilege({ req: reqBody }));

    const dataPrivilege = await firstValueFrom(
      this.store.select(getPrivilegeData).pipe(
        filter((data) => data != undefined),
        take(1)
      )
    );
    if (dataPrivilege?.isCheckPrivilegePass) {
      returnCode = dataPrivilege.msgBarcode || '';
    }

    return returnCode;
  }

  getCheckStockData(reserveData: IReserveStock): ICheckStockReq {
    const listMatFreeGoods = [
      {
        matCodeFG: '',
        qtyFG: '',
        tradeFreeGoodsId: '',
      },
    ];

    return {
      locationSource: reserveData.locationCode,
      locationReceipt: reserveData.locationCode,
      userId: 'MC',
      cusNameOrder: reserveData.customerName
        ? reserveData.customerName
        : this.seller?.username!,
      soChannelType: 'CSP',
      soDocumentType: 'RESERVED',
      productList: [
        {
          soCompany: reserveData.company,
          productType: reserveData.productType || 'DEVICE',
          productSubType: reserveData.productSubtype || 'HANDSET',
          brand: reserveData.brand,
          model: reserveData.model,
          color: reserveData.colorName,
          qty: '1',
          matCode: '',
          priceIncAmt: '',
          priceDiscountAmt: '',
          matAirTime: '',
          listMatFreeGoods,
        },
      ],
      grandTotalAmt: '',
      preBookingNo: '',
      depositAmt: '',
      reserveNo: '',
      subStockDestination: reserveData.subStockCodeDT,
      storeName: '',
    };
  }

  async onCheckStock(checkStockReq: ICheckStockReq): Promise<ICheckStockRes> {
    let stockRes: ICheckStockRes = {
      resultCode: '',
      resultDescription: '',
      developerMessage: '',
      data: {
        resultCode: '',
        resultMessage: '',
        soId: '',
      },
    };

    try {
      stockRes = await firstValueFrom(
        this.productService.getCheckStock(checkStockReq)
      );
    } catch (error) {
      console.error(error);
    }

    return stockRes;
  }

  async addToCart(reserveData: IReserveStock) {
    console.log("reserveData "+ reserveData);
    
    let isSuccess = false;
    

    const reqBody = await firstValueFrom(
      this.store.select(getDataCreateTransaction)
    );
      console.log("reqBody "+reqBody);
      
    await this.cartService.createTransaction(reqBody).subscribe((response) => {
      console.log("response "+response);
      
      this.store.dispatch(
        loadCartList({
          mobileNo: reserveData?.mobileNo || '',
          locationCode: reserveData?.locationCode || '',
        })
      );

      if (response.data.isSuccess) {
        isSuccess = true;
      }
    });

    return isSuccess;
  }

  saveDataToStore(returnCode: string, stockRes: ICheckStockRes) {
    this.store.dispatch(
      saveDataFromValidateCustomer({
        returnCode: returnCode,
        stockRes: stockRes,
      })
    );
  }

  async onReserveStock(): Promise<void> {
    let returnCode = '';
    let isCheckReserveStockPass = true;
    const reserveData: IReserveStock = await this.getAllData();
    if (Boolean(this.customer?.idCardNo)) {
      this.customerService
        .getBlackListLimit(this.customer?.idCardNo || '')
        .subscribe((e: IGetBlackListLimit) => {
          console.log(e);
          this.bkackListLinit = e;
        });
      this.customerService
        .getQueryContractMobile(this.customer?.idCardNo!)
        .subscribe((e: IGetBlackListLimit) => {
          console.log(e);
          this.queryContractMobile = e;
        });
    }
    const checkStockReq: ICheckStockReq = this.getCheckStockData(reserveData);
    if (reserveData?.privileges?.length > 0) {
      returnCode = await this.onCheckPrivilege(reserveData);
      isCheckReserveStockPass = Boolean(returnCode);
    }

    if (isCheckReserveStockPass) {
      const stockRes: ICheckStockRes = await this.onCheckStock(checkStockReq);
      if (!Boolean(stockRes?.data?.soId)) {
        this.errorService.handleError({
          customMessage: stockRes.data.resultMessage,
        });
        return;
      }
      this.saveDataToStore(returnCode, stockRes);
      this.addToCart(reserveData);
    }
  }
}
