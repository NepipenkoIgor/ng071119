import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { IProduct } from './products.reducer';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  addProductToCart,
  changeCountOfProductInCart,
  decrementProductInCart,
  incrementProductInCart,
  removeProductFromCart
} from '../actions/cart.actions';
import { IUserState, userSelector } from './user.reducer';

export interface ICartProduct extends IProduct {
  count: number;
}

export const adapter: EntityAdapter<ICartProduct> = createEntityAdapter<ICartProduct>({
  selectId: (product: ICartProduct) => product._id
});
export const initialState: EntityState<ICartProduct> = adapter.getInitialState();

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
    adapter.updateOne({id, changes: {count: count - 1}}, state)),
  on(changeCountOfProductInCart, (state, {id, count}) =>
    adapter.updateOne({id, changes: {count}}, state))
);


export const {selectAll, selectTotal} = adapter.getSelectors(createFeatureSelector('cart'));

export const productsWithBonuses = createSelector(
  userSelector,
  selectAll,
  (user: IUserState, products: ICartProduct[]) => {
    return products.map((product: ICartProduct) => {
      return {
        ...product,
        price: product.price * user.bonuses
      };
    });
  }
);


export const trueTotalCount = createSelector(selectAll, (products: ICartProduct[]) => {
  return products.reduce((count: number, product: ICartProduct) => {
    return count += product.count;
  }, 0);
});

export const totalPrice = createSelector(productsWithBonuses, (products: ICartProduct[]) => {
  return products.reduce((price: number, product: ICartProduct) => {
    return price += product.price * product.count;
  }, 0);
});


