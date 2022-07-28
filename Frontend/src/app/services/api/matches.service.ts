import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(public baseApi: BaseApiService) {}

  getMatches = (): Observable<Match[]> => this.baseApi.get<Match[]>('matches');

  createMatch = (match: Match): Observable<Match> =>
    this.baseApi.post<Match>('matches', match);
}
