import { Component, OnInit } from '@angular/core';
import { IStore } from '../../../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICartProduct, productsWithBonuses, totalPrice } from '../../../../store/reducers/cart.reducer';
import {
  changeCountOfProductInCart,
  decrementProductInCart,
  incrementProductInCart,
  removeProductFromCart
} from '../../../../store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products$: Observable<ICartProduct[]>;
  public totalPrice$: Observable<number>;

  public constructor(
    private store: Store<IStore>
  ) {
  }

  public ngOnInit() {
    this.products$ = this.store.select(productsWithBonuses);
    this.totalPrice$ = this.store.select(totalPrice);
  }

  public incrementProduct(product: ICartProduct) {
    this.store.dispatch(incrementProductInCart({product}));
  }

  public decrementProduct(product: ICartProduct) {
    this.store.dispatch(decrementProductInCart({product}));
  }

  public removeProduct(product: ICartProduct) {
    this.store.dispatch(removeProductFromCart({product}));
  }

  public changeCount(product: { count: number, id: string }) {
    console.log(product);
    this.store.dispatch(changeCountOfProductInCart(product));
  }

  public trackProductsBy(_index: number, item: ICartProduct): string {
    return item._id;
  }

}
