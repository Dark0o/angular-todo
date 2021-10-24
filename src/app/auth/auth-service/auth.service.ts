import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  loggedInUser: string = 'user';
  user;

  constructor(private userService: UsersService, private router: Router) {
    let user = JSON.parse(localStorage.getItem(this.loggedInUser));

    if (user !== null) {
      this.isLoggedIn = user.isUserLoggedIn;
    } else {
      this.isLoggedIn = false;
    }
  }

  login(email: string, password: string) {
    if (this.userService.userExists(email, password)) {
      this.isLoggedIn = true;
      localStorage.setItem(
        this.loggedInUser,
        JSON.stringify({
          email,
          isUserLoggedIn: this.isLoggedIn,
          userId: this.userService.userExists(email, password).id,
        })
      );

      this.router.navigate(['todos']);

      return this.isLoggedIn;
    } else alert('Incorrect email or password!');
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  logoutUser() {
    this.isLoggedIn = false;
    localStorage.removeItem(this.loggedInUser);
  }
}
