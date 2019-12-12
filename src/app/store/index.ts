import { authReducer, IAuthState } from './reducers/auth.reducer';
import { IUserState, userReducer } from './reducers/user.reducer';

export interface IStore {
  auth: IAuthState;
  user: IUserState;
}

export const reducers = {
  auth: authReducer,
  user: userReducer,
};
