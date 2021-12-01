import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
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
  guardErrorMessage$ = this.agService.errorMessage$;

  private isDestroyed$ = new Subject();

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
    private agService: AuthGuardService
  ) {}

  private userExists(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const email: string = c.get('email')?.value;
      const password: string = c.get('password')?.value;

      if (this.userService.userExists(email, password)) {
        return null;
      } else return { exists: true };
    };
  }

  ngOnInit(): void {
    this.userService
      .getSignedUpUsers()
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe();

    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validators: this.userExists() }
    );
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
