import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtratoListDTO } from 'src/app/core/dtos/extrato-list.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';


@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.scss']
})
export class OperacoesComponent implements OnInit {

  listaExtrato = new Array<ExtratoListDTO>();

  extratoPdf: boolean = false;

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

  extratoPdfConta() {
    const nomeUsuario = this.authService.getUsuarioAutenticado();
    this.contaService.getNomeUsuario(nomeUsuario).subscribe(
      res => {
        if (res) {
          this.extratoPdf = true;
          this.contaService.getExtratoPdfConta(res.body.id).subscribe(res => {
            if (res) {
              this.emitirPdf(res, 'RELATORIO_EXTRATO_CONTA.pdf')
            }
          });
        }
      });
  }

  emitirPdf(res: any, nomeArquivo) {

    const arquivo = res.body;

    const blob = window.URL.createObjectURL(arquivo);

    const link = document.createElement('a');
    link.href = blob;
    link.download = nomeArquivo;

    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 3600 * 5);

    this.extratoPdf = false;
  }

}
