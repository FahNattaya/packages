import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
export const getLocationState = (state: AppState) => state.location;

export const getLocationData = createSelector(
  getLocationState,
  (dataState) => dataState.dataLocation
);

export const getLoading = createSelector(
  getLocationState,
  (dataState) => dataState.isLoading
);

export const getError = createSelector(
  getLocationState,
  (dataState) => dataState.isError
);

export const getDataError = createSelector(
  getLocationState,
  (dataState) => dataState.errorData
);

export const getLocationName = createSelector(
  getLocationState,
  (dataState) => dataState.dataLocationName
);
export const getQueueType = createSelector(
  getLocationState,
  (dataState) => dataState.queueTypeLocation
);
