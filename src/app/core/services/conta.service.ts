import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContaDTO } from "../dtos/conta.dto";
import { TransferenciaDTO } from "../dtos/transferencia.dto";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class ContaService {

    private controller = 'contas';

    constructor(private apiService: ApiService) {}

    cadastrar(conta: ContaDTO): Observable<any> {
      return this.apiService.post(`publico/${this.controller}`, conta);
    }

    depositar(conta: ContaDTO): Observable<any> {
        return this.apiService.post(`${this.controller}/depositar`, conta);
    }

    sacar(conta: ContaDTO): Observable<any> {
        return this.apiService.post(`${this.controller}/sacar`, conta);
    }

    transferir(transferencia: TransferenciaDTO): Observable<any> {
        return this.apiService.post(`${this.controller}/transferir`, transferencia);
    }

    getSaldo(agencia: string, numero: string): Observable<any> {
        return this.apiService.get(`${this.controller}/consultar-saldo/${agencia}/${numero}`);
    }

    getContas(cpf: string): Observable<any> {
        return this.apiService.get(`${this.controller}/buscar-por-cpf/${cpf}`);
    }

    getNomeUsuario( nome: string ): Observable<any> {
      return this.apiService.get(`${this.controller}/buscar-por-usuario/${nome}`);
    }

    getExtratoIdConta(id: number): Observable<any> {
      return this.apiService.get(`${this.controller}/extratos?idConta=${id}`);
    }

}
