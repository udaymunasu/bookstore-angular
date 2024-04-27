import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private auth: AuthService,) {}

  title = 'book-store';
  isLoggedin: boolean

  
  ngOnInit(): void {
    this.isLoggedin = this.auth.isLoggedin;

    // Subscribe to login state changes using the event emitter
    this.auth.loginStateChanged.subscribe((isLoggedIn: boolean) => {
      this.isLoggedin = isLoggedIn;
      console.log("isLoggedinisLoggedin", this.isLoggedin)

    });
  }
}
