import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartProduct } from '../../../../../store/reducers/cart.reducer';
import { FormControl } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  @Input()
  public set product(p: ICartProduct) {
    if (!p) {
      return;
    }
    this.countValue.patchValue(p.count, {emitEvent: false});
    this.currentProduct = p;

  };

  public currentProduct: ICartProduct;

  @Output()
  public remove = new EventEmitter();
  @Output()
  public increment = new EventEmitter();
  @Output()
  public decrement = new EventEmitter();

  @Output()
  public changeCount = new EventEmitter();

  public countValue = new FormControl();

  public ngOnInit(): void {
    this.countValue.valueChanges
      .pipe(
        map((count: string) => Number(count)),
        filter((count: number) => !Number.isNaN(count))
      )
      .subscribe((count) =>
        this.changeCount.emit({count, id: this.currentProduct._id}));
  }

  public incrementProduct() {
    this.increment.emit(this.currentProduct);
  }

  public decrementProduct() {
    console.log(typeof this.currentProduct.count);
    if (this.currentProduct.count === 1) {
      this.removeProduct();
      return;
    }
    this.decrement.emit(this.currentProduct);
  }

  public removeProduct() {
    this.remove.emit(this.currentProduct);
  }

}
