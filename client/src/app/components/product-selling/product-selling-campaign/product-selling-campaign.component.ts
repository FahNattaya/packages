import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICampaignResponseData } from 'src/app/shared/model/promotion.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';

@Component({
  selector: 'app-product-selling-campaign',
  templateUrl: './product-selling-campaign.component.html',
  styleUrls: ['./product-selling-campaign.component.scss'],
})
export class ProductSellingCampaignComponent {
  currentCampaign!: number;
  @Input() campaignData?: ICampaignResponseData[];
  @Input() customerCriteria?: string = '';
  @Output() isSelectedCampaign: EventEmitter<number> =
    new EventEmitter<number>();
  flow: string = '';

  constructor(private store: Store<AppState>) {}
  async ngOnInit(): Promise<void> {
    this.store.select(getOutChCustData).subscribe((config) => {
      if (config) {
        this.flow = config?.Flow;
      }
    });
  }
  onSelectCampaign(index: number) {
    if (index > this.campaignData!.length) return;
    this.currentCampaign = index;
    this.isSelectedCampaign.emit(index);
  }

  ngOnChanges(changes: any) {
    if (changes?.campaignData?.firstChange) {
      return;
    } else {
      this.currentCampaign = -1;
    }
  }
}
