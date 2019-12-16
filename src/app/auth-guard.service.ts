import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Routes } from './config';
import { IStore } from './store';
import { go } from './store/actions/router.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private store: Store<IStore>
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url = state.url;
    return this.store.select('auth')
      .pipe(
        filter(({loading}) => !loading),
        switchMap(({isLogged}) => {
          if (!isLogged && (url === `/${Routes.LOGIN}` || url === `/${Routes.SIGNUP}`)) {
            return of(true);
          }
          if (isLogged && (url === `/${Routes.LOGIN}` || url === `/${Routes.SIGNUP}`)) {
            this.store.dispatch(go({payload: {path: [`/${Routes.BACOFFICE}`]}}));
            return of(false);
          }
          if (!isLogged) {
            this.store.dispatch(go({payload: {path: [`/${Routes.LOGIN}`]}}));
          }
          return of(isLogged);
        })
      );
  }

}
