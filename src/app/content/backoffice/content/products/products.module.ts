import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsFilterPipe } from './products-filter.pipe';
import { ProductsService } from './products.service';
import { CardConfirmModalComponent } from './product-card/card-confirm-modal/card-confirm-modal.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ProductsComponent, ProductsFilterPipe,
    ProductCardComponent, CardConfirmModalComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent
      }
    ])
  ],
  providers: [
    ProductsService,
  ],
  entryComponents: [CardConfirmModalComponent],
})
export class ProductsModule {
}
