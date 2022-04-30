import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/app/core/dtos/cliente.dto';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { EnderecoDTO } from 'src/app/core/dtos/endereco.dto';
import { UsuarioDTO } from 'src/app/core/dtos/usuario.dto';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  nome: string;
  logradouro: string;
  bairro: string;
  numero: string;
  cidade: string;
  cep: string;
  uf: string;
  sobrenome: string;
  documento: string;
  email: string;
  telefone: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private contaService: ContaService
  ) {
  }

  onSubmit() {
    this.authService
      .tentarLogar(this.username, this.password)
      .subscribe(response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token)
        this.router.navigate(['/home'])
      }, () => {
        SweetalertCustom.showAlertTimer('Usuário e/ou senha incorreto(s).', { type: 'error' }).then(
          result => {
            if (result.dismiss) {
              this.router.navigate(['login']);
            }
          }
        );
      })
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.limparDados();
  }

  cadastrar() {
    this.contaService.cadastrar(this.getCliente()).subscribe(() => {
      this.mensagemSucesso = "Cadastro realizado com sucesso!";
      this.limparDados();
      SweetalertCustom.showAlertTimer(`Cadastro realizado com sucesso`, { type: 'success' });
    }, error => {
      this.mensagemSucesso = null;
      SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' });
    });
  }

  getCliente() {
    const conta: ContaDTO = new ContaDTO()
    conta.clienteDTO = new ClienteDTO(this.nome,
      this.sobrenome, this.documento, this.email, this.telefone,
      new EnderecoDTO(this.logradouro, this.bairro, this.numero, this.cidade,
        this.cep, this.uf), new UsuarioDTO(this.username, this.password)
    );
    return conta
  }

  limparDados() {
    this.cadastrando = false;
    this.username = "";
    this.password = "";
    this.username = ""
    this.password = ""
    this.nome = ""
    this.logradouro = ""
    this.bairro = ""
    this.numero = ""
    this.cidade = ""
    this.cep = ""
    this.uf = ""
    this.sobrenome = ""
    this.documento = ""
    this.email = ""
    this.telefone = ""
    this.cadastrando = false
    this.mensagemSucesso = null
    this.errors = []
  }

}
