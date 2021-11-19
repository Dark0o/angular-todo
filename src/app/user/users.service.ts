import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];
  url: string =
    'https://todo-app-2e14b-default-rtdb.europe-west1.firebasedatabase.app/users';

  constructor(private http: HttpClient) {}

  getSignedUpUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      return of(this.users);
    }
    return this.http.get<User[]>(`${this.url}.json`).pipe(
      map((data) => {
        for (const key in data) {
          this.users.push({ ...data[key], id: key });
        }
        return this.users;
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}.json`);
  }

  addUser(user: User): Observable<User> {
    if (this.users.length > 0) {
      if (!!this.loggedInUser(user.email, user.password)) {
        alert('User already exists, please Log In');
      }
    }
    return this.http.post<User>(`${this.url}.json`, user);
  }

  loggedInUser(email: string, password: string): User | undefined {
    let user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) return user;
    else return;
  }
}
