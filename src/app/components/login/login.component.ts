import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email;
  password;

  constructor(private userService: UsersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getSignedUpUsers().subscribe();
  }

  onLogIn(email, password) {
    this.authService.login(email, password);
  }

  onSignUp(email, password) {
    if (email === '' || password === '') {
      alert('Please enter e-mail and password');
      return;
    }
    this.userService.addUser({ email: email, password: password }).subscribe((data) => {
      console.log(data);
    });
    this.userService.users.push({ email, password });
  }
}
