import { ClienteDTO } from "./cliente.dto";

export class ContaDTO {
  id?: number;
  agencia?: string;
  numero?: string;
  valor?: number;
  clienteDTO? : ClienteDTO;

  constructor(obj?) {
    if (obj) {
      this.id = obj.id != null ? obj.id : null;
      this.agencia = obj.agencia != null ? obj.agencia : null;
      this.numero = obj.numero != null ? obj.numero : null;
      this.valor = obj.valor != null ? obj.valor : null;
      this.clienteDTO = obj.clienteDTO != null ? obj.clienteDTO : null;
    }
  }
}
