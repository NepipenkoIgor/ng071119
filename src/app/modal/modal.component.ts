import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { IModalContent, ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('modalContent', {read: ViewContainerRef, static: false})
  public modal: ViewContainerRef;

  public isOpen = false;
  public component: Type<any>;
  public componentFactory: ComponentFactory<any>;
  public componentRef: ComponentRef<any>;

  constructor(
    private modalService: ModalService,
    private cfr: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    this.modalService.modalSequence$$
      .subscribe(({component, context, cfr}: IModalContent) => {
        if (!component) {
          this.close();
          return;
        }
        this.isOpen = true;
        this.component  = component;
        this.componentFactory = cfr.resolveComponentFactory(component);
        this.componentRef = this.modal.createComponent(this.componentFactory);
        Object.keys(context).forEach((key: string) => {
          this.componentRef.instance[key] = context[key];
        });
      });
  }

  public close(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.isOpen = false;
  }

}
