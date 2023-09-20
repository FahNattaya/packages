import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getPrivilegeState = (state: AppState) => state.privilege;

export const getPrivilegeData = createSelector(
  getPrivilegeState,
  (dataState) => dataState?.PrivilegeData
);
