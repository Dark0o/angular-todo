import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
      }),
      catchError(this.handleError)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.url}/${id}.json`)
      .pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    if (this.users.length > 0) {
      if (!!this.userExists(user.email, user.password)) {
        throw new Error('User already exists, please Log In');
      }
    }
    return this.http
      .post<User>(`${this.url}.json`, user)
      .pipe(catchError(this.handleError));
  }

  userExists(email: string, password: string): User {
    let user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) return user;
    else throw new Error('User doesnt exist!');
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `${err.status}, ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
