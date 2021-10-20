import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

function comparePasswords(c: AbstractControl): ValidationErrors | null {
  const password = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (password.pristine || confirmPassword.pristine) {
    return null;
  }

  if (password.value === confirmPassword.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  regex = /\d/;
  constructor(private fb: FormBuilder, private userService: UsersService) {}

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
    console.log(this.signupForm.get('passwordGroup.password').value);
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }
    const dateOfBirth: string = new Date(
      this.signupForm.get('dateOfBirth').value
    ).toISOString();

    const user = Object.assign({}, this.signupForm.value, { dateOfBirth });
    console.log(user);

    this.userService.addUser(user).subscribe();
  }
}
