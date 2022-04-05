import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { BoletoStatusDTO } from 'src/app/core/dtos/boleto-status.dto';
import { BoletoDTO } from 'src/app/core/dtos/boleto.dto';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss']
})
export class BoletoComponent extends FormBase implements OnInit {

  boletos = new Array<BoletoDTO>();
  codigoDeBarras: string;
  pesquisaBoleto: boolean = false;
  valorBoleto: number;
  idBoleto: number;
  conta: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private contaService: ContaService,
    public router: Router
  ) {
    super()
  }

  ngOnInit() {
    this.getAgenciaNumero();
    this.createFormGroup();
    this.validateMessageError();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      codigoDeBarras: ['', [Validators.required, ValidatorsCustom.validateCodigoDeBarras]],
    });
  }

  validateMessageError() {
    this.createValidateFieldMessage({
      codigoDeBarras: {
        required: 'O código de barras é obrigatório.',
        validateCodigoDeBarras: 'Código de barras inválido.'
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const codigoDeBarras = this.form.get('codigoDeBarras').value;
      this.contaService.getCodigoDeBarras(codigoDeBarras).subscribe(
        response => {
          response.body = new Array(response.body);
          this.boletos = response.body.map(item => {
            const boleto = new BoletoDTO({
              codigo: item.codigo,
              valor: item.valor,
              id: item.id,
              cedente: item.cedente,
              emissor: item.emissor,
              status: item.status,
              dataVencimento: item.dataVencimento
            })
            this.valorBoleto = boleto.valor;
            this.idBoleto = boleto.id;
            return boleto;
          });
          this.pesquisaBoleto = true;
        }, error => {
          SweetalertCustom.showAlertConfirm(`${error.message}`, { type: 'error' }).then(
            result => {
              if (result.dismiss) {
                this.router.navigate(['conta/boleto']);
              }
            }
          );
        }
      );
    }
  }

  pagarBoleto() {
    if (this.valorBoleto && this.idBoleto) {
      if (this.conta.saldo > 0 && this.conta.saldo >= this.valorBoleto) {
        const conta = new ContaDTO(this.conta);
        conta.valor = this.valorBoleto
        this.contaService.sacar(conta).subscribe(
          () => {
            SweetalertCustom.showAlertTimer('Operação realizada com sucesso!', { type: 'success' }).then(
              result => {
                if (result.dismiss) {
                  const novoStatus = new BoletoStatusDTO(this.idBoleto, 'PAGO')
                  this.contaService.updateBoletoStatus(novoStatus).subscribe(res => res);
                  this.router.navigate(['conta/operacoes']);
                }
              }
            );
          }, error => {
            SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' }).then(
              result => {
                if (result.dismiss) {
                  this.router.navigate(['conta/boleto']);
                }
              }
            );
          }
        );
      } else {
        SweetalertCustom.showAlertTimer(`Não foi possível efetuar o pagamento.\nSaldo insuficiente.`, { type: 'error' }).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['conta/boleto']);
            }
          }
        );
      }
    }
  }

  getAgenciaNumero(): any {
    const nomeUsuario = this.authService.getUsuarioAutenticado();
    this.contaService.getNomeUsuario(nomeUsuario).subscribe(
      response => {
        if (response) {
          this.conta = response.body;
        }
      }
    );
  }
}
