import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { UsersService } from '../../user/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  loggedInUser: string = 'user';
  user: User;

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

  logoutUser(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.loggedInUser);
  }
}
