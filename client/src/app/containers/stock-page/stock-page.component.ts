import { Component, Input, OnInit } from '@angular/core';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { IStockTabs } from 'src/app/shared/model/product.model';
import { IHandset, ISubProduct } from 'src/app/shared/model/product.model';
import { IProductStockRequest } from 'src/app/shared/model/product.model';
import jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { Observable, Subscription, debounceTime, filter } from 'rxjs';
import { McConfigService } from 'src/app/shared/service/mc-config.service';
import { loadStockDataMyShop, clearStockData } from 'src/app/store-ngrx/actions/stock.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getSelectedAllModel } from 'src/app/store-ngrx/selectors/product.selectors';
import { getUserData } from 'src/app/store-ngrx/selectors/seller.selectors';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss'],
})
export class StockPageComponent implements OnInit {
  @Input() backUrl = PathConstant.SALE_PORTAL_PAGE;
  typeInputSearch: string = 'search';
  shopName: string = '';
  allModelsByProduct: Array<IHandset> = [];
  tabSeleted: string = 'my-shop';
  outChnSalesCode: string = '';
  locationCode: string = '';
  locationCodeDest: string = '';
  selectedModel$: Observable<IHandset | undefined> =
    this.store.select(getSelectedAllModel);
  stockConfig?: { subStockCode: string; stockType: string };
  tabs: IStockTabs[] = [
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

  constructor(
    private store: Store<AppState>,
    private mcConfigService: McConfigService
  ) {}

  modelDetail?: IHandset;
  sub!: Subscription;

  ngOnInit(): void {
    this.store.select(getUserData).subscribe((userData) => {
      this.locationCode = userData!.locationCode;
      this.outChnSalesCode = userData!.outChnSalesCode;
      this.shopName = `${userData?.locationCode} : ${userData?.outChnSales}`;
    });
    this.getDataFromModel();
  }

  getConfigSaleChannal() {
    let configReq = '';
    if (this.tabSeleted === 'online-store') {
      configReq = 'AISONLINE';
      this.locationCodeDest = '4289';
    } else {
      configReq = this.outChnSalesCode;
      this.locationCodeDest = this.locationCode;
    }
    this.mcConfigService.getConfig(configReq).subscribe((data) => {
      this.stockConfig = {
        stockType: data?.config?.Flow,
        subStockCode: data?.config?.subStockCodeDT,
      };
    });
  }

  getDataFromModel() {
    this.getConfigSaleChannal();
    this.sub = this.selectedModel$
      .pipe(
        filter((data: any) => data !== undefined),
        debounceTime(500)
      )
      .subscribe((modelDetail: any) => {
        this.modelDetail = modelDetail;
        if (modelDetail && this.tabSeleted != 'other-shop') {
          this.getDataFromStock();
        }
      });
  }

  getDataFromStock() {
    if (this.modelDetail) {
      this.modelDetail.subProducts.forEach((modelSub: ISubProduct) => {
        let req: IProductStockRequest = {
          stockType: this.stockConfig?.stockType || '',
          locationCodeSource: this.locationCode,
          locationCodeDest: this.locationCodeDest,
          productType: this.modelDetail?.productType || '',
          productSubType: this.modelDetail?.productSubtype || '',
          subStock: this.stockConfig?.subStockCode || '',
          brand: this.modelDetail?.brand || '',
          model: modelSub.model,
        };
        this.store.dispatch(loadStockDataMyShop({ reqStock: req }));
      });
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      return error;
    }
  }

  selectTab(tabKey: string): void {
    this.store.dispatch(clearStockData());
    this.tabSeleted = tabKey;
    if (this.modelDetail && this.tabSeleted != 'other-shop') {
      this.getDataFromStock();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.store.dispatch(clearStockData());
    }
  }
}
