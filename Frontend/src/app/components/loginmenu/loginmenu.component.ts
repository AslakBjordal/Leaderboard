import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/api/authentication.service';

@Component({
  selector: 'app-loginmenu',
  templateUrl: './loginmenu.component.html',
  styleUrls: ['./loginmenu.component.css'],
})
export class LoginMenuComponent {
  username: string;
  password: string;

  constructor(
    private dialogRef: MatDialogRef<LoginMenuComponent>,
    private auth: AuthenticationService
  ) {}

  onNoClick = () => {
    this.dialogRef.close({ username: this.username, password: this.password });
  };

  login() {
    // this.auth.login({username: this.username, password: this.password}).then((res) => {
    //  Check if successfull and show error/success
    // })
  }

  register() {
    // this.auth.register({username: this.username, password: this.password}).then((res) => {
    //  Check if successfull and show error/success
    // })
  }
}
