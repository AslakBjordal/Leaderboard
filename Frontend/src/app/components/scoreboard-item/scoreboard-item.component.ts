import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IdToScore } from 'src/app/models/idtoscore.model';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';

@Component({
  selector: 'app-scoreboard-item',
  templateUrl: './scoreboard-item.component.html',
  styleUrls: ['./scoreboard-item.component.css']
})
export class ScoreboardItemComponent implements OnInit {
  @Input() score: IdToScore;
  users$ = this.userService.getUsers();

  constructor(private userService: UserprofilesService) {}

  ngOnInit(): void {
  }
  getUser = (userId: number) =>
    this.users$.pipe(
      map((users) => users.find((user) => user.id === userId))
    );
}
