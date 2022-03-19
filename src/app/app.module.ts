import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BasicComponent } from './layouts/basic/basic.component';
import { FooterComponent } from './layouts/components/footer/footer.component';
import { NavbarComponent } from './layouts/components/navbar/navbar.component';
import { SidebarComponent } from './layouts/components/sidebar/sidebar.component';
import { PaginaNaoEncontradaComponent } from './layouts/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaSemAutorizacaoComponent } from './layouts/pages/pagina-sem-autorizacao/pagina-sem-autorizacao.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    PaginaNaoEncontradaComponent,
    PaginaSemAutorizacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
