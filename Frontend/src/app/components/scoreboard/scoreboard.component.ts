import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IdToScore } from 'src/app/models/idtoscore.model';
import { MatchesService } from 'src/app/services/api/matches.service';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  @Input() type: number;
  scoresWeekly$:Observable<IdToScore[]> ;
  scoresMonthly$:Observable<IdToScore[]> ;
  scoresAlltime$:Observable<IdToScore[]> ;
  
  timeframes : Observable<IdToScore[]>[];


  current = new Date;
  firstDayOfWeek = new Date;
  lastDayOfWeek = new Date;
  firstDayOfMonth = new Date;
  LastDayOfMonth = new Date;


  constructor(private matchesService: MatchesService) { }
  
  ngOnInit(): void {
    this.firstDayOfWeek = new Date(this.current.setDate(this.current.getDate() - this.current.getDay()));
    this.lastDayOfWeek = new Date(this.current.setDate(this.current.getDate() - this.current.getDay()+6));
    this.firstDayOfWeek.setHours(0,0,0,0);
    this.lastDayOfWeek.setHours(0,0,0,0);
    this.scoresWeekly$ = this.matchesService.getScoreFiltered(this.firstDayOfWeek.getTime(),this.lastDayOfWeek.getTime());


    this.firstDayOfMonth = new Date(this.current.getFullYear(), this.current.getMonth(), 1);
    this.LastDayOfMonth = new Date(this.current.getFullYear(), this.current.getMonth() + 1, 0);
    this.firstDayOfMonth.setHours(0,0,0,0);
    this.LastDayOfMonth.setHours(0,0,0,0);
    this.scoresMonthly$ = this.matchesService.getScoreFiltered(this.firstDayOfMonth.getTime(),this.LastDayOfMonth.getTime());

    this.scoresAlltime$ = this.matchesService.getScore();

    this.timeframes = [this.scoresWeekly$,this.scoresMonthly$,this.scoresAlltime$];
  }


}
