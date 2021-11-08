import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(public router: Router, private authService: AuthService) {}

  onLogOut(): void {
    this.router.navigate(['']);
    this.authService.logoutUser();
  }

  addNew(): void {
    this.router.navigate(['todos/new']);
  }

  goBack(): void {
    this.router.navigate(['todos']);
  }

  hasRoute(route: string): boolean {
    if (this.router.url === route) {
      return true;
    }
  }
}
