import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-consultar-saldo',
  templateUrl: './consultar-saldo.component.html',
  styleUrls: ['./consultar-saldo.component.scss']
})
export class ConsultarSaldoComponent extends FormBase implements OnInit {

  conta: ContaDTO;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) {
    super()
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMessageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia: ['', [Validators.required]],
      numero: ['', [Validators.required]]
    });
  }

  validateMessageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.'
      },
      numero: {
        required: 'Número da conta obrigatório.'
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const agencia = this.form.get('agencia').value;
      const numero = this.form.get('numero').value;
      this.contaService.getSaldo(agencia, numero).subscribe(
        response => {
          this.conta = new ContaDTO({
            agencia: agencia,
            numero: numero,
            valor: response.body.saldo
          });
        }, error => SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' }).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['conta/consultar-saldo']);
            }
          }
        )
      )
    }
  }

}
