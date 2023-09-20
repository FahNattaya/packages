import { createAction, props } from '@ngrx/store';
import { IPromotionShelvesReq, IPackageRequest, IDataPackageSelected } from 'src/app/shared/model/product-package.model';
export const loadPromotionShelves = createAction(
  '[Product Package] load promotion shelves',
  props<{ promotionShelvesReq: IPromotionShelvesReq }>()
);
export const loadPromotionShelvesSuccess = createAction(
  '[Product Package] load promotion shelves successs',
  props<{ promotionShelvesRes: any }>()
);
export const loadMinimumPackages = createAction(
  '[Product Package] load minimum package',
  props<{ packageReq: IPackageRequest }>()
);
export const loadMinimumPackagesSuccess = createAction(
  '[Product Package] load minimum package successs',
  props<{ packageRes: any }>()
);
export const selectedPackage = createAction(
  '[Package] save selected package',
  props<{ dataSelectPackage: IDataPackageSelected }>()
);