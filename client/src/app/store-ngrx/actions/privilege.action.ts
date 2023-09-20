import { createAction, props } from '@ngrx/store';
import { ICheckPrivilegeRequest } from 'src/app/shared/model/privilege.model';

export const saveUSSDCode = createAction(
  '[Privilege] Save USSD Code',
  props<{ ussdCode: string }>()
);
export const checkPrivilege = createAction(
  '[Privilege] Check Privilege',
  props<{ req: ICheckPrivilegeRequest }>()
);
export const requestPrivilege = createAction(
  '[Privilege] Request Privilege',
  props<{ req: ICheckPrivilegeRequest }>()
);
export const checkDeviceContract = createAction(
  '[Privilege] Check Device Contract',
  props<{ req: any }>()
);
export const updateStatusPrivilege = createAction(
  '[Privilege] update privilege code',
  props<{ data: any }>()
);
