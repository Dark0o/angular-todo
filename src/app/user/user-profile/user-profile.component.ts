import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user!: User;
  userId!: string;
  private isDestroyed$ = new Subject();

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    this.usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  navigateBack(): void {
    this.router.navigate(['todos']);
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
