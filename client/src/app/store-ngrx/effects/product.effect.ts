import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import {
  loadProductDetail,
  loadStockDataMyShop,
  loadStockDataMyShopSuccess,
  loadStockDataOther,
  loadStockDataOtherSuccess,
  saveSelectBrandModel,
} from '../actions/product.action';
import { ProductService } from 'src/app/shared/service/product.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadModelDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductDetail),
      mergeMap((action) =>
        this.productService.getProductDetail(action.model).pipe(
          map((data) => {
            const colors = data.products.map((product, index) => {
              return {
                colorId: index,
                code: `#${product.colorCode}`,
                name: product.colorName,
                stock: '0',
                imageUrl: product.images.baseView.map(
                  (image) => image.imageUrl
                ),
              };
            });
            return saveSelectBrandModel({
              selectedProduct: {
                ...action.model,
                colors: colors,
                ...action.data,
              },
            });
          })
        )
      )
    )
  );

  loadStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStockDataOther, loadStockDataMyShop),
      mergeMap((action) =>
        this.productService.getStockList(action.reqStock).pipe(
          map((data) => {
            if (
              action.reqStock.locationCodeDest ===
                action.reqStock.locationCodeSource ||
              action.reqStock.locationCodeDest === '4289'
            ) {
              return loadStockDataMyShopSuccess({
                dataStock: data.response.listData,
              });
            }
            return loadStockDataOtherSuccess({
              dataStock: data.response.listData,
            });
          })
        )
      )
    )
  );
}
