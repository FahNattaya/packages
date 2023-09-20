import { createAction, props } from "@ngrx/store";
import { IOutChannelSales, ICustomerCriteria } from "src/app/shared/model/mc-config.model";
// import { IMcConfigFlow } from "src/app/shared/model/mc-config.model";

export const loadConfigMC = createAction(
    '[ConfigMC] Load ConfigMC',
    props<{ nameConfig: string }>()
  );
  export const loadConfigMCSuccess = createAction(
    '[ConfigMC] Load ConfigMC Success',
    props<{ configMC: IOutChannelSales | ICustomerCriteria , nameConfig: string }>()
  );
  export const loadConfigMCFailure = createAction(
    '[ConfigMC] Load ConfigMC Failure',
    props<{ error: any }>()
  );

  export const loadConfigMcOutCh = createAction(
    '[ConfigMC] Load ConfigMC Out Channel Sale',
    props<{ nameConfig: string }>()
  );