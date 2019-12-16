import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IProduct } from '../../../../../store/reducers/products.reducer';


export class OneProductResolveService implements Resolve<IProduct | null> {

  public constructor(
    @Inject(Router) private router: Router,
    @Inject(HttpClient) private http: HttpClient,
    @Inject(ActivatedRoute) private ar: ActivatedRoute,
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct | null> {
    return this.http.get<IProduct>(`/products/${route.paramMap.get('id')}`)
      .pipe(
        map((product: IProduct | null) => {
          if (!product) {
            this.router.navigate(['/backoffice']);
          }
          return product;
        }),
        catchError(() => {
          this.router.navigate(['/backoffice']);
          return of(null);
        })
      );
  }
}
