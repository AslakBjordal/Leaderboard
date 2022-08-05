import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  loser: string;
  users: UserProfile[];
  myControl = new FormControl<string | UserProfile>('');
  filteredUsers: Observable<UserProfile[]>;

  constructor(
    private dialogRef: MatDialogRef<NewmatchComponent>,
    private match: MatchesService,
    private user: UserprofilesService
  ) {}

  onNoClick = () => {
    this.dialogRef.close({ winner: this.winner, loser: this.loser });
  };

  createMatch = () => {};
  ngOnInit(): void {
    this.user.getUsers().subscribe((res) => (this.users = res));
    this.filteredUsers = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const userName = typeof value === 'string' ? value : value?.userName;
        return userName ? this._filter(userName as string) : this.users.slice();
      })
    );
  }

  displayFn(user: UserProfile): string {
    return user && user.userName ? user.userName : '';
  }

  private _filter(name: string): UserProfile[] {
    const filterValue = name.toLowerCase();

    return this.users.filter((option) =>
      option.userName.toLowerCase().includes(filterValue)
    );
  }
}
