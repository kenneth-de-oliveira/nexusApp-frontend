import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './layouts/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'conta',
    loadChildren: './modules/conta/conta.module#ContaModule'
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
