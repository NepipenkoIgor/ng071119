import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../../modal/modal.service';
import { CardConfirmModalComponent } from './card-confirm-modal/card-confirm-modal.component';
import { IProduct } from '../../../../../store/reducers/products.reducer';
import { IStore } from '../../../../../store';
import { Store } from '@ngrx/store';
import { addProductToCart } from '../../../../../store/actions/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: IProduct;
  @Input()
  public isOdd: boolean;

  constructor(
    private modalService: ModalService,
    private cfr: ComponentFactoryResolver,
    private store: Store<IStore>,
  ) {
  }

  ngOnInit() {

  }

  public addToCart(): void {
    this.modalService.open({
      component: CardConfirmModalComponent,
      cfr: this.cfr,
      context: {
        product: this.product,
        save: () => {
          console.log('Add to cart');
          this.store.dispatch(addProductToCart({product: this.product}));
          this.modalService.close();
        },
        close: () => {
          this.modalService.close();
        }
      }
    });
  }
}
