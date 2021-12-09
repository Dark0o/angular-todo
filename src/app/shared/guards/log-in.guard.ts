import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/permission-denied');
      return false;
    } else return true;
  }
}
