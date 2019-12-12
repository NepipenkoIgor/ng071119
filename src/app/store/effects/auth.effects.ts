import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { loginError, loginPending, loginSuccess, signupError, signupPending, signupSuccess } from '../actions/auth.actions';
import { AuthService } from '../../shared/services/auth.service';
import { of } from 'rxjs';
import { IUserState } from '../reducers/user.reducer';
import { setUser } from '../actions/user.actions';

@Injectable()
export class AuthEffects {

  login = createEffect(() => this.actions$.pipe(
    ofType(loginPending),
    switchMap((action) => this.authService.login(action.user)
      .pipe(
        mergeMap((user: IUserState) => {
          return [loginSuccess(), setUser({user})];
        }),
        catchError(() => {
          return of(loginError());
        })
      ))
    )
  );

  signup = createEffect(() => this.actions$.pipe(
    ofType(signupPending),
    switchMap((action) => this.authService.signup(action.user)
      .pipe(
        mergeMap((user: IUserState) => {
          return [signupSuccess(), setUser({user})];
        }),
        catchError(() => {
          return of(signupError());
        })
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }
}
