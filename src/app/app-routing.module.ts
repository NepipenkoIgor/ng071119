import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PreloadService } from './preload.service';
import { AuthGuardService } from './auth-guard.service';
import { Routes } from './config';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'backoffice'
  },
  {
    path: Routes.LOGIN,
    loadChildren: () => import('./content/login/login.module').then(mod => mod.LoginModule),
    canActivate: [AuthGuardService]
  },
  {
    path: Routes.SIGNUP,
    loadChildren: () => import('./content/signup/signup.module').then(mod => mod.SignupModule),
    canActivate: [AuthGuardService]
  },
  {
    path: Routes.BACOFFICE,
    loadChildren: () => import('./content/backoffice/backoffice.module').then(mod => mod.BackofficeModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'backoffice'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadService})
  ],
  providers: [
    PreloadService,
    AuthGuardService
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
