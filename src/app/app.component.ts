import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public titleText = 'ng071119';
  public drawer: MatSidenav;

  public setSidenav(drawer: MatSidenav): void {
    this.drawer = drawer;
  }
}

