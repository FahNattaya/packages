import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getDataState = (state: AppState) => state.seller;

export const getUserData = createSelector(
    getDataState,
    dataState => dataState.userData
);

export const getLoading = createSelector(
    getDataState,
    dataState => dataState.isLoading
);

export const getError = createSelector(
    getDataState,
    dataState => dataState.isError
);

export const getLocationCode = createSelector(
    getDataState,
    dataState => dataState.userData?.locationCode
);