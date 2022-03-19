import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
