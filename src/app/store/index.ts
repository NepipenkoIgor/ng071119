import { authReducer, IAuthState } from './reducers/auth.reducer';
import { IUserState, userReducer } from './reducers/user.reducer';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducer } from '@ngrx/store';
import { logoutSuccess } from './actions/auth.actions';
import { IProduct, productsReducer } from './reducers/products.reducer';
import { cartReducer, ICartProduct } from './reducers/cart.reducer';
import { EntityState } from '@ngrx/entity';

export interface IStore {
  auth: IAuthState;
  user: IUserState;
  products: IProduct[];
  cart: EntityState<ICartProduct>;
  router: RouterReducerState;
}

export const reducers = {
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  router: routerReducer,
};

export interface IRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<IRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: {queryParams},
    } = routerState;
    const {params} = route;
    return {url, params, queryParams};
  }
}


export function logoutAndStoreClearState(reducer: ActionReducer<IStore>): ActionReducer<IStore> {
  return (state: IStore | undefined, action) => {
    if (action.type === logoutSuccess().type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers = [logoutAndStoreClearState];
