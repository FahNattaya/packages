import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs';
import {
  loadMinimumPackages,
  loadMinimumPackagesSuccess,
  loadPromotionShelves,
  loadPromotionShelvesSuccess,
} from '../actions/product-package.action';
import { PromotionService } from 'src/app/shared/service/promotion.service';
import { ProductPackageService } from 'src/app/shared/service/product-package.service';
import {
  loadCurrentPackage,
  loadCurrentPackageSuccess,
  loadContractFirstPack,
  loadContractFirstPackSuccess,
} from '../actions/package.action';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductPackageEffects {
  constructor(
    private actions$: Actions,
    private promotionService: PromotionService,
    private productPackageService: ProductPackageService,
    private customerService: CustomerService
  ) {}
  loadPromotionShelves$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPromotionShelves),
      mergeMap((action) =>
        this.promotionService
          .getPromotionShelves(action.promotionShelvesReq)
          .pipe(
            map((data) => {
              return loadPromotionShelvesSuccess({ promotionShelvesRes: data });
            })
          )
      )
    )
  );
  loadMinimumPackages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMinimumPackages),
      mergeMap((action) =>
        this.productPackageService.getMinimumPackage(action.packageReq).pipe(
          map((data) => {
            return loadMinimumPackagesSuccess({ packageRes: data.data });
          })
        )
      )
    )
  );

  getCurrentPackage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentPackage),
      mergeMap((action) =>
        this.customerService
          .getCurrentPackage(action.mobileNumber, action.language)
          .pipe(
            map((data) =>
              loadCurrentPackageSuccess({ currentPackage: data.data })
            )
          )
      )
    )
  );

  getFirstContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContractFirstPack),
      mergeMap((action) =>
        this.customerService
          .getFirstContract(action.mobileNo, action.idCardNo)
          .pipe(
            map((data) =>
              loadContractFirstPackSuccess({ contractFirstPack: data.data })
            )
          )
      )
    )
  );
}
