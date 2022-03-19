import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-depositar-sacar',
  templateUrl: './depositar-sacar.component.html',
  styleUrls: ['./depositar-sacar.component.scss']
})
export class DepositarSacarComponent extends FormBase implements OnInit {

  nameScreen = '';

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getNameScreen();
    this.validateMensageError();
    this.createFormGroup();
  }

  private getNameScreen() {
    if (this.router.url.includes('depositar')) {
      this.nameScreen = 'Depositar';
    } else if (this.router.url.includes('sacar')) {
      this.nameScreen = 'Sacar';
    }
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia:      ['', [Validators.required]],
      numero:       ['', [Validators.required]],
      valor:        [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    });
  }

  /**
   * Seta a mensagem de validação que irá ser exibida ao usuário
   */
  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.'
      },
      numeroConta: {
        required: 'Número da conta obrigatório.'
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let conta = new ContaDTO(this.form.value);
      if (this.nameScreen === 'Depositar') {
        this.depositar(conta);
      } else if (this.nameScreen === 'Sacar') {
        this.sacar(conta);
      }
    }
  }

  private depositar(conta: ContaDTO) {
    this.contaService.depositar(conta).subscribe(
      () => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['conta/operacoes']);
            }
          }
        );
      }, error => {
        SweetalertCustom.showAlertTimer(`${error.message}`, {type: 'error'}).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['conta/depositar']);
            }
          }
        );
      }
    );
  }

  private sacar(conta: ContaDTO) {
    this.contaService.sacar(conta).subscribe(
      () => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', { type: 'success' }).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['conta/operacoes']);
            }
          }
        );
      }, error => {
        SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' }).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['conta/sacar']);
            }
          }
        );
      }
    );
  }

}
