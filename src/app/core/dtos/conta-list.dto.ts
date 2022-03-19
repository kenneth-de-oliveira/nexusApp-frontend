export class ContaListDTO {
    [x: string]: any;

    agencia?: string;
    numero?: string;
    cpf?: string;
    cliente?: string;
    email?: string;

    constructor(obj?) {
        if (obj) {
            this.agencia = obj.agencia;
            this.numero = obj.numero;
            this.cpf = obj.cpf;
            this.cliente = obj.cliente;
            this.email = obj.email;
        }
    }
}
