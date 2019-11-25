import {
  Component,
  Input, OnInit, Optional, SkipSelf,
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Input()
  public drawer: MatSidenav;

  @Input()
  public title = 'title';


  public rates: { value: number, currency: string }[] = [
    {value: 50, currency: 'USD'},
    {value: 65, currency: 'EUR'},
    {value: 3, currency: 'UAH'},
  ];

  constructor(
  ) {
  }

  public ngOnInit(): void {
  }

  public toggleSideNav() {
    this.drawer.toggle();
  }
}
