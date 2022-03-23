import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-consultar-saldo',
  templateUrl: './consultar-saldo.component.html',
  styleUrls: ['./consultar-saldo.component.scss']
})
export class ConsultarSaldoComponent extends FormBase implements OnInit {

  conta: ContaDTO = null;
  agencia: string;
  numero: string;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private authService: AuthService,
    public router: Router
  ) {
    super()
  }

  ngOnInit() {
    this.createFormGroup();
    this.validateMessageError();
    this.getAgenciaNumero();
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
    this.contaService.getSaldo(this.agencia, this.numero).subscribe(
      response => {
        this.conta = new ContaDTO({
          agencia: this.agencia,
          numero: this.numero,
          valor: response.body.saldo
        });
      },
      error => SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' }).then(
        result => {
          if (result.dismiss) {
            this.router.navigate(['conta/consultar-saldo']);
          }
        }
      )
    )
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
