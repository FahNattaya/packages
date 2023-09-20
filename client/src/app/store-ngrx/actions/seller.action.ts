import { createAction, props } from '@ngrx/store';
import { ISeller } from 'src/app/shared/model/seller.model';

export const saveUser = createAction(
  '[Seller] Save user information',
  props<{ userData: ISeller }>()
);
export const loadUserData = createAction(
  '[Seller] Load User',
  props<{ userData: ISeller }>()
);
