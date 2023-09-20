import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs';
import { PromotionService } from 'src/app/shared/service/promotion.service';
import {
  loadCampaignByProduct,
  loadCampaignByProductSuccess,
} from '../actions/promotion.action';

@Injectable()
export class PromotionEffects {
  constructor(
    private actions$: Actions,
    private promotionService: PromotionService
  ) {}
  loadCampaignByProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCampaignByProduct),
      mergeMap((action) =>
        this.promotionService.getCampaignPromotion(action.campaignReq).pipe(
          map((response) => {
            return loadCampaignByProductSuccess({
              campaignRes: response.data,
            });
          })
        )
      )
    )
  );
}
