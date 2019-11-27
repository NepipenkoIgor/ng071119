import { Component, OnInit, Optional } from '@angular/core';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-view-example',
  templateUrl: './view-example.component.html',
  styleUrls: ['./view-example.component.css']
})
export class ViewExampleComponent implements OnInit {

  constructor(
    // @Optional() private productsService: ProductsService
  ) {
  }

  ngOnInit() {
    // this.productsService.getProducts('ViewExampleComponent');
  }

}
