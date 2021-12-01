import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isUserLoggedIn()) {
      this.errorMessageSubject.next('Error!');
      //alert('You are not allowed to view this page');
      this.router.navigate([''], { queryParams: { retUrl: route.url } });
      return false;
    }
    return true;
  }
}
