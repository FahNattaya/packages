import { createReducer, on } from '@ngrx/store';
import { updateStatusPrivilege } from '../actions/privilege.action';
import { ICustomerPrivilege } from 'src/app/shared/model/privilege.model';

export interface IPrivilegeState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  PrivilegeData?: ICustomerPrivilege;
}

export const initialState: IPrivilegeState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const PrivilegeReducer = createReducer(
  initialState,
  on(updateStatusPrivilege, (state, { data }) => ({
    ...state,
    PrivilegeData: data,
  }))
);
