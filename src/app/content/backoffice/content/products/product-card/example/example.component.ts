import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../../../../modal/modal.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    @Inject('FlowerService') private flowerService: any
  ) {
  }

  ngOnInit() {
    console.log(this.flowerService)
    // this.productsService.getProducts('ProductCardComponent');
  }
}
