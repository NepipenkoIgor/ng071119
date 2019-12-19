import { ProductsFilterPipe } from './products-filter.pipe';
import { products } from '../../../../mock';


describe('FILTER PIPE', () => {

  let productsFilter: ProductsFilterPipe;

  beforeEach(() => {
    productsFilter = new ProductsFilterPipe();
  });

  it('Sould filter with empty search param', () => {
    expect(productsFilter.transform(products, '')).toEqual(products);
  });

  it('Sould filter by search param', () => {
    expect(productsFilter.transform(products, '111')).toEqual([products[0]]);
  });
});
