// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import {
//   loadStockDataMyShop,
//   loadStockDataMyShopSuccess,
//   loadStockDataOther,
//   loadStockDataOtherSuccess,
// } from '../actions/stock.action';
// import { map, mergeMap } from 'rxjs/operators';
// import { ProductService } from 'src/app/shared/service/product.service';

// @Injectable()
// export class StockEffects {
//   // loadStock$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(loadStockDataOther, loadStockDataMyShop),
//   //     mergeMap((action) =>
//   //       this.productService.getStockList(action.reqStock).pipe(
//   //         map((data) => {
//   //           if (
//   //             action.reqStock.locationCodeDest ===
//   //               action.reqStock.locationCodeSource ||
//   //             action.reqStock.locationCodeDest === '4289'
//   //           ) {
//   //             return loadStockDataMyShopSuccess({
//   //               dataStock: data.response.listData,
//   //             });
//   //           }
//   //           return loadStockDataOtherSuccess({
//   //             dataStock: data.response.listData,
//   //           });
//   //         })
//   //       )
//   //     )
//   //   )
//   // );

//   // loadSubStockCode$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(loadSubStockCode),
//   //     mergeMap((action) =>
//   //       this.mcConfigService.getConfig(action.outChnSaleCode).pipe(
//   //         map((data) =>
//   //           loadSubStockCodeSuccess({
//   //             code: data?.config?.subStockCodeDT,
//   //             flow: data?.config?.Flow,
//   //           })
//   //         )
//   //       )
//   //     )
//   //   )
//   // );

//   constructor(
//   ) {}
// }
