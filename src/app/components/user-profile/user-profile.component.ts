import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user;
  userId;

  constructor(private usersService: UsersService) {
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.usersService.getuserById(this.userId).subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
