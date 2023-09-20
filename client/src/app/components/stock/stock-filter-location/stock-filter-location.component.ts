import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store-ngrx/app.state';
import { loadLocationData } from '../../../store-ngrx/actions/location.action';
import {
  getLoading,
  getLocationData,
} from '../../../store-ngrx/selectors/location.selectors';
import {
  clearStockData,
  loadStockDataOther,
} from '../../../store-ngrx/actions/stock.action';
import { getSelectedAllModel } from '../../../store-ngrx/selectors/product.selectors';
import jwtDecode from 'jwt-decode';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';
import { IHandset, ISubProduct } from 'src/app/shared/model/product.model';
import { IStockConfig } from 'src/app/shared/model/mc-config.model';

@Component({
  selector: 'app-stock-filter-location',
  templateUrl: './stock-filter-location.component.html',
  styleUrls: ['./stock-filter-location.component.scss'],
})
export class StockFilterLocationComponent implements OnInit {
  isDisabled: boolean = true;
  loading$ = this.store.select(getLoading);
  dataLocation$ = this.store.select(getLocationData);
  selectedCheckboxes: boolean[] = [];
  locationCodeDest: Array<string> = [];
  selectedBrand$ = this.store.select(getSelectedAllModel);
  locationCode = '';
  stockConfig!: IStockConfig;

  constructor(
    private store: Store<AppState>
  ) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA2MTAyMzU5IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiQ2hpcmFwaGFuIiwibGFzdG5hbWUiOiJSYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA4OTg5MTQ4ODkiLCJzdWIiOiIiLCJwaW5Db2RlIjoiMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJTdXBlcnZpc29yIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjg2Mjk4NTU3LCJleHAiOjE2ODYzODQ5NTd9.0acqF4FCsn9qcNd8CcoaFZR6jFR8bbnIZ-dvXsMlFvE';
    const dataJson: any = jwtDecode(token);
    this.locationCode = dataJson.locationCode;
  }

  ngOnInit(): void {
    this.store.dispatch(
      loadLocationData({
        filterType: 'TUMBOL_TH',
        locationCode: this.locationCode,
        locationType: 'AIS',
      })
    );
    this.store
      .select(getOutChCustData)
      .subscribe((stockConfig:any) => {
        this.stockConfig.subStockCode = stockConfig.subStockCodeDT;
        this.stockConfig.stockType= stockConfig.Flow
      })
      .unsubscribe();
  }

  onSameSubDistrict() {
    this.selectedTab('TUMBOL_TH');
  }

  onSameDistrict() {
    this.selectedTab('AMPHUR_TH');
  }

  onSameProvince() {
    this.selectedTab('PROVINCE');
  }

  onSearch() {
    this.store.dispatch(clearStockData());
    this.selectedBrand$
      .subscribe((data: IHandset | undefined) => {
        data?.subProducts.map((dataSub: ISubProduct) => {
          let req = {
            stockType: this.stockConfig?.stockType || '',
            locationCodeSource: this.locationCode,
            locationCodeDest: this.locationCodeDest.join(','),
            productType: data.productType,
            productSubType: data.productSubtype,
            subStock: this.stockConfig?.subStockCode || '',
            brand: data?.brand,
            model: dataSub.model,
          };
          req.model = dataSub.model;
          this.store.dispatch(loadStockDataOther({ reqStock: req }));
        });
      })
      .unsubscribe();
  }

  selectedTab(filterType: string) {
    this.store.dispatch(clearStockData());
    this.locationCodeDest = [];
    this.selectedCheckboxes = [];
    this.store.dispatch(
      loadLocationData({
        filterType: filterType,
        locationCode: '1100',
        locationType: 'AIS',
      })
    );
  }

  saveData(isChecked: boolean, locationCode: string) {
    let isUserSelected: boolean = this.selectedCheckboxes.some(
      (checkbox) => checkbox
    );
    if (isChecked) {
      this.locationCodeDest.push(locationCode);
    } else {
      this.locationCodeDest = this.locationCodeDest.filter(
        (item) => item !== locationCode
      );
    }
    this.isDisabled = !isUserSelected;
  }
}
