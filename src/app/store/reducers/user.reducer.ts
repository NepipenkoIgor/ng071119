import { createReducer, on } from '@ngrx/store';
import { setUser } from '../actions/user.actions';
import { IStore } from '../index';

export interface IUserState {
  '_id': string;
  'createdAt': string;
  'username': string;
  'accessToken': string;
  bonuses: number;
}

export const initialState: IUserState = {
  _id: '',
  createdAt: '',
  username: '',
  accessToken: '',
  bonuses: 0.8
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, ...user})),
);

export const userSelector = (state: IStore) => state.user;
