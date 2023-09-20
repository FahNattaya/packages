import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getQueueState = (state: AppState) => state.queue;

export const getQueueNo = createSelector(
  getQueueState,
  (dataState) => dataState.queueNo
);
