import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { Routes } from './config';


export class AuthGuardService implements CanActivate {

  constructor(
    @Inject(Router) private router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url = state.url;
    return of(false)
      .pipe(
        switchMap((isLoggin: boolean) => {
          if (!isLoggin && (url === `/${Routes.LOGIN}` || url === `/${Routes.SIGNUP}`)) {
            return of(true);
          }
          if (isLoggin && (url === `/${Routes.LOGIN}` || url === `/${Routes.SIGNUP}`)) {
            this.router.navigate([`/${Routes.BACOFFICE}` ]);
            return of(false);
          }
          if (!isLoggin) {
            this.router.navigate([`/${Routes.LOGIN}` ]);
          }
          return of(isLoggin);
        })
      );
  }

}
