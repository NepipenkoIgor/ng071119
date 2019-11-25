import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsFilterPipe } from './products-filter.pipe';
import { ProductCardComponent } from './product-card/product-card.component';
import { ExchangeRatesComponent } from './header/exchange-rates/exchange-rates.component';
import { ExchangeRatesDirective } from './header/exchange-rates/exchange-rates.directive';
import { HiddenDirective } from './header/exchange-rates/hidden.directive';
import { ProductsService } from './products.service';
import { ViewExampleComponent } from './sidebar/view-example/view-example.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BASE_URL, BASE_URL_TOKEN } from './config';
import { InterceptorService } from './interceptor.service';
import { ModalModule } from './modal/modal.module';
import { CardConfirmModalComponent } from './product-card/card-confirm-modal/card-confirm-modal.component';

// NgModule => es6;
// declarations => let/const
// imports => import
// exports => export

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ProductsFilterPipe,
    ProductCardComponent,
    ExchangeRatesComponent,
    ExchangeRatesDirective,
    HiddenDirective,
    ViewExampleComponent,
    CardConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [
    ProductsService,
    {provide: BASE_URL_TOKEN, useValue: BASE_URL},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  entryComponents: [CardConfirmModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
