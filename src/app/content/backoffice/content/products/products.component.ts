import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange, MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { IStore } from '../../../../store';
import { Store } from '@ngrx/store';
import { IProduct } from '../../../../store/reducers/products.reducer';
import { getProductsPending } from '../../../../store/actions/product.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public searchTerm: string;
  public onlyFavorites: boolean;
  //@ts-ignore
  public products$: Observable<IProduct[]> = this.store.select<IProduct[]>('products');

  public constructor(
    private store: Store<IStore>
  ) {
  }

  public ngOnInit(): void {
    this.store.dispatch(getProductsPending());
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
