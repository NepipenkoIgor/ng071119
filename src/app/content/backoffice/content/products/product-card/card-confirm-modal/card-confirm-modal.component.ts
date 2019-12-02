import { Component } from '@angular/core';
import { ModalService } from '../../../../../../modal/modal.service';

@Component({
  selector: 'app-card-confirm-modal',
  templateUrl: './card-confirm-modal.component.html',
  styleUrls: ['./card-confirm-modal.component.css']
})
export class CardConfirmModalComponent {


  constructor(
    private modalService: ModalService
  ){
    Object.keys(this.modalService.context).forEach((key: string) => {
      this[key] = this.modalService.context[key];
    });
  }

}
