import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getServiceCareState = (state: AppState) => state.service_care;

export const getSelectedMobileCare = createSelector(
  getServiceCareState,
  (productState) => productState.selectedMobileCare
);

// export const getMobileCare = createSelector(
//   getServiceCareState,
//   (productState) => productState.allMobileCareService
// );
