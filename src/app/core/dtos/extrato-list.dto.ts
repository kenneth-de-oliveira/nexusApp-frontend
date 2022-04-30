export class ExtratoListDTO {

  agencia?: string;
  numero?: string;
  valor?: number;
  operacao?: string;
  dataExtrato?: string;

  constructor(obj?) {
    if (obj) {
      this.agencia = obj.agencia;
      this.numero = obj.numero;
      this.valor = obj.valor;
      this.operacao = obj.operacao;
      this.dataExtrato = obj.dataExtrato;
    }
  }
}
