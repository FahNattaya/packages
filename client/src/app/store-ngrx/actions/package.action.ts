import { createAction, props } from '@ngrx/store';
import {
  ICurrentPackage,
  IContractFirstPack,
} from 'src/app/shared/model/product-package.model';

export const loadCurrentPackage = createAction(
  '[Product Package] Load current package',
  props<{ mobileNumber: string; language: string }>()
);

export const loadCurrentPackageSuccess = createAction(
  '[Product Package] Get current package success',
  props<{ currentPackage: ICurrentPackage }>()
);

export const loadContractFirstPack = createAction(
  '[Product Package] Load first contract',
  props<{ mobileNo: string; idCardNo: string }>()
);

export const loadContractFirstPackSuccess = createAction(
  '[Product Package] Load first Contract Success',
  props<{ contractFirstPack: IContractFirstPack }>()
);
