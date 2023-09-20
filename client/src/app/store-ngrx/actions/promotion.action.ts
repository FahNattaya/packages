import { createAction, props } from '@ngrx/store';
import { ICampaignRequest, ITradeRequest } from 'src/app/shared/model/promotion.model';

export const loadCampaignByProduct = createAction(
  '[Promotion] load campaign by product',
  props<{ campaignReq: ICampaignRequest }>()
);
export const loadCampaignByProductSuccess = createAction(
  '[Promotion] load campaign by product successs',
  props<{ campaignRes: any }>()
);
export const loadTradePromotion = createAction(
  '[Promotion] load trade by campaign and model',
  props<{ tradeReq: ITradeRequest }>()
);
export const loadTradePromotionSuccess = createAction(
  '[Promotion] load trade by campaign and model successs',
  props<{ tradeRes: any }>()
);

