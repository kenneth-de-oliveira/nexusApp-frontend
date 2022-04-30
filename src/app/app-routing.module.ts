import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { BasicComponent } from './layouts/basic/basic.component';
import { LoginComponent } from './modules/login/login.component';
import { InicioComponent } from './modules/home/componentes/inicio/inicio.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: BasicComponent, children: [
    { path : 'home', component: InicioComponent, canActivate : [AuthGuard] },
    { path: '' , redirectTo: '/home', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
