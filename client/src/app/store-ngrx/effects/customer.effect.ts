import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EMPTY, forkJoin, of } from 'rxjs';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { ICustomerData } from 'src/app/shared/model/customer.model';
import {
  loadCustomerDataByPhone,
  loadDataCustomerSuccess,
  loadDataCustomerFailure,
  loadBackListLimitData,
  loadDataBackListLimitSuccess,
  loadDataBackListLimitFailure,
  loadContractMobileData,
  loadDataContractMobileSuccess,
  loadDataContractMobileFailure,
  loadCustomerDataByIdentityCard,
  loadMobileNumberByIdCardNumber,
  loadMobileNumberByIdCardNumberSuccess,
} from '../actions/customer.action';
import { IContactMobile } from 'src/app/shared/model/e-document.model';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  loadCustomerDataByPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCustomerDataByPhone),
      switchMap((action) =>
        forkJoin({
          profile: this.customerService.getSubScriptionProfile(action.mobileNo),
          account: this.customerService.getSubScriptionAccount(action.mobileNo),
        }).pipe(
          switchMap(({ profile, account }) => {
            const customerAccount: ICustomerData = {
              mobileNo: action.mobileNo,
              billingSystem:
                profile.data.resultData?.subScriptionProfile.billingSystem ||
                '',
              segment:
                profile.data.resultData?.subScriptionProfile.segment || '',
              serviceYear:
                profile.data.resultData?.subScriptionProfile.serviceYear,
              chargeType:
                profile.data.resultData?.subScriptionProfile.chargeType || '',
              subscriptionState:
                profile.data.resultData?.subScriptionProfile
                  .subscriptionState || '',
              customerName:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .customerName,
              title:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .title,
              birthday:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .birthday,
              idCardNo:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .idCardNo,
              idCardType:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .idCardType,
              customerAddress:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .address[0],
              receiptAddress:
                account.data.resultData.subscriptionAccount.billingAccount[0]
                  .address[0],
              isMobileAis: profile.data.resultData?.subScriptionProfile
                ? true
                : false,
              billLanguage:
                account.data.resultData.subscriptionAccount.billingAccount[0]
                  .billLanguage,
              accountSubCat:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .accountSubCategory,
              gender:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .gender,
              exprireDate:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .cardExpired,
              engFlag:
                account.data.resultData.subscriptionAccount.customerAccount[0]
                  .address[0].engFlag,
            };
            return of(
              loadDataCustomerSuccess({ dataCustomer: customerAccount })
            );
          }),
          catchError((error: Error) => {
            return of(loadDataCustomerFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loadCustomerDataByIdentityCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCustomerDataByIdentityCard),
      switchMap((action) =>
        forkJoin({
          profile: this.customerService.getCustomerProfile(
            action.identityCard,
            action.username
          ),
        }).pipe(
          switchMap(({ profile }) => {
            const customerAccount: ICustomerData = {
              mobileNo: '',
              billingSystem: profile.resultData.customer.billingSystem || '',
              segment: '',
              serviceYear: profile.resultData.customer.birthday || '',
              chargeType: '',
              subscriptionState: '',
              customerName: profile.resultData.customer.customerName || '',
              title: profile.resultData.customer.title || '',
              birthday: profile.resultData.customer.birthday || '',
              idCardNo: profile.resultData.customer.idCardNo || '',
              idCardType: profile.resultData.customer.idCardType || '',
              customerAddress: profile.resultData.customer.address[0] || '',
              receiptAddress: profile.resultData.customer.address[0],
              isMobileAis: profile ? true : false,
              billLanguage: '',
              accountSubCat:
                profile.resultData.customer.accountSubCategory || '',
              gender: profile.resultData.customer.gender || '',
              exprireDate: '',
              engFlag: profile.resultData.customer.address[0].engFlag || '',
            };
            return of(
              loadDataCustomerSuccess({ dataCustomer: customerAccount })
            );
          }),
          catchError((error: Error) => {
            return of(loadDataCustomerFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loadDataMobileNumberByIdentityCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMobileNumberByIdCardNumber),
      mergeMap((action) =>
        this.customerService
          .getMobileNumberByIdCardNumber(action.identityCard)
          .pipe(
            map((data) =>
              loadMobileNumberByIdCardNumberSuccess({ listMobileNumber: data })
            )
          )
      )
    )
  );

  loadBlackListData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBackListLimitData),
      mergeMap((action) =>
        this.customerService.getBlackListLimit(action.IDcard).pipe(
          map((data) => loadDataBackListLimitSuccess({ data: data.data })),
          catchError((error) => of(loadDataBackListLimitFailure({ error })))
        )
      )
    )
  );

  loadContractData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContractMobileData),
      switchMap((action) =>
        forkJoin({
          contractMobile: this.customerService.getQueryContractMobile(
            action.IDcard
          ),
        }).pipe(
          switchMap(({ contractMobile }) => {
            const mergedData: IContactMobile = {
              errorMessage: contractMobile.data.errorMessage,
              profileTypeList: contractMobile.data.profileTypeList,
            };
            return of(loadDataContractMobileSuccess({ data: mergedData }));
          }),
          catchError((error: Error) => {
            return of(loadDataContractMobileFailure({ error }));
          })
        )
      ),
      catchError(() => EMPTY)
    )
  );
}
