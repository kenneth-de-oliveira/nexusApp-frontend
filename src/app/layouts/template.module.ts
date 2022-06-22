import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaSemAutorizacaoComponent } from './pages/pagina-sem-autorizacao/pagina-sem-autorizacao.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    PaginaNaoEncontradaComponent,
    PaginaSemAutorizacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class TemplateModule { }
