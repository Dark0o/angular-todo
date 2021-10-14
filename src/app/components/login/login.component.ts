import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  componentDesteroyed$: Subject<boolean> = new Subject();

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService
      .getSignedUpUsers()
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe();
  }

  onLogIn(email: string, password: string): void {
    this.authService.login(email, password);
  }

  onSignUp(email: string, password: string): void {
    if (email === '' || password === '') {
      alert('Please enter e-mail and password');
      return;
    }
    this.userService
      .addUser({ email, password })
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe();
    this.userService.users.push({ email, password });
  }

  ngOnDestroy(): void {
    this.componentDesteroyed$.next();
    this.componentDesteroyed$.complete();
  }
}
