import {
  Component,
  EventEmitter,
  OnInit, Optional,
  Output, Self,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  @Output()
  public setSideNavControl: EventEmitter<MatSidenav> = new EventEmitter<MatSidenav>(true);

  @ViewChild('drawer', {static: true})
  public drawer: MatSidenav;

  constructor() {

  }

  ngOnInit() {
    this.setSideNavControl.emit(this.drawer);
  }

}
