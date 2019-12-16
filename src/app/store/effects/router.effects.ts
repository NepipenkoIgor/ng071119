import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { forward, go } from '../actions/router.actions';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {

  public go = createEffect(() => this.actions$
    .pipe(
      ofType(go),
      map(({payload}) => payload),
      tap(({path, query: queryParams, extras}) => {
        this.router.navigate(path, {queryParams, ...extras});
      })
    ), {dispatch: false});

  public forward = createEffect(() => this.actions$.pipe(
    ofType(forward),
    tap(() => {
      this.location.forward();
    })
    )
  );

  public back = createEffect(() => this.actions$.pipe(
    ofType(forward),
    tap(() => {
      this.location.back();
    })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) {
  }
}
