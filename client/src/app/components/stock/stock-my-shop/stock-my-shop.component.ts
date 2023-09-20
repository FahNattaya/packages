import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store-ngrx/app.state';
import { getLoadedStockMyShop, getLoadingStockMyShop, getSelectedAllModel, getStockDataMyShop } from '../../../store-ngrx/selectors/product.selectors';
import { Observable } from 'rxjs';
import { IHandset, IListData } from 'src/app/shared/model/product.model';

@Component({
  selector: 'app-stock-my-shop',
  templateUrl: './stock-my-shop.component.html',
  styleUrls: ['./stock-my-shop.component.scss'],
})
export class StockMyShopComponent {
  @Input() locationCode: string = '';
  @Input() shopName: string = '';
  @Input() isOnline: boolean = false;
  errorText: string = '';
  selectedModel$: Observable<IHandset | undefined> =
    this.store.select(getSelectedAllModel);
  selectStockData$: Observable<IListData[]> =
    this.store.select(getStockDataMyShop);
  stockListData: IListData[] = [];
  isLoading$ = this.store.select(getLoadingStockMyShop);
  isLoaded$ = this.store.select(getLoadedStockMyShop);
  isEmptyStock: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.onGetStockList();
  }

  onGetStockList(): void {
    if (this.isLoaded$) {
      this.isLoaded$.subscribe((isLoaded) => {
        if (isLoaded) {
          this.onSetData();
        }
      });
    }
  }

  onSetData(): void {
    this.selectStockData$.subscribe((stockData) => {
      const stockListData = stockData.flatMap((data: IListData) => data);
      const isEmpty = stockListData.length === 0;
      this.stockListData = stockListData;
      this.isEmptyStock = isEmpty;
      this.errorText = isEmpty ? 'ไม่พอข้อมูล Stock' : '';
    });
  }
}
