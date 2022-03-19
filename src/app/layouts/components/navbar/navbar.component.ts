import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/utils/util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuarioSession: any;

  constructor() { }

  ngOnInit() {
    this.getUsuarioSession();
  }

  getUsuarioSession() {
    this.usuarioSession = Util.getUsuarioSession();
  }

}
