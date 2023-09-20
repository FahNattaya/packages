import { createReducer, on } from '@ngrx/store';
import { loadUserData, saveUser } from '../actions/seller.action';
import { ISeller } from 'src/app/shared/model/seller.model';

export interface ISellerState {
  isLoaded: boolean;
  isLoading: boolean;
  isError?: boolean;
  userData?: ISeller;
}

export const initialState: ISellerState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
};

export const sellerReducer = createReducer(
  initialState,
  on(loadUserData, (state, { userData }) => ({
    ...state,
    userData: userData,
    isLoaded: false,
    isLoading: true,
  })),
  on(saveUser, (state, { userData }) => ({
    ...state,
    userData: userData,
    isLoaded: true,
    isLoading: false,
  }))
);
