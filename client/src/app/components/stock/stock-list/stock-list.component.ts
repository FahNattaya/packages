import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store-ngrx/app.state';
import { getStockDataOther, getLoadedStockOther } from 'src/app/store-ngrx/selectors/product.selectors';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent {
  stockData$ = this.store.select(getStockDataOther);
  isLoaded$ = this.store.select(getLoadedStockOther);
  errorText: string = 'ไม่พบข้อมูล Stock';
  constructor(private store: Store<AppState>) {}
}
