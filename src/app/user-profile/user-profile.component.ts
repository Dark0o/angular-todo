import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user;
  userId: string;
  sub: Subscription;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    this.sub = this.usersService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  navigateBack() {
    this.router.navigate(['todos']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
