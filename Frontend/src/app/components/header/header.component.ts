import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/api/authentication.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';
import { LoginMenuComponent } from 'src/app/components/loginmenu/loginmenu.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserProfile } from 'src/app/models/userprofile.model';
import { SidenavService } from 'src/app/services/sidenav.service';
import { NewmatchComponent } from '../newmatch/newmatch.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuOpen$ = this.sidenavService.getIsOpen();

  title: string = 'UIT 8-POOL';
  loggedInUser: UserProfile | undefined;
  currentUser$ = this.users.getCurrentUser();
  constructor(
    auth: AuthenticationService,
    private users: UserprofilesService,
    public dialog: MatDialog,
    private sidenavService: SidenavService
  ) {
    auth.isLoggedIn().subscribe((res) => {
      console.log(res);
      if (res) {
        users.setCurrentUser(res);
      }
    });
    users.getUsers().subscribe((res) => console.log(res));
  }

  setMenuOpen = (open: boolean) => {
    console.log(open);
    this.sidenavService.setIsOpen(open);
  };

  ngOnInit(): void {}

  newMatch = (): void => {
    this.dialog.open(NewmatchComponent, {
      width: '500px',
    });
  };

  openDialog = (): void => {
    this.dialog.open(LoginMenuComponent, {
      width: '500px',
    });
  };
}
