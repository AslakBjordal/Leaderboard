import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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

  winner?: UserProfile;
  winnerId: number;
  loser?: UserProfile;
  loserId: number;
  filteredUsers: Observable<string[]>;
  Today = new FormControl(new Date());
  pickedDate : Date;
  changed: boolean;


  constructor(
    private dialogRef: MatDialogRef<NewmatchComponent>,
    private match: MatchesService,
    private user: UserprofilesService,
  ) {}

  onNoClick = () => {
    this.dialogRef.close({ winner: this.winner, loser: this.loser });
  };

  ngOnInit(): void {
    this.changed = false;
  }

  
  onDateChange = (event: MatDatepickerInputEvent<Date>) =>{
    this.pickedDate = event.value ?? new Date();
    this.changed = true;
    
  }

  private _filter(name: string | UserProfile) {
    if (typeof name !== 'string') return this.users$;
    const filterValue = name.toLowerCase();

    return this.users$.pipe(
      map((users) => users.filter((option) => option.userName.includes(filterValue))),
    );
  }
 
  createMatch = () => {
    const winnerId = this.winner?.id ?? 69;
    const loserId = this.loser?.id ?? 69;

    if (this.changed == true) {
      this.match.createMatch({ id: 0, winner: winnerId, winnerElo: this.winner?.elo??0,
                                      loser: loserId, loserElo: this.loser?.elo??0,
                                      date: this.pickedDate.getTime()??0})
        .subscribe(res=> {console.log(res)
        window.location.reload();});
    }
    else {
      //create match
      this.match.createMatch({ id: 0, winner: winnerId, winnerElo: this.winner?.elo??0,
                                      loser: loserId, loserElo:this.loser?.elo??0,
                                      date: this.Today.value?.getTime()??0})
        .subscribe(res=> {console.log(res)
        window.location.reload();});

     
    }
    this.onNoClick()
  };
}
