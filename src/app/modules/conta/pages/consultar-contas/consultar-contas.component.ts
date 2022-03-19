import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaListDTO } from 'src/app/core/dtos/conta-list.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-consultar-contas',
  templateUrl: './consultar-contas.component.html',
  styleUrls: ['./consultar-contas.component.scss']
})
export class ConsultarContasComponent extends FormBase implements OnInit {

  listaContas = new Array<ContaListDTO>();

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
      cpf: ['', [Validators.required, ValidatorsCustom.validateCpf]],
    });
  }

  validateMessageError() {
    this.createValidateFieldMessage({
      cpf: {
        required: 'CPF é obrigatório.',
        validateCpf: 'CPF inválido.'
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const cpf = this.form.get('cpf').value;
      this.contaService.getContas(cpf).subscribe(
        response => {
          response.body = new Array(response.body);
          this.listaContas = response.body.map(item => {
            return new ContaListDTO({
              agencia: item.agencia,
              numero: item.numero,
              cpf: item.clienteDTO.documento,
              cliente: item.clienteDTO.nome + " " + item.clienteDTO.sobrenome,
              email: item.clienteDTO.email
            })
          });
        }, error => {
          SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' }).then(
            result => {
              if (result.dismiss) {
                this.router.navigate(['conta/consultar-contas']);
              }
            }
          );
        }
      );
    }
  }
}
