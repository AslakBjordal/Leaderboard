import { Component, ViewChild } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuOpen$ = this.sidenavService.getIsOpen();

  constructor(private sidenavService: SidenavService) {}

  setMenuOpen = (open: boolean) => this.sidenavService.setIsOpen(open);
}
