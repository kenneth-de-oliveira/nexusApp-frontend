import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class ModalCustom {
  constructor(
    public activeModal: NgbActiveModal
  ) {}

  closeModal() {
    this.activeModal.close();
  }
}
