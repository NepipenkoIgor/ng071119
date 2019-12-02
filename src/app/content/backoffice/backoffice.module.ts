import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExchangeRatesComponent } from './header/exchange-rates/exchange-rates.component';
import { ExchangeRatesDirective } from './header/exchange-rates/exchange-rates.directive';
import { HiddenDirective } from './header/exchange-rates/hidden.directive';
import { RouterModule } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ExchangeRatesComponent,
    ExchangeRatesDirective,
    HiddenDirective,
    BackofficeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: BackofficeComponent,
      children: [{
        path: '',
        loadChildren: './products/products.module#ProductsModule'
      }]
    }])
  ]
})
export class BackofficeModule {
}
