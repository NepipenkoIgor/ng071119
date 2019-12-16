import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  checkJWT,
  loginError,
  loginPending,
  loginSuccess, logoutPending,
  logoutSuccess,
  signupError,
  signupPending,
  signupSuccess
} from '../actions/auth.actions';
import { AuthService } from '../../shared/services/auth.service';
import { of } from 'rxjs';
import { IUserState } from '../reducers/user.reducer';
import { setUser } from '../actions/user.actions';
import { go } from '../actions/router.actions';

@Injectable()
export class AuthEffects {
  login = createEffect(() => this.actions$.pipe(
    ofType(loginPending),
    switchMap((action) => this.authService.login(action.user)
      .pipe(
        switchMap((user: IUserState) => this.authService.tokenToLocalStorage(user)),
        tap((value) => {
          console.log(value);
        }),
        mergeMap((user: IUserState) => {
          return [
            loginSuccess(),
            setUser({user}),
            go({payload: {path: ['/backoffice']}})];
        }),
        catchError((err) => {
          console.log(err);
          return of(loginError());
        })
      ))
    )
  );

  signup = createEffect(() => this.actions$.pipe(
    ofType(signupPending),
    switchMap((action) => this.authService.signup(action.user)
      .pipe(
        switchMap((user: IUserState) => this.authService.tokenToLocalStorage(user)),
        mergeMap((user: IUserState) => {
          return [
            signupSuccess(),
            setUser({user}),
            go({payload: {path: ['/backoffice']}})
          ];
        }),
        catchError(() => {
          return of(signupError());
        })
      ))
    )
  );
  public logout = createEffect(() => this.actions$
    .pipe(
      ofType(logoutPending),
      switchMap(() => {
        return this.authService.removeTokenFromLocalStorage()
          .pipe(
            mergeMap(() => {
              return [
                logoutSuccess(),
                go({payload: {path: ['/login']}})
              ];
            }));
      })
    ));

  public checkUser = createEffect(() => this.actions$
    .pipe(
      ofType(checkJWT),
      switchMap(() => {
        return this.authService.checkJWT()
          .pipe(
            mergeMap((user: IUserState) => {
              return [
                loginSuccess(),
                setUser({user}),
              ];
            }),
            catchError((err) => {
              return of(loginError());
            })
          );
      })
    ));

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }
}
