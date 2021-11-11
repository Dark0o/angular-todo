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

  constructor(private userService: UsersService, private router: Router) {}

  login(email: string, password: string): void {
    if (!!this.userService.loggedInUser(email, password)) {
      this.isLoggedIn = true;
      localStorage.setItem(
        this.loggedInUser,
        JSON.stringify({
          email,
          isUserLoggedIn: this.isLoggedIn,
          userId: this.userService.loggedInUser(email, password).id,
        })
      );
      this.router.navigate(['todos']);
    } else alert('Incorrect email or password!');
  }

  isUserLoggedIn(): boolean {
    if (JSON.parse(localStorage.getItem(this.loggedInUser))) return true;
    else return false;
  }

  logoutUser(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.loggedInUser);
  }
}
