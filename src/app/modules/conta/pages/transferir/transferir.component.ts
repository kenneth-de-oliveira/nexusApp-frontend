import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { TransferenciaDTO } from 'src/app/core/dtos/transferencia.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent extends FormBase implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.validateMensageError();
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.form = this.formBuilder.group({
      agencia: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      agenciaDestino: ['', [Validators.required]],
      numeroDestino: ['', [Validators.required]],
      valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]],
    }, {
      validator: [ValidatorsCustom.camposIguais('numero', 'numeroDestino')]
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência de origem obrigatória.'
      },
      numero: {
        required: 'Conta de origem obrigatória.',
        camposIguais: 'Conta de origem não pode ser igual a conta de destino.'
      },
      agenciaDestino: {
        required: 'Agência de destino obrigatória.'
      },
      numeroDestino: {
        required: 'Conta de destino obrigatória.',
        camposIguais: 'Conta de origem não pode ser igual a conta de destino.'
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let transferencia = new TransferenciaDTO(this.form.value);
      this.contaService.transferir(transferencia).subscribe(
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
                this.router.navigate(['conta/transferir']);
              }
            }
          );
        }
      );
    }
  }

}
