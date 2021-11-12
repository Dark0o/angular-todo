import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../user/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UsersService, private router: Router) {}

  login(email: string, password: string): void {
    if (!!this.userService.loggedInUser(email, password)) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          email,
          userId: this.userService.loggedInUser(email, password)!.id,
        })
      );
      this.router.navigate(['todos']);
    } else alert('Incorrect email or password!');
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem('user')) return true;
    else return false;
  }

  logoutUser(): void {
    localStorage.removeItem('user');
  }
}
