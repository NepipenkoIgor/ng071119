import { Component } from '@angular/core';
import { MatCheckboxChange, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent {
  public titleText = 'ng071119';
  public drawer: MatSidenav;

  public setSidenav(drawer: MatSidenav): void {
    this.drawer = drawer;
  }
}
