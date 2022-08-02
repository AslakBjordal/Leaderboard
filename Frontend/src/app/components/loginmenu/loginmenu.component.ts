import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserProfile } from 'src/app/models/userprofile.model';
import { AuthenticationService } from 'src/app/services/api/authentication.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';

@Component({
  selector: 'app-loginmenu',
  templateUrl: './loginmenu.component.html',
  styleUrls: ['./loginmenu.component.css'],
})
export class LoginMenuComponent {
  username: string;
  password: string;

  error = false;
  createError = false;
  created = false;

  constructor(
    private dialogRef: MatDialogRef<LoginMenuComponent>,
    private auth: AuthenticationService,
    private userService: UserprofilesService
  ) {}

  onNoClick = () => {
    this.dialogRef.close({ username: this.username, password: this.password });
  };

  login() {
    this.auth
      .logIn({
        userName: this.username?.toLowerCase(),
        password: this.password,
      })
      .subscribe((res) => {
        if (res) {
          this.userService.setCurrentUser(res);
          this.dialogRef.close();
        } else {
          this.error = true;
        }
      });
  }

  register() {
    this.userService
      .createUser({
        userName: this.username?.toLowerCase(),
        password: this.password,
      })
      .subscribe((res) => {
        if (res) {
          this.created = true;
          this.error = false;
        } else {
          this.createError = true;
        }
      });
  }
}
