import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../../shared/service/shared.service';
import {
  ITradePrice,
  ITrades,
  SimpleChangeTrade,
} from 'src/app/shared/model/promotion.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';

@Component({
  selector: 'app-product-selling-trade',
  templateUrl: './product-selling-trade.component.html',
  styleUrls: ['./product-selling-trade.component.scss'],
})
export class ProductSellingTradeComponent {
  @Input() trades: ITrades[] = [];
  @Input() price!: ITradePrice;
  @Input() campaignDataSelected?: {
    name: string;
    icon: string;
    customerCriteria: string;
  };
  @Output() selectedTrade: EventEmitter<number> = new EventEmitter<number>();
  tradeNumber: number = 0;
  isTradesEmpty!: boolean;
  flow: string = '';

  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {}

  async ngOnInit(): Promise<void> {
    this.store.select(getOutChCustData).subscribe((config) => {
      if (config) {
        this.flow = config.Flow;
      }
    });
  }
  ngOnChanges(changes: SimpleChangeTrade) {
    this.tradeNumber = 0;
    if (changes?.trades?.firstChange) return;

    this.isTradesEmpty = changes?.trades?.currentValue?.length === 0;
  }

  selectTrade(index: number): void {
    this.tradeNumber = index;
    this.selectedTrade.emit(index);
  }

  dataTestID(tradeNo: string): string {
    return 'trade-' + tradeNo.toString();
  }

  netPrice(normalPrice: number, priceDiscount: number): string {
    return String(normalPrice - priceDiscount);
  }
  showPackage(minimumPackage: number, maximumPackage: number | null): string {
    const min = this.sharedService.numberWithComma(minimumPackage);
    if (maximumPackage == null) {
      return min + ' บาทขึ้นไป';
    } else {
      return (
        min + '-' + this.sharedService.numberWithComma(maximumPackage) + ' บาท'
      );
    }
  }
}
