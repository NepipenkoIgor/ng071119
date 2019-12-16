import { createReducer, on } from '@ngrx/store';
import { checkJWT, loginError, loginPending, loginSuccess, signupPending, signupSuccess } from '../actions/auth.actions';

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
  on(checkJWT, state => ({...state,   loading: true})),
  on(loginPending, state => ({...state,   loading: true})),
  on(loginSuccess, state => ({...state, loading: false, isLogged: true })),
  on(loginError, state => ({...state, loading: false, isLogged: false })),
  on(signupPending, state => ({...state,   loading: true})),
  on(signupSuccess, state => ({...state, loading: false, isLogged: true })),
);

