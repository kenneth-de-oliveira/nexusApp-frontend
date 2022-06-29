import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoDTO } from '../dtos/endereco.dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private controller = 'enderecos';

  constructor(private apiService: ApiService) { }

  updateEndereco(idCliente: Number, endereco: EnderecoDTO): Observable<any> {
    return this.apiService.put(`${this.controller}/${idCliente}`, endereco);
  }
}
