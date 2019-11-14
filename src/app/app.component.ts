import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { IProduct, products$ } from '../mock/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public titleText = 'ng071119';
  public drawer: MatSidenav;
  public products$: Observable<IProduct[]> = products$;

  public ngOnInit(): void {
  }

  public setSidenav(drawer: MatSidenav): void {
    this.drawer = drawer;
  }
}

