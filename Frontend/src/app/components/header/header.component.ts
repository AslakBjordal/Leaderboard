import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/api/authentication.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'UIT 8BALL';

  constructor(
    private auth: AuthenticationService,
    private users: UserprofilesService
  ) {
    auth.isLoggedIn().subscribe((res) => console.log(res));
    users.getUsers().subscribe((res) => console.log(res));
  }

  ngOnInit(): void {}

  newMatch() {
    console.log('new match started');
  }

  logIn = () => {
    console.log('log in');
  };
}
