import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoDto, ITodo } from '../shared/model/todo';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  url: string =
    'https://todo-app-2e14b-default-rtdb.europe-west1.firebasedatabase.app/todos';
  usersTodos = [];

  constructor(private http: HttpClient) {}

  getTodos(id?): Observable<any> {
    return this.http.get(`${this.url}.json`).pipe(
      map((responseData) => {
        const todos = [];
        for (const key in responseData) {
          todos.push({ ...responseData[key], id: key });
          this.usersTodos = todos.filter((todo) => todo.userID === id);
        }
        return todos;
      })
    );
  }

  getTodoById(id) {
    return this.http.get(`${this.url}/${id}.json`);
  }

  addTodo(todo: TodoDto): Observable<any> {
    console.log(todo);

    return this.http.post(`${this.url}.json`, todo);
  }

  updateTodo(todo) {
    return this.http.patch(`${this.url}/${todo.id}.json`, todo);
  }

  deleteTodo(id) {
    return this.http.delete(`${this.url}/${id}.json`);
  }
}
