import {
  Component,
  EventEmitter,
  OnInit, Optional,
  Output, Self,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  // viewProviders: [ProductsService] TODO: why?
})
export class SidebarComponent implements OnInit {

  @Output()
  public setSideNavControl: EventEmitter<MatSidenav> = new EventEmitter<MatSidenav>(true);

  @ViewChild('drawer', {static: true})
  public drawer: MatSidenav;

  constructor() {

  }

  ngOnInit() {
    // this.productsService.getProducts();
    this.setSideNavControl.emit(this.drawer);
  }

}
