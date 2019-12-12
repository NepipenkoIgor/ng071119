import { createAction, props } from '@ngrx/store';
import { IUserState } from '../reducers/user.reducer';

export const setUser = createAction(
  '[User] setUser',
  props<{ user: IUserState }>()
);
