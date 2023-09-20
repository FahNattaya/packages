import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { PrivilegeService } from 'src/app/shared/service/privilege.service';
import { PromotionService } from 'src/app/shared/service/promotion.service';
import {
  checkPrivilege,
  requestPrivilege,
  checkDeviceContract,
  updateStatusPrivilege,
} from '../actions/privilege.action';

@Injectable()
export class PrivilegeEffects {
  constructor(
    private actions$: Actions,
    private privilegeService: PrivilegeService,
    private promotionService: PromotionService
  ) {}
  checkPrivilege$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkPrivilege),
      mergeMap((action) =>
        this.privilegeService
          .getPrivilege(action.req, 'check-privilege-status')
          .pipe(
            map((response) => {
              if (response && response.status === '20000') {
                return requestPrivilege({ req: action.req });
              } else if (
                response.developerMessage.includes('[DUPLICATE]') ||
                response.developerMessage.includes('[SEND_MSG_AGAIN]')
              ) {
                return checkDeviceContract({ req: action.req });
              } else if (
                response.developerMessage.includes(
                  '[MT_INVALID_CRITERIA_MAINPRO]'
                ) ||
                response.developerMessage.includes(
                  '[INVALID_CRITERIA_MAINPRO]'
                ) ||
                response.developerMessage.includes('[ขออภัย main pro ไม่ถึง]')
              ) {
                return updateStatusPrivilege({
                  data: {
                    ussdCode: action.req.shortcode,
                    msgBarcode: response.msgBarcode,
                    isCheckPrivilegePass: true,
                  },
                });
              } else {
                return updateStatusPrivilege({
                  data: {
                    isCheckPrivilegePass: false,
                    errorMsg: response.resultDescription.match(/\[(.*?)\]/)[1],
                    errorDetail: response.developerMessage,
                  },
                });
              }
            }),
            catchError(() => {
              return of(
                updateStatusPrivilege({
                  data: { errorMsg: 'ระบบไม่สามารถแสดงได้ขณะนี้' },
                })
              );
            })
          )
      )
    )
  );

  requestPrivilege$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestPrivilege),
      mergeMap((action) =>
        this.privilegeService
          .getPrivilege(action.req, 'request-privilege-barcode')
          .pipe(
            map((response) => {
              //check dup
              if (response.status === '20000' && response.msgBarcode) {
                return updateStatusPrivilege({
                  data: {
                    ussdCode: action.req.shortcode,
                    msgBarcode: response.msgBarcode,
                    isCheckPrivilegePass: true,
                  },
                });
              } else if (
                response.developerMessage.includes('[DUPLICATE]') ||
                response.developerMessage.includes('[SEND_MSG_AGAIN]')
              ) {
                return checkDeviceContract({ req: action.req });
              }
              return updateStatusPrivilege({
                data: {
                  msgBarcode: response.msgBarcode,
                  isCheckPrivilegePass: false,
                },
              });
            }),
            catchError(() =>
              of(
                updateStatusPrivilege({
                  data: { errorMsg: 'ระบบไม่สามารถทำรายการได้ขณะนี้' },
                })
              )
            )
          )
      )
    )
  );

  checkDeviceTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkDeviceContract),
      mergeMap((action) =>
        this.promotionService.checkDeviceContract(action.req).pipe(
          map((response) => {
            const dataFilter = response.privilegeArr.filter(
              (data: any) => data.usedDate
            );
            if (dataFilter && dataFilter.length > 0) {
              return updateStatusPrivilege({
                data: {
                  isCheckPrivilegePass: false,
                  errorMsg:
                    'ขออภัย คุณได้ใช้สิทธิพิเศษนี้แล้ว กรุณาใช้สิทธิ์ครั้งต่อไปตามเงื่อนไข',
                },
              });
            }
            return updateStatusPrivilege({
              data: {
                isCheckPrivilegePass: true,
                msgBarcode: response.privilegeArr[0].msgBarcode,
              },
            });
          }),
          catchError((error) => of(updateStatusPrivilege({ data: error })))
        )
      )
    )
  );
}
