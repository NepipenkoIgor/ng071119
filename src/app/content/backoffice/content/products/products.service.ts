import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../../../mock/products';
import { Inject, Optional } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../../config';

export class ProductsService {

  constructor(
   @Inject(HttpClient) private http: HttpClient,
    @Inject(BASE_URL_TOKEN) private baseUrl: string
  ) {
    console.log(baseUrl);
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/products`);
  }
}

// {data: null, error: {}, code: 401}
// {data: [], error: null, code: 200}
