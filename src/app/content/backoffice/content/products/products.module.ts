import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsFilterPipe } from './products-filter.pipe';
import { CardConfirmModalComponent } from './product-card/card-confirm-modal/card-confirm-modal.component';
import { RouterModule } from '@angular/router';
import { OneProductComponent } from './one-product/one-product.component';
import { OneProductResolveService } from './one-product/one-product-resolve.service';


@NgModule({
  declarations: [ProductsComponent, ProductsFilterPipe,
    ProductCardComponent, CardConfirmModalComponent, OneProductComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: ':id', // TODO could be with ? ???
        component: OneProductComponent,
        data: {
          title: 'One product page'
        },
        resolve: {
          product: OneProductResolveService
        }
      }
    ])
  ],
  providers: [
    OneProductResolveService
  ],
  entryComponents: [CardConfirmModalComponent],
})
export class ProductsModule {
}
