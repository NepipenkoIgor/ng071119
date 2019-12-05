import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap.get('id'));
    });
    this.activateRoute.queryParams.subscribe((query: Params) => {
      console.log(query);
    });
    this.activateRoute.fragment.subscribe((fragment: string) => {
      console.log(fragment);
    });
    this.activateRoute.data.subscribe((data: Data) => {
      console.log(data);
    });
    console.log(this.activateRoute.snapshot);
  }

}
