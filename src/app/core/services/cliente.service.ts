import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteMinimoDTO } from '../dtos/cliente-minimo.dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private controller = 'clientes';

  constructor(private apiService: ApiService) { }

  updateContato(idCliente: Number, cliente: ClienteMinimoDTO): Observable<any> {
    return this.apiService.patch(`${this.controller}/${idCliente}`, cliente);
  }
}
