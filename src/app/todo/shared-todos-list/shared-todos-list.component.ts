import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo/todo.service';
import { UsersService } from 'src/app/user/users.service';
import { of, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Todo } from '../todo';
import { User } from 'src/app/user/user';

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
export class SharedTodosListComponent implements OnInit, OnDestroy {
  todo: Todo;
  sharedTodos: SharedTodo[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'fullName',
  ];

  private isDestroyed$ = new Subject();

  constructor(
    private todosService: TodoService,
    private usersService: UsersService
  ) {}

  // TODO revisit all this functionallity
  ngOnInit(): void {
    this.usersService
      .getSignedUpUsers()
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe();

    this.todosService
      .getSharedTodos()
      .pipe(
        mergeMap((todos: Todo[]) => {
          return of(
            todos.map((todo: Todo) => {
              const foundUser: User = this.usersService.users.find(
                (user) => user.id === todo.userID
              );
              if (foundUser) {
                const sharedTodo: SharedTodo = {
                  title: todo.title,
                  description: todo.description,
                  createdAt: todo.createdAt,
                  usersName: `${foundUser.firstName} ${foundUser.lastName}`,
                };
                return sharedTodo;
              }
            })
          );
        }),
        takeUntil(this.isDestroyed$)
      )
      .subscribe((todos) => {
        this.sharedTodos = todos;
        console.log(this.sharedTodos);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
