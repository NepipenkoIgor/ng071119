import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExchangeRatesComponent } from './header/exchange-rates/exchange-rates.component';
import { ExchangeRatesDirective } from './header/exchange-rates/exchange-rates.directive';
import { HiddenDirective } from './header/exchange-rates/hidden.directive';
import { RouterModule } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from './header/cart/cart.component';
import { CartProductComponent } from './header/cart/cart-product/cart-product.component';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ExchangeRatesComponent,
    ExchangeRatesDirective,
    HiddenDirective,
    BackofficeComponent,
    CartComponent,
    CartProductComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: BackofficeComponent,
      children: [{
        path: '',
        loadChildren: () => import('./content/products/products.module').then(mod => mod.ProductsModule)
      }]
    }])
  ]
})
export class BackofficeModule {
}
