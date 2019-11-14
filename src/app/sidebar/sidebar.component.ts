import { Component, ContentChild, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output()
  public setSideNavControl: EventEmitter<MatSidenav> = new EventEmitter<MatSidenav>(true);

  @ViewChild('drawer', {static: true})
  public drawer: MatSidenav;

  @ViewChild('contentContainer', {static: true, read: ViewContainerRef})
  public container: ViewContainerRef;

  @ContentChild('content1', {static: true})
  public contentTmpl1: TemplateRef<any>;
  @ContentChild('content2', {static: true})
  public contentTmpl2: TemplateRef<any>;

  ngOnInit() {
    let cont2;
    this.container.createEmbeddedView(this.contentTmpl1);
    setTimeout(() => {
      cont2 = this.container.createEmbeddedView(this.contentTmpl2, null, 0);
    }, 5000);

    setTimeout(() => {
      this.container.move(cont2, 0);
    }, 10000);
    this.setSideNavControl.emit(this.drawer);
  }

}
