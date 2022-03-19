import { AfterViewInit, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { GenericValidatorForm } from 'src/app/shared/utils/generic-validator-form';

export class FormBase implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private genericValidator: GenericValidatorForm;
  public displayMessage: { [key: string]: string } = {};

  public form: FormGroup;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.controlsBlurValidate();
  }

  /**
   * Função que realiza a validação por Blur
   */
  controlsBlurValidate() {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.form);
    });
  }

  /**
   * Mensagens utilizadas na validação
   */
  createValidateFieldMessage(validationMessages: { [key: string]: { [key: string]: string } }) {
    this.genericValidator = new GenericValidatorForm(validationMessages);
  }

}
