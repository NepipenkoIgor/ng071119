import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/products.reducer';

export const getProductsPending = createAction(
  '[Products] get products pending',
);
export const getProductsSuccess = createAction(
  '[Products] get products success',
  props<{ products: IProduct[] }>()
);
