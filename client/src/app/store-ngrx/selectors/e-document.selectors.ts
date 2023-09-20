import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const geteDocState = (state: AppState) => state.e_document;

export const getContractImageData = createSelector(
    geteDocState,
    dataState => dataState.contractImage
);
export const getContractError = createSelector(
    geteDocState,
    dataState => dataState.contractError
);
