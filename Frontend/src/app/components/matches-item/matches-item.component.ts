import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';

@Component({
  selector: 'app-matches-item',
  templateUrl: './matches-item.component.html',
  styleUrls: ['./matches-item.component.css'],
})
export class MatchesItemComponent implements OnInit {
  @Input() match: Match;
  users$ = this.userService.getUsers();

  constructor(private userService: UserprofilesService) {}

  ngOnInit(): void {
    console.log(this.match);
  }

  getUser = (userId: number) =>
    this.users$.pipe(
      map((users) => users.find((user) => user.id === userId)?.userName)
    );
}
