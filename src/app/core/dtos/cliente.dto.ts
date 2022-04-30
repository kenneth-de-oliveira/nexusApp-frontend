import { EnderecoDTO } from "./endereco.dto";
import { UsuarioDTO } from "./usuario.dto";

export class ClienteDTO {
  constructor(
    public nome?: string,
    public sobrenome?: string,
    public documento?: string,
    public email?: string,
    public telefone?: string,
    public enderecoDTO?: EnderecoDTO,
    public usuarioDTO?: UsuarioDTO
  ) { }
}
