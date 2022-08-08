import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { UserProfile } from 'src/app/models/userprofile.model';
import { MatchesService } from 'src/app/services/api/matches.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';

@Component({
  selector: 'app-newmatch',
  templateUrl: './newmatch.component.html',
  styleUrls: ['./newmatch.component.css'],
})
export class NewmatchComponent implements OnInit {
  users$ = this.user.getUsers();

  winnerControl = new FormControl('');
  filteredWinners = this.winnerControl.valueChanges.pipe(
    startWith(''),
    switchMap((value) => this._filter(value ?? '')),
  );

  loserControl = new FormControl('');
  filteredLosers = this.loserControl.valueChanges.pipe(
    startWith(''),
    switchMap((value) => this._filter(value ?? '')),
  );

  winner: UserProfile;
  winnerId: number;
  loser: UserProfile;
  loserId: number;
  filteredUsers: Observable<string[]>;
  Today = new Date();

  constructor(
    private dialogRef: MatDialogRef<NewmatchComponent>,
    private match: MatchesService,
    private user: UserprofilesService,
  ) {}

  onNoClick = () => {
    this.dialogRef.close({ winner: this.winner, loser: this.loser });
  };

  ngOnInit(): void {}

  private _filter(name: string | UserProfile) {
    if (typeof name !== 'string') return this.users$;

    const filterValue = name.toLowerCase();

    return this.users$.pipe(
      map((users) => users.filter((option) => option.userName.toLowerCase().includes(filterValue))),
    );
  }

  createMatch = () => {
    const winnerId = this.winner.id ?? 69;
    const loserId = this.loser.id ?? 69;

    this.match.createMatch({ id: 0, winner: winnerId, loser: loserId, date: Number(this.Today) });
  };
}
