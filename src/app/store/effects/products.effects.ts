import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';
import { getProductsPending, getProductsSuccess } from '../actions/product.actions';
import { IProduct } from '../reducers/products.reducer';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsEffects {
  getProducts = createEffect(() => this.actions$.pipe(
    ofType(getProductsPending),
    switchMap(() => this.http.get<IProduct[]>(`/products`)
      .pipe(
        mergeMap((products: IProduct[]) => {
          return [
            getProductsSuccess({products})];
        }),
      ))
    )
  );


  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
  }
}
