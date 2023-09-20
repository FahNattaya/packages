import { createAction, props } from '@ngrx/store';

export const genQueue = createAction(
  '[Queue] Wait Gen Queue ',
  props<{ mobileNo: string }>()
);
export const genQueueSuccess = createAction(
  '[Queue]  Gen Queue success ',
  props<{ queueNo: string }>()
);
export const saveQueue = createAction(
  '[Queue] save queue from create order list from DT Success',
  props<{ queueNo: string }>()
);
