import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/products.reducer';
import { ICartProduct } from '../reducers/cart.reducer';

export enum CartAction {
  ADD = '[Cart] add product',
  REMOVE = '[Cart] remove product',
  INC = '[Cart] increment product',
  DEC = '[Cart] decrement product',
  CHANGE_COUNT = '[Cart] change count for product'
}

export const addProductToCart = createAction(
  CartAction.ADD,
  props<{ product: IProduct }>()
);

export const removeProductFromCart = createAction(
  CartAction.REMOVE,
  props<{ product: ICartProduct }>()
);

export const incrementProductInCart = createAction(
  CartAction.INC,
  props<{ product: ICartProduct }>()
);

export const decrementProductInCart = createAction(
  CartAction.DEC,
  props<{ product: ICartProduct }>()
);

export const changeCountOfProductInCart = createAction(
  CartAction.CHANGE_COUNT,
  props<{ id: string , count: number }>()
);
