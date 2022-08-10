import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/api/matches.service';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  scores$ = this.matchesService.getScore();
  
  constructor(private matchesService: MatchesService) { }
  ngOnInit(): void {
  }

}
