import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { genQueue, genQueueSuccess } from '../actions/queue.action';
import { Injectable } from '@angular/core';

@Injectable()
export class QueueEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}
  loadGenQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(genQueue),
      mergeMap((action) =>
        this.paymentService
          .sendSMSQmatic(action.mobileNo)
          .pipe(map((data) => genQueueSuccess({ queueNo: data.data.queueNo })))
      )
    )
  );
}
