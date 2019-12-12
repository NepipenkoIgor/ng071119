import { createAction, props } from '@ngrx/store';

export const loginPending = createAction(
  '[Login] Login pending',
  props<{ user: { username: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Login] Login success'
);

export const loginError = createAction(
  '[Login] Login error',
);

export const signupPending = createAction(
  '[Signup] Signup pending',
  props<{ user: any }>()
);

export const signupSuccess = createAction(
  '[Signup] Signup success',
);

export const signupError = createAction(
  '[Signup] Signup error',
);

