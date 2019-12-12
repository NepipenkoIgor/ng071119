import { createReducer, on } from '@ngrx/store';
import { setUser } from '../actions/user.actions';

export interface IUserState {
  '_id': string;
  'createdAt': string;
  'username': string;
  'accessToken': string;
}

export const initialState: IUserState = {
  _id: '',
  createdAt: '',
  username: '',
  accessToken: '',
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, ...user})),
);
