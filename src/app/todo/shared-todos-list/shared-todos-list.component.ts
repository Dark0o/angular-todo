import { Component } from '@angular/core';
import { TodoService } from 'src/app/todo/todo.service';
import { UsersService } from 'src/app/user/users.service';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo } from '../todo';
interface SharedTodo {
  title: string;
  description: string;
  createdAt: string;
  usersName: string;
}

@Component({
  selector: 'app-shared-todos-list',
  templateUrl: './shared-todos-list.component.html',
  styleUrls: ['./shared-todos-list.component.scss'],
})
export class SharedTodosListComponent {
  todo!: Todo;
  errorMessage!: string;
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'fullName',
  ];

  sharedTodos$ = forkJoin([
    this.todosService.getSharedTodos(),
    this.usersService.getSignedUpUsers(),
  ]).pipe(
    map(([todos, users]) =>
      todos.map((todo) => {
        const foundUser = users.find((user) => user.id === todo.userID);
        if (foundUser) {
          const sharedTodo: SharedTodo = {
            title: todo.title,
            description: todo.description,
            createdAt: todo.createdAt,
            usersName: `${foundUser.firstName} ${foundUser.lastName}`,
          };
          return sharedTodo;
        } else return EMPTY;
      })
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(
    private todosService: TodoService,
    private usersService: UsersService
  ) {}
}
