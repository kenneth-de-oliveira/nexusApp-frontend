import { Component, OnInit } from '@angular/core';
import { ClienteMinimoDTO } from 'src/app/core/dtos/cliente-minimo.dto';
import { EnderecoDTO } from 'src/app/core/dtos/endereco.dto';

import { AuthService } from 'src/app/core/services/auth.service';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ContaService } from 'src/app/core/services/conta.service';
import { EnderecoService } from 'src/app/core/services/endereco.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

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
  clienteDTO: ClienteMinimoDTO;
  novoTelefone: string;
  novoEmail: string;
  idCliente: number;
  enderecoDTO: EnderecoDTO;
  novoLogradouro: string;
  novoBairro: string;
  novoNumero: string;
  novoCidade: string;
  novoCep: string;
  novoUf: string;

  constructor(
    private contaService: ContaService,
    private authService: AuthService,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
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
          this.novoNumero = response.body.enderecoDTO.numero;
          this.logradouro = response.body.enderecoDTO.logradouro;
          this.novoLogradouro = response.body.enderecoDTO.logradouro;
          this.bairro = response.body.enderecoDTO.bairro;
          this.novoBairro = response.body.enderecoDTO.bairro;
          this.cidade = response.body.enderecoDTO.cidade;
          this.novoCidade = response.body.enderecoDTO.cidade;
          this.cep = response.body.enderecoDTO.cep;
          this.novoCep = response.body.enderecoDTO.cep;
          this.uf = response.body.enderecoDTO.uf;
          this.novoUf = response.body.enderecoDTO.uf;
          this.nome = response.body.clienteDTO.nome;
          this.sobrenome = response.body.clienteDTO.sobrenome;
          this.documento = response.body.clienteDTO.documento;
          this.email = response.body.clienteDTO.email;
          this.novoEmail = response.body.clienteDTO.email;
          this.telefone = response.body.clienteDTO.telefone;
          this.novoTelefone = response.body.clienteDTO.telefone;
          this.idCliente = response.body.clienteDTO.id;
        }
      }
    );
  }

  updateInformacoesContato(): any {

    this.clienteDTO = new ClienteMinimoDTO(this.novoEmail, this.novoTelefone);

    if (this.novoEmail != undefined && !this.novoTelefone != undefined) {
      this.clienteService.updateContato(this.idCliente, this.clienteDTO).subscribe(
        () => {
          SweetalertCustom.showAlertTimer('Informações de contato atualizadas com sucesso!', { type: 'success' }).then(
            result => {
              if (result.dismiss) {
                this.getAgenciaNumero();
                this.limparFormulario();
              }
            }
          );
        }, error => {
          SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' }).then(
            result => {
              if (result.dismiss) {
                this.getAgenciaNumero();
                this.limparFormulario();
              }
            }
          );
        }
      );
    }
  }

  updateInformacoesEndereco(): any {

    this.enderecoDTO = new EnderecoDTO(this.novoLogradouro, this.novoBairro, this.novoNumero,
      this.novoCidade, this.novoCep, this.novoUf);

    if (this.novoLogradouro != undefined && this.novoBairro != undefined && this.novoNumero != undefined &&
      this.novoCidade != undefined && this.novoCep != undefined && this.novoUf != undefined) {

      this.enderecoService.updateEndereco(this.idCliente, this.enderecoDTO).subscribe(
        () => {
          SweetalertCustom.showAlertTimer('Informações de endereço atualizadas com sucesso!', { type: 'success' }).then(
            result => {
              if (result.dismiss) {
                this.getAgenciaNumero();
                this.limparFormulario();
              }
            }
          );
        }, error => {
          SweetalertCustom.showAlertTimer(`${error.message}`, { type: 'error' }).then(
            result => {
              if (result.dismiss) {
                this.getAgenciaNumero();
                this.limparFormulario();
              }
            }
          );
        }
      );
    }
  }

  limparFormulario(): void {
    this.username = "";
    this.password = "";
    this.nome = "";
    this.logradouro = "";
    this.bairro = "";
    this.numero = "";
    this.cidade = "";
    this.cep = "";
    this.uf = "";
    this.sobrenome = "";
    this.documento = "";
    this.email = "";
    this.telefone = "";
    this.clienteDTO = null;
    this.novoTelefone = "";
    this.novoEmail = "";
    this.idCliente = null;
    this.enderecoDTO = null
    this.novoLogradouro = "";
    this.novoBairro = "";
    this.novoNumero = "";
    this.novoCidade = "";
    this.novoCep = "";
    this.novoUf = "";
  }


}
