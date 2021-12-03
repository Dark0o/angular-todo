import { Component } from '@angular/core';
import { TodoService } from 'src/app/todo/todo.service';
import { UsersService } from 'src/app/user/users.service';
import { EMPTY, forkJoin, Subject } from 'rxjs';
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
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'fullName',
  ];

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  // conbineLatest, forkJoin, withLatestFrom

  sharedTodos$ = forkJoin([
    this.todosService.getSharedTodos(),
    this.usersService.getSignedUpUsers(),
  ]).pipe(
    map(([todos, users]) =>
      todos.map((todo) => {
        const foundUser = users.find((user) => user.id === todo.userID);
        return {
          title: todo.title,
          description: todo.description,
          createdAt: todo.createdAt,
          usersName: foundUser
            ? `${foundUser.firstName} ${foundUser.lastName}`
            : null,
        } as SharedTodo;
      })
    ),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(
    private todosService: TodoService,
    private usersService: UsersService
  ) {}
}
