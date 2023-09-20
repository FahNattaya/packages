

import { createReducer, on, Action } from '@ngrx/store';
import { initialConfigMCState, } from './location.reducer';
import { loadCampaignByProductSuccess } from '../actions/promotion.action';

export interface IPromotionState {
    isLoaded: boolean;
    isLoading: boolean;
    isError?: boolean;
    allCampaign?: any;
    selectedPromotion?: any;
};

export const initialState: IPromotionState = {
    isLoaded: false,
    isLoading: false,
    isError: false,
};

export const initialStatePaymentSelected: any = {
    handset: {},
    moblieCare: {}
};


export const promotionReducer = createReducer(
  initialConfigMCState,
  on(loadCampaignByProductSuccess, (state, { campaignRes }) => ({
    ...state,
    allCampaign: campaignRes,
    isLoaded: false,
    isLoading: true
  })),
  on(loadCampaignByProductSuccess, (state, { campaignRes }) => ({
    ...state,
    allCampaign: campaignRes,
    isLoaded: true,
    isLoading: false
  })),
);

export function promotionReducerFunction(state: IPromotionState, action: Action) {
  return promotionReducer(state, action);
}