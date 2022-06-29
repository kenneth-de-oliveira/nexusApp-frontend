import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { TransferenciaDTO } from 'src/app/core/dtos/transferencia.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.scss']
})
export class TransferirComponent extends FormBase implements OnInit {

  agencia: string;
  numero: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private contaService: ContaService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAgenciaNumero();
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
    const conta = this.form.value;
    conta.agencia = this.agencia;
    conta.numero = this.numero;
    let transferencia = new TransferenciaDTO(conta);
    if (conta.valor > 0) {
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
          const msg = `${error.message ? error.message : 'Não foi possível transferir o valor '}`;
          SweetalertCustom.showAlertTimer(msg, { type: 'error' }).then(
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

  getAgenciaNumero(): any {
    const nomeUsuario = this.authService.getUsuarioAutenticado();
    this.contaService.getNomeUsuario(nomeUsuario).subscribe(
      response => {
        if (response) {
          this.agencia = response.body.agencia;
          this.numero = response.body.numero;
        }
      }
    );
  }

}
