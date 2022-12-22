import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { UserProfile } from 'src/app/models/userprofile.model';
import { MatchesService } from 'src/app/services/api/matches.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  matches$ = this.matchesService.getMatches();

  constructor(
    private matchesService: MatchesService,
    private userService: UserprofilesService
  ) {}

  ngOnInit(): void {
    const d = new Date();
    const num = d.getTime();
  }
}
