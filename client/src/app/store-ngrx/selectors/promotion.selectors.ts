import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getPromotionState = (state: AppState) => state.promotion;

export const getTradeInfo = createSelector(
  getPromotionState,
  (promotionState) => promotionState.selectedPromotion?.trade
);

export const getAllCampaign = createSelector(
  getPromotionState,
  (promotionState) => promotionState.allCampaign
);
