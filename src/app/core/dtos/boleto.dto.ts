export class BoletoDTO {
  [x: string]: any;

  id?: number;
  codigo?: string;
  valor?: number;
  cedente?: string;
  emissor?: string;
  dataVencimento?: string;
  status?:string;

  constructor(obj?) {
    if (obj) {
      this.id = obj.id;
      this.codigo = obj.codigo;
      this.valor = obj.valor;
      this.cedente = obj.cedente;
      this.emissor = obj.emissor;
      this.dataVencimento = obj.dataVencimento;
      this.status = obj.status;
    }
  }
}
