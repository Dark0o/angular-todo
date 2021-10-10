import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  loggedInUser = 'user';

  constructor(private userService: UsersService, private router: Router) {
    let user = JSON.parse(localStorage.getItem(this.loggedInUser));
    console.log(user);

    if (user !== null) {
      this.isLoggedIn = user.isUserLoggedIn;
    } else {
      this.isLoggedIn = false;
    }
  }

  login(email: string, password: string) {
    if (this.userService.userExists(email, password)) {
      this.isLoggedIn = true;
      console.log('logged in');
      console.log(this.isLoggedIn);
      this.router.navigate(['todos']);
      localStorage.setItem(this.loggedInUser, JSON.stringify({ email: email, isUserLoggedIn: this.isLoggedIn }));
      return this.isLoggedIn;
    } else alert('Incorrect email or password!');
  }

  isUserLoggedIn(): boolean {
    console.log(this.isLoggedIn);
    return this.isLoggedIn;
  }

  logoutUser() {
    this.isLoggedIn = false;
    //this.userService.loggedInUser = null;
    localStorage.removeItem(this.loggedInUser);
    localStorage.removeItem('userID');
  }
}
