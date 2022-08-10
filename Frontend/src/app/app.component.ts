import { Component, ViewChild } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { UserprofilesService } from './services/api/userprofiles.service';
import { UserProfile } from './models/userprofile.model';
import { AuthenticationService } from './services/api/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuOpen$ = this.sidenavService.getIsOpen();
  currentUser?: string;
  getuser = this.users
    .getCurrentUser()
    .subscribe((res) => (this.currentUser = res?.userName));

  constructor(
    private sidenavService: SidenavService,
    private users: UserprofilesService,
    public auth: AuthenticationService
  ) {}

  setMenuOpen = (open: boolean) => this.sidenavService.setIsOpen(open);

  logOut = () => {
    this.auth.logOut().subscribe((res) => {console.log(res)
      window.location.reload();});
  };
}
