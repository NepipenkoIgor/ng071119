import { Component, OnInit } from '@angular/core';
import { IStore } from '../../../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICartProduct , selectAll} from '../../../../store/reducers/cart.reducer';
import { incrementProductInCart } from '../../../../store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products$: Observable<ICartProduct[]>;

  public constructor(
    private store: Store<IStore>
  ) {
  }

  public ngOnInit() {
    this.products$ = this.store.select(selectAll);
  }

  public incrementProduct(product: ICartProduct) {
    this.store.dispatch(incrementProductInCart({product}));
  }

  public decrementProduct(product: ICartProduct) {
    this.store.dispatch(incrementProductInCart({product}));
  }

  public removeProduct(product: ICartProduct) {
    this.store.dispatch(incrementProductInCart({product}));
  }

  public trackProductsBy(_index: number, item: ICartProduct): string {
    return item._id;
  }

}
