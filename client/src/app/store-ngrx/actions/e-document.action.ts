import { createAction, props } from '@ngrx/store';
import { IContactRequest } from 'src/app/shared/model/e-document.model';

export const getCondition = createAction(
  '[E-Document] get condition ',
  props<{ conditionCode: any }>()
);
export const loadContractImage = createAction(
  '[E-Document] Load contract image ',
  props<{ contractRequest: IContactRequest }>()
);
export const loadContractImageSuccess = createAction(
  '[E-Document] Load contract image Success',
  props<{ contractImage: string }>()
);
export const loadContractImageFailure = createAction(
  '[E-Document] Load contract image Failure',
  props<{ error: any }>()
);
