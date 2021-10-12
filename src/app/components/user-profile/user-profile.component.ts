import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user;
  userId: string;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    this.usersService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  navigateBack() {
    this.router.navigate(['todos']);
  }
}
