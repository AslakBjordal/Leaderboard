import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor() {}

  getMatch(): Observable<Match[]> {
    const matches = of();
    return matches;
  }
}
