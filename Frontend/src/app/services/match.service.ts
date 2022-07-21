import { Injectable } from '@angular/core';
import {Observable, observable, of} from 'rxjs'
import { Match } from 'src/app/Match';
import { MATCHES } from 'src/app/mock-matches';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor() { }

  getMatch(): Observable<Match[]> {
    const matches = of(MATCHES);
    return matches;
  }
}
