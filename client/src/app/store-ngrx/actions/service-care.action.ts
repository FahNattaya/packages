import { createAction, props } from "@ngrx/store";
import { IMobileCare } from "src/app/shared/model/service-care.model";

  export const saveMobileCare = createAction(
    '[Service-Care] save Mobile Care form ',
    props<{ model: IMobileCare[] }>()
  );