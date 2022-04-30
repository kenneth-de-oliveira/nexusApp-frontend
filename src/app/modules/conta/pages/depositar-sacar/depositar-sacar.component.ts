import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-depositar-sacar',
  templateUrl: './depositar-sacar.component.html',
  styleUrls: ['./depositar-sacar.component.scss']
})
export class DepositarSacarComponent extends FormBase implements OnInit {

  boleto = '/conta/depositar';
  nameScreen = '';
  agencia: string;
  numero: string;
  depositarBtn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private contaService: ContaService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getAgenciaNumero();
    this.getNameScreen();
    this.validateMensageError();
    this.createFormGroup();
  }

  private getNameScreen() {
    if (this.router.url.includes('depositar')) {
      this.nameScreen = 'Depositar';
      this.depositarBtn = true;
    } else if (this.router.url.includes('sacar')) {
      this.nameScreen = 'Sacar';
      this.depositarBtn = false;
    }
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      agencia: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      valor: [0, [Validators.required, ValidatorsCustom.lessThanOne]],
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
    let conta = new ContaDTO(this.form.value);
    if (this.nameScreen === 'Depositar') {
      this.depositar(conta);
    } else if (this.nameScreen === 'Sacar') {
      this.sacar(conta);
    }
  }

  private depositar(conta: ContaDTO) {
    conta.agencia = this.agencia;
    conta.numero = this.numero;
    if (conta.valor > 0) {
      this.alteraValorBoleto(conta.valor, conta.agencia, conta.numero);
    } else {
      SweetalertCustom.showAlertTimer(`Não foi possível efetuar o deposito`, { type: 'error' }).then(
        result => {
          if (result.dismiss) {
            this.router.navigate(['conta/depositar']);
          }
        }
      );
    }
  }

  private sacar(conta: ContaDTO) {
    conta.agencia = this.agencia;
    conta.numero = this.numero;
    if (conta.valor > 0) {
      this.contaService.sacar(conta).subscribe(
        () => {
          SweetalertCustom.showAlertTimer('Operação realizada com sucesso!', { type: 'success' }).then(
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
    SweetalertCustom.showAlertTimer(`Não foi possível
     ${this.nameScreen.toLocaleLowerCase()} o valor`, { type: 'error' }).then(
      result => {
        if (result.dismiss) {
          this.router.navigate(['conta/sacar']);
        }
      }
    );
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

  dataAtual() {
    const agora = Date.now();
    const hoje = new Date(agora);
    return hoje.toLocaleDateString();
  }


  alteraValorBoleto(valor: number, agencia: string, numero: string) {
    this.boleto = `http://www.sicadi.com.br/mhouse/boleto/boleto3.php?
      numero_banco=341-7
      &local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO
      &cedente=Nexus+Pagamentos+LTDA
      &data_documento=23%2F03%2F2022
      &numero_documento=DF+00113
      &especie=DM
      &aceite=N
      &data_processamento=23%2F03%2F2022
      &carteira=109
      &especie_moeda=R%24
      &valor=&vencimento=${this.dataAtual()}
      &agencia=${agencia}&codigo_cedente=${numero}
      &meunumero=00010435
      &valor_documento=R$ ${valor},00
      &instrucoes=Aten%E7%E3o%2C+%0D%0Afique+atento+%E0+data+de+vencimento+do+boleto.%0D%0APague+em+qualquer+casa+lot%E9rica
      &mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO
      &Submit=Enviar`;
  }
}
