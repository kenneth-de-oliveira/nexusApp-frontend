export class TransferenciaDTO {

    agencia?: string;
    numero?: string;
    agenciaDestino?: string;
    numeroDestino?: string;
    valor?: number;

    constructor(obj?: any) {
        this.agencia = obj.agencia;
        this.numero = obj.numero;
        this.agenciaDestino = obj.agenciaDestino;
        this.numeroDestino = obj.numeroDestino;
        this.valor = obj.valor;
    }

}
