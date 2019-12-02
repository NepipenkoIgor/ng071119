import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange, MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { IProduct } from '../../../../../mock/products';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public searchTerm: string;
  public onlyFavorites: boolean;
  public products$: Observable<IProduct[]> = this.productsService.getProducts();

  public constructor(
    private productsService: ProductsService
  ) {
  }

  public trackByFn(index: number, product: IProduct): string {
    return product._id;
  }

  public search(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  public toggleOnlyFavorites(e: MatCheckboxChange): void {
    this.onlyFavorites = e.checked;
  }
}
