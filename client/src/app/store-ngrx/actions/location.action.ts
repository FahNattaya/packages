import { createAction, props } from '@ngrx/store';
import {
  ILocationName,
} from 'src/app/shared/model/location.model';
import { ICompanyName } from 'src/app/shared/model/mc-config.model';

export const loadLocationData = createAction(
  '[Location] Load Data Near By Location',
  props<{ filterType: string; locationCode: string; locationType: string }>()
);
export const loadLocationDataSuccess = createAction(
  '[Location] Load Data Near By Location Success',
  props<{ dataLocation: any }>()
);
export const loadLocationDataFailure = createAction(
  '[Location] Load Data Near By Location Failure',
  props<{ error: any }>()
);
export const loadLocationName = createAction(
  '[LocationName] Load LocationName',
  props<{ locationCode: string }>()
);
export const loadLocationNameSuccess = createAction(
  '[LocationName] Load LocationName Success',
  props<{ dataLocationName: ILocationName }>()
);
export const loadLocationNameFailure = createAction(
  '[LocationName] Load LocationName Failure',
  props<{ error: any }>()
);
export const loadCompanyName = createAction(
  '[CompanyName] Load CompanyName',
  props<{ companyAbbr: string }>()
);
export const loadCompanyNameSuccess = createAction(
  '[CompanyName] Load CompanyName Success',
  props<{ dataCompanyName: ICompanyName }>()
);
export const loadCompanyNameFailure = createAction(
  '[CompanyName] Load CompanyName Failure',
  props<{ error: any }>()
);

export const loadQueueLocation = createAction(
  '[QueueLocation] load queueType Location'
);
export const loadQueueLocationSuccess = createAction(
  '[QueueLocation] load queueType Location success',
  props<{ queueType: string }>()
);
