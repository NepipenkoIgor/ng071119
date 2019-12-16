import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/products.reducer';
import { ICartProduct } from '../reducers/cart.reducer';

export const addProductToCart = createAction(
  '[Cart] add product',
  props<{ product: IProduct }>()
);

export const removeProductFromCart = createAction(
  '[Cart] add product',
  props<{ product: ICartProduct }>()
);

export const incrementProductInCart = createAction(
  '[Cart] add product',
  props<{ product: ICartProduct }>()
);

export const decrementProductInCart = createAction(
  '[Cart] add product',
  props<{ product: ICartProduct }>()
);

