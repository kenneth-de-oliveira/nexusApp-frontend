import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { ContaService } from 'src/app/core/services/conta.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

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

  constructor(
    private contaService: ContaService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getAgenciaNumero();
  }

  getAgenciaNumero(): any {
    const nomeUsuario = this.authService.getUsuarioAutenticado();
    this.contaService.getNomeUsuario(nomeUsuario).subscribe(
      response => {
        if (response) {
          this.numero = response.body.enderecoDTO.numero;
          this.logradouro = response.body.enderecoDTO.logradouro;
          this.bairro = response.body.enderecoDTO.bairro;
          this.cidade = response.body.enderecoDTO.cidade;
          this.cep = response.body.enderecoDTO.cep;
          this.uf = response.body.enderecoDTO.uf;
          this.nome = response.body.clienteDTO.nome;
          this.sobrenome = response.body.clienteDTO.sobrenome;
          this.documento = response.body.clienteDTO.documento;
          this.email = response.body.clienteDTO.email;
          this.telefone = response.body.clienteDTO.telefone;
        }
      }
    );
  }

}
