import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'UIT 8BALL';
  constructor() { }

  ngOnInit(): void {
  }

  newMatch() {
    console.log("new match started")
  }
  
  logIn() {
    console.log("log in")
  }
}
