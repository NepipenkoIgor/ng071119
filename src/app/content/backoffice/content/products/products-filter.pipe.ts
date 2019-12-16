import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../../store/reducers/products.reducer';

@Pipe({
  name: 'productsFilter',
  pure: false
})
export class ProductsFilterPipe implements PipeTransform {

  public transform(products: IProduct[], searchTerm: string, onlyFavorites: boolean = false): IProduct[] {
    let result: IProduct[] = products;
    if (onlyFavorites) {
      result = result.filter((product: IProduct) => {
        return product.isFavorite === onlyFavorites;
      });
    }
    if (!searchTerm) {
      return result;
    }
    return result.filter((product: IProduct) => {
      return `${product.title} ${product.price}`.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }


}

// click -> ngZone -> app.tick()
