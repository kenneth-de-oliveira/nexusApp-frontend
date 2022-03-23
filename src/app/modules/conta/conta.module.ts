import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContaRoutingModule } from './conta-routing.module';
import { ConsultarContasComponent } from './pages/consultar-contas/consultar-contas.component';
import { ConsultarSaldoComponent } from './pages/consultar-saldo/consultar-saldo.component';
import { ContaComponent } from './pages/conta.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { MinhaContaComponent } from './pages/minha-conta/minha-conta.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

@NgModule({
  declarations: [
    ContaComponent,
    OperacoesComponent,
    MinhaContaComponent,
    DepositarSacarComponent,
    TransferirComponent,
    ConsultarSaldoComponent,
    ConsultarContasComponent,
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
    SharedModule.forRoot(),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ContaComponent,
    MinhaContaComponent,
    OperacoesComponent,
    DepositarSacarComponent,
    TransferirComponent,
    ConsultarSaldoComponent,
    ConsultarContasComponent
  ]
})
export class ContaModule { }
