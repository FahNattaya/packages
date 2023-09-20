import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import {
  loadCompanyName,
  loadCompanyNameSuccess,
  loadLocationData,
  loadLocationDataSuccess,
  loadLocationName,
  loadLocationNameSuccess,
  loadQueueLocation,
  loadQueueLocationSuccess,
} from '../actions/location.action';
import { LocationService } from 'src/app/shared/service/location.service';
import { McConfigService } from 'src/app/shared/service/mc-config.service';

@Injectable()
export class LocationEffects {
  loadLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLocationData),
      mergeMap((action) =>
        this.locationService
          .getNearByLocation(
            action.filterType,
            action.locationCode,
            action.locationType
          )
          .pipe(map((data) => loadLocationDataSuccess({ dataLocation: data })))
      )
    )
  );

  loadLocationName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLocationName),
      mergeMap((action) =>
        this.locationService
          .getLocationName(action.locationCode)
          .pipe(
            map((data) => loadLocationNameSuccess({ dataLocationName: data }))
          )
      )
    )
  );

  loadCompanyName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanyName),
      mergeMap((action) =>
        this.mcConfigService
          .getCompanyName(action.companyAbbr)
          .pipe(
            map((data) => loadCompanyNameSuccess({ dataCompanyName: data }))
          )
      )
    )
  );
  
  loadQueueTypeLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQueueLocation),
      mergeMap(() =>
        this.locationService
          .getQueueTypeLocation()
          .pipe(
            map((data) =>
              loadQueueLocationSuccess({ queueType: data.queueType })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private mcConfigService: McConfigService
  ) {}
}
