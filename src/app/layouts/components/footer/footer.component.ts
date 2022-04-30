import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  usuarioLogado: String = null;

  constructor(
    private authService: AuthService,
    private contaService: ContaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNomeUsuario();
  }

  getNomeUsuario() {
    const nomeUsuario = this.authService.getUsuarioAutenticado();
    this.contaService.getNomeUsuario(nomeUsuario).subscribe(
      response => {
        if (response) {
          this.usuarioLogado = response.body.clienteDTO.nome + " " +
            response.body.clienteDTO.sobrenome;
        }
      }
    );
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login'])
  }
}
