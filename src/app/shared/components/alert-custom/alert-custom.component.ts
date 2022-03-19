import { Component, OnInit, Input } from '@angular/core';
import { Util } from '../../utils/util';
import { ErrorMessage } from 'src/app/core/models/error-message.model';

@Component({
  selector: 'app-alert-custom',
  templateUrl: './alert-custom.component.html',
  styleUrls: ['./alert-custom.component.scss']
})
export class AlertCustomComponent implements OnInit {

  @Input() error: ErrorMessage = new ErrorMessage();

  constructor() { }

  ngOnInit() { }

  closeAlert() {
    Util.clearErrorMessage(this.error);
  }

  typeError() {
    switch (this.error.errorType) {
      case 'danger':
        return 'alert-danger';
      case 'success':
        return 'alert-success';
      case 'info':
        return 'alert-info';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-dark';
    }
  }

}
