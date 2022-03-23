export class EnderecoDTO {
  constructor(
    public logradouro?: string,
    public bairro?: string,
    public numero?: string,
    public cidade?: string,
    public cep?: string,
    public uf?: string
  ) { }
}
