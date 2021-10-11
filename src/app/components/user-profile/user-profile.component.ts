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
  userId;

  constructor(private usersService: UsersService, private router: Router) {
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.usersService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  navigateBack() {
    this.router.navigate(['todos']);
  }
}
