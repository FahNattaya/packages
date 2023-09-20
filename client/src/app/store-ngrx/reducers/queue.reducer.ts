import { createReducer, on, Action } from '@ngrx/store';
import { saveQueue } from '../actions/queue.action';

export interface IQueueState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  queueNo?: string;
}

export const initialState: IQueueState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const initialStatePaymentSelected: any = {
  handset: {},
  moblieCare: {},
};

export const queueReducer = createReducer(
  initialState,
  on(saveQueue, (state, { queueNo }) => ({
    ...state,
    queueNo: queueNo,
  }))
);

export function queueReducerFunction(state: IQueueState, action: Action) {
  return queueReducer(state, action);
}
