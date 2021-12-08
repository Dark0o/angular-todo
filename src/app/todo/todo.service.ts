import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo, TodoDto } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url: string =
    'https://todo-app-2e14b-default-rtdb.europe-west1.firebasedatabase.app/todos';
  usersTodos: Todo[] = [];
  sharedTodos: Todo[] = [];

  constructor(private http: HttpClient) {}

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

  getUsersTodos(id: string): Observable<Todo[]> {
    if (this.usersTodos.length > 0) {
      return of(this.usersTodos);
    }
    return this.http.get<Todo[]>(`${this.url}.json`).pipe(
      map((responseData) => {
        for (const key in responseData) {
          this.usersTodos.push({ ...responseData[key], id: key });
        }
        this.usersTodos = this.usersTodos.filter((todo) => todo.userID === id);

        return this.usersTodos;
      }),
      catchError(this.handleError)
    );
  }

  getSharedTodos(): Observable<Todo[]> {
    if (this.sharedTodos.length > 0) {
      return of(this.sharedTodos);
    }
    return this.http.get<Todo[]>(`${this.url}.json`).pipe(
      map((responseData) => {
        for (const key in responseData) {
          this.sharedTodos.push({ ...responseData[key], id: key });
        }
        this.sharedTodos = this.sharedTodos.filter(
          (todo: Todo) => todo.isPublic === true
        );
        return this.sharedTodos;
      }),
      catchError(this.handleError)
    );
  }

  getTodoById(id: string): Observable<TodoDto> {
    return this.http
      .get<TodoDto>(`${this.url}/${id}.json`)
      .pipe(catchError(this.handleError));
  }

  addTodo(todo: TodoDto): Observable<Todo> {
    return this.http
      .post<Todo>(`${this.url}.json`, todo)
      .pipe(catchError(this.handleError));
  }

  updateTodo(
    todoProperty: { [key: string]: boolean | string },
    todoId: string
  ): Observable<Todo> {
    return this.http
      .patch<Todo>(`${this.url}/${todoId}.json`, todoProperty)
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http
      .delete<Todo>(`${this.url}/${id}.js`)
      .pipe(catchError(this.handleError));
  }
}
