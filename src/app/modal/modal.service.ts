import { Observable, Subject } from 'rxjs';
import { ComponentFactoryResolver } from '@angular/core';

export interface IModalContent {
  component: any;
  context: any;
  cfr: ComponentFactoryResolver;
}

export class ModalService {

  private modalControlSequence$$ = new Subject();
  public context;

  public open(componentObj: IModalContent) {
    this.context = componentObj.context;
    this.modalControlSequence$$.next(componentObj);
  }

  public close() {
    this.modalControlSequence$$.next({});
  }

  public get modalSequence$$(): Observable<any> {
    return this.modalControlSequence$$.asObservable();
  }
}
