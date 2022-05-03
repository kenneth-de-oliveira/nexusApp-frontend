import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContaService } from 'src/app/core/services/conta.service';
import { ExtratoListDTO } from 'src/app/core/dtos/extrato-list.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';

@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.scss']
})
export class OperacoesComponent implements OnInit {

  listaExtrato = new Array<ExtratoListDTO>();

  constructor(
    private contaService: ContaService,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    const nomeUsuario = this.authService.getUsuarioAutenticado();
    this.contaService.getNomeUsuario(nomeUsuario).subscribe(
      response => {
        if (response) {
          this.contaService.getExtratoIdConta(response.body.id).subscribe(
            response => {
              response.body = ordenarPorData(response);
              this.listaExtrato = response.body.map(item => {
                return new ExtratoListDTO({
                  agencia: item.agencia,
                  numero: item.numero,
                  valor: item.valor,
                  operacao: item.operacao,
                  dataExtrato: item.dataExtrato
                })
              });
              function ordenarPorData(response) {
                return response.body.sort((a, b) => (a.dataExtrato > b.dataExtrato) ? -1 : 1);
              }
            }
          );
        }
      }
    );
  }

}
