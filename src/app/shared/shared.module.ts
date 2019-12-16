import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NameValidatorDirective } from './directives/name-validator.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './services/auth.service';
import { BASE_URL, BASE_URL_TOKEN } from '../config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';


@NgModule({
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NameValidatorDirective,
    FlexLayoutModule,
    MatBadgeModule
  ],
  declarations: [NameValidatorDirective],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {provide: BASE_URL_TOKEN, useValue: BASE_URL},
        AuthService
      ]
    };
  }
}
