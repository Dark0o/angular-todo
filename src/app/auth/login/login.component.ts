import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';
import { UsersService } from '../../user/users.service';
import { AuthGuardService } from '../auth-service/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  warningMessage!: string;
  guardErrorMessage$ = this.agService.errorMessage$;

  private isDestroyed$ = new Subject();

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
    private agService: AuthGuardService
  ) {}

  ngOnInit(): void {
    //this.agService.errorMessage$.subscribe((value) => console.log(value));
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
    try {
      this.authService.login(
        this.loginForm.get('email')!.value,
        this.loginForm.get('password')!.value
      );
    } catch (e: any) {
      this.warningMessage = 'Invalid credentials!';
      console.error(e.message);
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
