import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange, MatSidenav } from '@angular/material';
import { IProduct, products$ } from '../mock/products';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public titleText = 'ng071119';
  public drawer: MatSidenav;
  public searchTerm: string;
  public onlyFavorites: boolean;
  public products$: Observable<IProduct[]> = this.productsService.getProducts();

  public constructor(
    private productsService: ProductsService
  ) {
  }


  public ngOnInit(): void {
  }

  public setSidenav(drawer: MatSidenav): void {
    this.drawer = drawer;
  }

  public search(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  public toggleOnlyFavorites(e: MatCheckboxChange): void {
    this.onlyFavorites = e.checked;
  }

  public trackByFn(index: number, product: IProduct): string {
    return product._id;
  }
}

