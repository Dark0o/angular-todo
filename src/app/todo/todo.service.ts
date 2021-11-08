import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user/user';
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

  getUsersTodos(id: string): Observable<Todo[]> {
    if (this.usersTodos.length > 0) {
      console.log('if happened');

      return of(this.usersTodos);
    }
    return this.http.get(`${this.url}.json`).pipe(
      map((responseData) => {
        console.log('else happened');
        for (const key in responseData) {
          this.usersTodos.push({ ...responseData[key], id: key });
        }
        this.usersTodos = this.usersTodos.filter((todo) => todo.userID === id);

        return this.usersTodos;
      })
    );
  }

  getSharedTodos(): Observable<any> {
    if (this.sharedTodos.length > 0) {
      console.log('if happened');
      return of(this.sharedTodos);
    }
    return this.http.get(`${this.url}.json`).pipe(
      map((responseData) => {
        console.log('else happened');

        for (const key in responseData) {
          this.sharedTodos.push({ ...responseData[key], id: key });
        }
        this.sharedTodos = this.sharedTodos.filter(
          (todo: Todo) => todo.isPublic === true
        );
        return this.sharedTodos;
      })
    );
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}.json`);
  }

  addTodo(todo: TodoDto): Observable<any> {
    return this.http.post(`${this.url}.json`, todo);
  }

  updateTodo(todoProperty, todoId): Observable<any> {
    return this.http.patch(`${this.url}/${todoId}.json`, todoProperty);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}.json`);
  }
}
