import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs';
import { TokenService } from 'src/app/core/service/token.service';
import {
  ICustomerCriteria,
  IOutChannelSales,
} from 'src/app/shared/model/mc-config.model';
import { McConfigService } from 'src/app/shared/service/mc-config.service';
import {
  loadConfigMC,
  loadConfigMCSuccess,
  loadConfigMcOutCh,
} from '../actions/mc-config.action';
import {
  loadSubStockCode,
  loadSubStockCodeSuccess,
} from '../actions/stock.action';
import {
  getConfigMCData,
  getOutChCustData,
} from '../selectors/mc-config.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class McConfigEffects {
  constructor(
    private actions$: Actions,
    private mcConfigService: McConfigService,
    private tokenService: TokenService,
    private store: Store<AppState>
  ) {}

  loadConfigMC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConfigMC),
      withLatestFrom(this.store.select(getConfigMCData)),
      filter(([_, dataFromStore]) => dataFromStore === undefined),
      mergeMap(([action]) =>
        this.mcConfigService.getConfigMC(action.nameConfig).pipe(
          map((response: any) => {
            if (this.isICustomerCriteria(response)) {
              response = response
                .filter((datas: any) => {
                  datas.details = datas.details.filter((data: any) => {
                    return data.outChnSalesCode.includes(
                      this.tokenService.getDataToken().outChnSalesCode
                    );
                  });
                  return datas.details.length > 0;
                })
                .sort((a: ICustomerCriteria, b: ICustomerCriteria) => {
                  return a.codeID > b.codeID ? 1 : a.codeID < b.codeID ? -1 : 0;
                });
            }
            return loadConfigMCSuccess({
              configMC: response,
              nameConfig: action.nameConfig,
            });
          })
        )
      )
    )
  );

  loadSubStockCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSubStockCode),
      mergeMap((action) =>
        this.mcConfigService.getConfig(action.outChnSaleCode).pipe(
          map((data) =>
            loadSubStockCodeSuccess({
              code: data?.config?.subStockCodeDT,
              flow: data?.config?.Flow,
            })
          )
        )
      )
    )
  );

  loadConfigMcOutChSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConfigMcOutCh),
      withLatestFrom(this.store.select(getOutChCustData)),
      filter(([_, dataFromStore]) => dataFromStore === undefined),
      mergeMap(([action]) =>
        this.mcConfigService.getConfigMC(action.nameConfig).pipe(
          map((response: ICustomerCriteria[] | IOutChannelSales[]) => {
            if (this.isIOutChannelSales(response)) {
              response = response.filter(
                (data) =>
                  data.outChnSalesCode ===
                  this.tokenService.getDataToken().outChnSalesCode
              );
            }
            return loadConfigMCSuccess({
              configMC: response[0],
              nameConfig: action.nameConfig,
            });
          })
        )
      )
    )
  );

  isIOutChannelSales(
    arr: ICustomerCriteria[] | IOutChannelSales[]
  ): arr is IOutChannelSales[] {
    return (arr as IOutChannelSales[])[0].outChnSalesCode !== undefined;
  }
  isICustomerCriteria(
    arr: ICustomerCriteria[] | IOutChannelSales[]
  ): arr is ICustomerCriteria[] {
    return (arr as ICustomerCriteria[])[0].codeID !== undefined;
  }
}
