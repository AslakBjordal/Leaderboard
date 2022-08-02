import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-newmatch',
  templateUrl: './newmatch.component.html',
  styleUrls: ['./newmatch.component.css'],
})
export class NewmatchComponent implements OnInit {
  winner: string;
  loser: string;

  constructor(private dialogRef: MatDialogRef<NewmatchComponent>) {}

  onNoClick = () => {
    this.dialogRef.close({ winner: this.winner, loser: this.loser });
  };

  ngOnInit(): void {}
}
