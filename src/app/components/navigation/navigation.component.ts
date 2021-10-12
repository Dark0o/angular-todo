import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(public router: Router, private authService: AuthService) {}

  onLogOut() {
    this.router.navigate(['']);
    this.authService.logoutUser();
  }

  addNew() {
    this.router.navigate(['todos/new']);
  }

  goBack() {
    this.router.navigate(['todos']);
  }

  hasRoute(route) {
    if (this.router.url === route) {
      return true;
    }
  }
}
