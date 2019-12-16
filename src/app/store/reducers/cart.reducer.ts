import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { IProduct } from './products.reducer';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { addProductToCart, decrementProductInCart, incrementProductInCart, removeProductFromCart } from '../actions/cart.actions';

export interface ICartProduct extends IProduct {
  count: number;
}

export const adapter: EntityAdapter<ICartProduct> = createEntityAdapter<ICartProduct>({
  selectId: (product: ICartProduct) => product._id
});
export const initialState: EntityState<ICartProduct> = adapter.getInitialState();

//TODO why not work
export const cartReducer = createReducer(
  initialState,
  on(addProductToCart, (state, {product}) => {
    const cartProduct: ICartProduct | undefined = state.entities[product._id];
    return adapter.upsertOne({
      ...product,
      count: cartProduct ? cartProduct.count : 1
    }, state);
  }),
  on(removeProductFromCart, (state, {product}) => adapter.removeOne(product._id, state)),
  on(incrementProductInCart, (state, {product: {_id: id, count}}) =>
    adapter.updateOne({id, changes: {count: count + 1}}, state)),
  on(decrementProductInCart, (state, {product: {_id: id, count}}) =>
    adapter.updateOne({id, changes: {count: count - 1}}, state)));


export const {selectAll}  = adapter.getSelectors(createFeatureSelector('cart'));
