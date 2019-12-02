import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BASE_URL, BASE_URL_TOKEN } from './config';
import { InterceptorService } from './interceptor.service';
import { ModalModule } from './modal/modal.module';
import { AppRoutingModule } from './app-routing.module';

// NgModule => es6;
// declarations => let/const
// imports => import
// exports => export

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide: BASE_URL_TOKEN, useValue: BASE_URL},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
