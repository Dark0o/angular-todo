import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/user/user';
import { UsersService } from '../../user/users.service';

function comparePasswords(c: AbstractControl): ValidationErrors | null {
  const password = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (password!.pristine || confirmPassword!.pristine) {
    return null;
  }

  if (password!.value === confirmPassword!.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  regex = /\d/;
  warningMessage!: string;
  signedUpMessage!: string;
  private isDestroyed$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.pattern(this.regex),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        { validators: comparePasswords }
      ),
      dateOfBirth: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.warningMessage = 'Please fill out all required fileds';
      return;
    }
    const dateOfBirth: string = new Date(
      this.signupForm.get('dateOfBirth')!.value
    ).toISOString();

    const user: User = {
      firstName: this.signupForm.get('firstName')!.value,
      lastName: this.signupForm.get('lastName')!.value,
      email: this.signupForm.get('email')!.value,
      password: this.signupForm.get('passwordGroup.password')!.value,
      dateOfBirth,
    };

    this.userService
      .addUser(user)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(() => {
        this.userService.users.push(user);
        this.signedUpMessage = 'You have singed up! Go to log in.';
      });
  }

  goToLogIn(): void {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
