import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from './user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = [];
  url: string =
    'https://todo-app-2e14b-default-rtdb.europe-west1.firebasedatabase.app/users';

  constructor(private http: HttpClient) {}

  getSignedUpUsers(): Observable<any> {
    if (this.users.length > 0) {
      console.log('if happened');
      return of(this.users);
    }
    return this.http.get(`${this.url}.json`).pipe(
      map((data) => {
        console.log('else happened');
        for (const key in data) {
          this.users.push({ ...data[key], id: key });
        }
        return this.users;
      })
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}.json`);
  }

  addUser(user: UserDto): Observable<any> {
    if (this.users.length > 0) {
      if (this.userExists(user.email, user.password)) {
        alert('User already exists, please Log In');
        return;
      }
    }
    return this.http.post(`${this.url}.json`, user);
  }

  userExists(email: string, password: string) {
    let user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) return user;

    return false;
  }
}
