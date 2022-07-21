import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { Match } from 'src/app/Match';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];

  
  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.getMatch().subscribe((matches)=> this.matches = matches);
  }

}
