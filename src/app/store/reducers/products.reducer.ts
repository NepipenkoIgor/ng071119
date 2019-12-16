import { createReducer, on } from '@ngrx/store';
import { setUser } from '../actions/user.actions';
import { getProductsSuccess } from '../actions/product.actions';

export interface IProduct {
  '_id': string;
  'title': string;
  'img': string;
  'price': number;
  'author': string;
  'isFavorite': boolean;
}

export const initialState: IProduct[] = [];
export const productsReducer = createReducer(
  initialState,
  on(getProductsSuccess, (state, {products}) => ([...state, ...products])),
);
