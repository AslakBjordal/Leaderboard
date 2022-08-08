import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { UserProfile } from 'src/app/models/userprofile.model';
import { MatchesService } from 'src/app/services/api/matches.service';
import { UserprofilesService } from 'src/app/services/api/userprofiles.service';

@Component({
  selector: 'app-newmatch',
  templateUrl: './newmatch.component.html',
  styleUrls: ['./newmatch.component.css'],
})
export class NewmatchComponent implements OnInit {
  winner: string;
  winnerId: number;
  loser: string;
  loserId: number;
  users = this.user.getUsers().value;
  filteredUsers: Observable<string[]>;
  myControl = new FormControl('');
  userNames: string[] = this.users.map(res => res.userName);
  Today = new Date()
  constructor(
    private dialogRef: MatDialogRef<NewmatchComponent>,
    private match: MatchesService,
    private user: UserprofilesService
  ) {}

  onNoClick = () => {
    this.dialogRef.close({ winner: this.winner, loser: this.loser });
  };

  ngOnInit(): void {
    this.filteredUsers = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => 
      this._filter(value || '')),
      );
    }
    
    private _filter(name: string): string[] {
      const filterValue = name.toLowerCase();
      
      return this.userNames.filter((option) =>
      option.toLowerCase().includes(filterValue)
      );
    }
    
    createMatch = () => {
      this.winnerId = this.users.find(res => res.userName == this.winner)?.id || 1000;

      this.loserId = this.users.find(res => res.userName == this.loser)?.id || 1000;
      
      this.match.createMatch({id: 0, winner: this.winnerId, loser: this.loserId, date: Number(this.Today)});
    };

}
