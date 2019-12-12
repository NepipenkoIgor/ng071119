import { createReducer, on } from '@ngrx/store';
import { loginPending, loginSuccess, signupPending, signupSuccess } from '../actions/auth.actions';

export interface IAuthState {
  isLogged: boolean;
  loading: boolean;
}

export const initialState: IAuthState = {
  isLogged: false,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(loginPending, state => ({...state,   loading: true})),
  on(loginSuccess, state => ({...state, loading: false, isLogged: true })),
  on(signupPending, state => ({...state,   loading: true})),
  on(signupSuccess, state => ({...state, loading: false, isLogged: true })),
);

