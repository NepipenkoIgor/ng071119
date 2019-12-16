import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from './modal/modal.module';
import { AppRoutingModule } from './app-routing.module';
import { Store, StoreModule } from '@ngrx/store';
import { CustomSerializer, IStore, metaReducers, reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { checkJWT } from './store/actions/auth.actions';

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
    SharedModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [Store],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function initApp(store: Store<IStore>): () => void {
  return () => {
    store.dispatch(checkJWT());
  };
}


// TODO - что с серверо ?
