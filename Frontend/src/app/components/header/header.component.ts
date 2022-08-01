import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/api/authentication.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';
import { LoginMenuComponent } from 'src/app/components/loginmenu/loginmenu.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserProfile } from 'src/app/models/userprofile.model';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();

  title: string = 'UIT 8BALL';
  loggedInUser: UserProfile | undefined;
  currentUser$ = this.users.getCurrentUser();
  constructor(
    auth: AuthenticationService,
    private users: UserprofilesService,
    public dialog: MatDialog
  ) {
    auth.isLoggedIn().subscribe((res) => {
      console.log(res);
      if (res) {
        users.setCurrentUser(res);
      }
    });
    users.getUsers().subscribe((res) => console.log(res));
  }

  toggleSideNav = () => {
    this.sidenav.emit();
  };

  ngOnInit(): void {}

  newMatch = () => {};

  openDialog = (): void => {
    this.dialog.open(LoginMenuComponent, {
      width: '500px',
    });
  };
}
