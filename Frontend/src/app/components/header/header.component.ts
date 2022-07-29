import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/api/authentication.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';
import { LoginMenuComponent } from 'src/app/components/loginmenu/loginmenu.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'UIT 8BALL';

  constructor(
    private auth: AuthenticationService,
    private users: UserprofilesService,
    public dialog: MatDialog
  ) {
    auth.isLoggedIn().subscribe((res) => console.log(res));
    users.getUsers().subscribe((res) => console.log(res));
  }

  ngOnInit(): void {}

  newMatch = () => {};

  openDialog = (): void => {
    this.dialog
      .open(LoginMenuComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          console.log(res);
          // TODO this.auth.login(res)
          // this.username = res.username;
          // this.password = res.password;
        }
      });
  };
}
