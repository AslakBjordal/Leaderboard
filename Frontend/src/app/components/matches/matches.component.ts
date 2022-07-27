import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.matchService
      .getMatch()
      .subscribe((matches) => (this.matches = matches));
  }
}
