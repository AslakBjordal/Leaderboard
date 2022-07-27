import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-matches-item',
  templateUrl: './matches-item.component.html',
  styleUrls: ['./matches-item.component.css'],
})
export class MatchesItemComponent implements OnInit {
  @Input() match: Match;

  constructor() {}

  ngOnInit(): void {}
}
