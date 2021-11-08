import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo/todo.service';
import { UsersService } from 'src/app/user/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo } from '../todo';

@Component({
  selector: 'app-shared-todos-list',
  templateUrl: './shared-todos-list.component.html',
  styleUrls: ['./shared-todos-list.component.scss'],
})
export class SharedTodosListComponent implements OnInit, OnDestroy {
  todo: Todo;
  sharedTodos: Todo[] = [];
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
      .subscribe(() => {});

    this.todosService
      .getSharedTodos()
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((todos) => {
        this.sharedTodos = todos.map((todo) => {
          const foundUser = this.usersService.users.find(
            (user) => user.id === todo.userID
          );
          if (foundUser) {
            todo.fullName = `${foundUser.firstName} ${foundUser.lastName}`;
          }
          return todo;
        });
        console.log(this.sharedTodos);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
