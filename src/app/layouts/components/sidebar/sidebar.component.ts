import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterContentChecked {

  deletando: boolean = false;
  usuarioLogado: string = null;
  password: string;
  idConta: number;

  constructor(
    private authService: AuthService,
    private contaService: ContaService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getNomeUsuario();
    $(document).ready(() => {
      $('[data-widget="treeview"]').Treeview('init');
    });
  }

  ngAfterContentChecked() {
    this.activeSideBar();
  }

  activeSideBar() {
    const baseUrl = window.location.origin;
    const url = window.location.href.replace(baseUrl, '');
    $('ul.nav-sidebar a').filter(function() {
      return this.href.replace(baseUrl, '') !== url;
    }).removeClass('active');

    // for treeview
    $('ul.nav-treeview a').filter(function() {
      return this.href.replace(baseUrl, '') !== url;
    }).parentsUntil('.nav-sidebar > .nav-treeview')
      .removeClass('menu-open')
      .prev('a')
      .removeClass('active');

    $('ul.nav-sidebar a').filter(function() {
      return this.href.replace(baseUrl, '') === url;
    }).addClass('active');

    // for treeview
    $('ul.nav-treeview a').filter(function() {
      return this.href.replace(baseUrl, '') === url;
    }).parentsUntil('.nav-sidebar > .nav-treeview')
      .addClass('menu-open')
      .prev('a')
      .addClass('active');
  }

  // getUsuarioUnidadeTipoInstituicao() {
  //   return Util.getUsuarioSession().tipoInstituicao;
  // }

  getNomeUsuario() {
    const nomeUsuario = this.authService.getUsuarioAutenticado();
    this.contaService.getNomeUsuario(nomeUsuario).subscribe(
      response => {
        if (response) {
          this.usuarioLogado = response.body.clienteDTO.nome + " " +
            response.body.clienteDTO.sobrenome;
          this.idConta = response.body.id;
        }
      }
    );
  }

  deletarConta() {
    this.authService
      .tentarLogar(this.authService.getUsuarioAutenticado(), this.password)
      .subscribe(() => {
        this.contaService.deletar(this.idConta).subscribe(() => {
          this.authService.encerrarSessao();
          this.deletando = true;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }, error => {
          SweetalertCustom.showAlertTimer(error.message, { type: 'error' }).then(
            result => {
              if (result.dismiss) {
                this.password = "";
                window.location.reload();
              }
            }
          );
        });
      }, () => {
        SweetalertCustom.showAlertTimer('Usuário e/ou senha incorreto(s).', { type: 'error' }).then(
          result => {
            if (result.dismiss) {
              this.password = "";
              window.location.reload();
            }
          }
        );
      })
  }

}
