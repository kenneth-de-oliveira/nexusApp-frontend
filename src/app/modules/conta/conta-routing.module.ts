import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BasicComponent } from 'src/app/layouts/basic/basic.component';
import { ConsultarContasComponent } from './pages/consultar-contas/consultar-contas.component';
import { ConsultarSaldoComponent } from './pages/consultar-saldo/consultar-saldo.component';
import { DepositarSacarComponent } from './pages/depositar-sacar/depositar-sacar.component';
import { MinhaContaComponent } from './pages/minha-conta/minha-conta.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

const routes: Routes = [
  { path : 'conta' , component: BasicComponent,
    canActivate: [AuthGuard] ,children: [

    { path: 'minha-conta' , component: MinhaContaComponent },
    { path: 'operacoes' , component: OperacoesComponent },
    { path: 'depositar', component: DepositarSacarComponent },
    { path: 'sacar', component: DepositarSacarComponent },
    { path: 'transferir', component: TransferirComponent },
    { path: 'consultar-saldo', component: ConsultarSaldoComponent },
    { path: 'consultar-contas', component: ConsultarContasComponent },
    { path: '', redirectTo : 'conta', pathMatch: 'full' }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
