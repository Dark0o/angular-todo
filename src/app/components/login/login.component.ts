import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  loginForm: FormGroup;
  componentDesteroyed$: Subject<boolean> = new Subject();

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address',
  };

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService
      .getSignedUpUsers()
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
  }

  // onLogIn(email: string, password: string): void {
  //   this.authService.login(email, password);
  // }

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
