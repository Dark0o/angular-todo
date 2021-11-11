import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';
import { UsersService } from '../../user/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private isDestroyed$ = new Subject();

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService
      .getSignedUpUsers()
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value
    );
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
