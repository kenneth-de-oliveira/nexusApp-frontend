export class ContaDTO {

    agencia?: string;
    numero?: string;
    valor?: number;

    constructor(obj?) {
        if (obj) {
            this.agencia = obj.agencia;
            this.numero = obj.numero;
            this.valor = obj.valor;
        }
    }
}
