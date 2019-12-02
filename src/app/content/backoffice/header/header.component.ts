import {
  Component,
  Input,
} from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  @Input()
  public drawer: MatSidenav;

  @Input()
  public title = 'title';


  public rates: { value: number, currency: string }[] = [
    {value: 50, currency: 'USD'},
    {value: 65, currency: 'EUR'},
    {value: 3, currency: 'UAH'},
  ];

  public toggleSideNav() {
    this.drawer.toggle();
  }
}
