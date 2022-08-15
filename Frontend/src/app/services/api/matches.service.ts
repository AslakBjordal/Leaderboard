import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { BaseApiService } from './base-api.service';
import { UserProfile } from 'src/app/models/userprofile.model';
import { IdToScore } from 'src/app/models/idtoscore.model';
@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(public baseApi: BaseApiService) {}

  getMatches = (): Observable<Match[]> => this.baseApi.get<Match[]>('matches');

  createMatch = (match: Match): Observable<Match> =>
    this.baseApi.post<Match>('matches', match);

  getScore = (): Observable<IdToScore[]> => 
    this.baseApi.get<IdToScore[]>('matches/score');

  getScoreFiltered = (start?:number, end?:number): Observable<IdToScore[]> => 
    this.baseApi.get<IdToScore[]>('matches/score/filtered?',{DateStart : start, DateEnd : end});
}
