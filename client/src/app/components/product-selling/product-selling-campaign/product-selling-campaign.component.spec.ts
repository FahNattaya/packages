import { Store } from '@ngrx/store';
import { ProductSellingCampaignComponent } from './product-selling-campaign.component';
import { ICampaignResponseData } from 'src/app/shared/model/promotion.model';
import { AppState } from 'src/app/store-ngrx/app.state';

const mockCampaignData: ICampaignResponseData[] = [
  {
    campaignId: 1,
    campaignDesc: 'test',
    campaignName: 'test',
    imageUrl: 'imageUrl',
    icon: 'icon',
    recommendFlag: true,
    payAdvanceFlag: true,
    installmentFlag: true,
    fullPaymentFlag: true,
    maximumContract: 10,
    customerGroup: 'customerGroup',
    conditionCode: 'conditionCode',
  },
  {
    campaignId: 2,
    campaignDesc: 'test2',
    campaignName: 'test2',
    imageUrl: 'imageUrl',
    icon: 'icon',
    recommendFlag: true,
    payAdvanceFlag: true,
    installmentFlag: true,
    fullPaymentFlag: true,
    maximumContract: 10,
    customerGroup: 'customerGroup',
    conditionCode: 'conditionCode',
  },
  {
    campaignId: 3,
    campaignDesc: 'test3',
    campaignName: 'test3',
    imageUrl: 'imageUrl',
    icon: 'icon',
    recommendFlag: true,
    payAdvanceFlag: true,
    installmentFlag: true,
    fullPaymentFlag: true,
    maximumContract: 10,
    customerGroup: 'customerGroup',
    conditionCode: 'conditionCode',
  },
];

describe('ProductSellingCampaignComponent', () => {
  let component: ProductSellingCampaignComponent;
  let store: Store<AppState>;

  beforeEach(async () => {
    component = new ProductSellingCampaignComponent(store);
    component.campaignData = mockCampaignData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can select campaign', () => {
    component.onSelectCampaign(1);
    expect(component.currentCampaign).toBe(1);
  });

  it('select campaign but not go out of bound', () => {
    const olSelected = component.currentCampaign;
    component.onSelectCampaign(5);
    expect(component.currentCampaign).toBe(olSelected);
  });

  it('should emit event when select campaign', () => {
    component.isSelectedCampaign.emit = jest.fn();
    component.onSelectCampaign(2);
    expect(component.isSelectedCampaign.emit).toBeCalledWith(2);
  });
});
