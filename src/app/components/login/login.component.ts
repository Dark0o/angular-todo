import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getSignedUpUsers().subscribe();
  }

  onLogIn(email: string, password: string) {
    this.authService.login(email, password);
  }

  onSignUp(email: string, password: string) {
    if (email === '' || password === '') {
      alert('Please enter e-mail and password');
      return;
    }
    this.userService.addUser({ email, password }).subscribe();
    this.userService.users.push({ email, password });
  }
}
