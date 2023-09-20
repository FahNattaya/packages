import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { EDocumentService } from 'src/app/shared/service/e-document.service';
import {
  loadContractImage,
  loadContractImageSuccess,
  loadContractImageFailure,
} from '../actions/e-document.action';

@Injectable()
export class EDocumentEffects {
  constructor(
    private actions$: Actions,
    private eDocumentService: EDocumentService
  ) {}
  // getCondition$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getCondition),
  //       mergeMap((action) =>
  //         this.eDocumentService.getCondition({ conditionCode: action.conditionCode, location: action.locationCode })
  //       )
  //     ),
  //   { dispatch: false }
  // );

  getContractImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContractImage),
      mergeMap((action) =>
        this.eDocumentService
          .postContract(action.contractRequest)
          .pipe(
            map((data) =>
              loadContractImageSuccess({ contractImage: data.data })
            )
          )
      ),
      catchError((error) => of(loadContractImageFailure({ error: error })))
    )
  );
}
