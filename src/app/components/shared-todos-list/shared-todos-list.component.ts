import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/todo.service';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITodo } from 'src/app/shared/model/todo';

@Component({
  selector: 'app-shared-todos-list',
  templateUrl: './shared-todos-list.component.html',
  styleUrls: ['./shared-todos-list.component.scss'],
})
export class SharedTodosListComponent implements OnInit, OnDestroy {
  todo: ITodo;
  sharedTodos = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'fullName',
  ];

  componentDesteroyed$: Subject<boolean> = new Subject();

  constructor(
    private todosService: ToDoService,
    private usersService: UsersService
  ) {}

  // TODO revisit all this functionallity
  ngOnInit(): void {
    console.log(this.usersService.users);
    if (this.usersService.users.length === 0) {
      this.usersService
        .getSignedUpUsers()
        .pipe(takeUntil(this.componentDesteroyed$))
        .subscribe((users) => {
          this.usersService.users = users;
          this.todosService
            .getTodos()
            .pipe(takeUntil(this.componentDesteroyed$))
            .subscribe((todos) => {
              this.sharedTodos = todos.filter(
                (todo: ITodo) => todo.isPublic === true
              );
              console.log(this.sharedTodos);

              this.sharedTodos.map((todo) => {
                const foundUser = this.usersService.users.find(
                  (user) => user.id === todo.userID
                );
                console.log(foundUser);

                if (foundUser) {
                  todo.fullName = `${foundUser.firstName} ${foundUser.lastName}`;
                }
                return todo;
              });
            });
        });
    } else {
      this.todosService
        .getTodos()
        .pipe(takeUntil(this.componentDesteroyed$))
        .subscribe((todos) => {
          this.sharedTodos = todos.filter(
            (todo: ITodo) => todo.isPublic === true
          );
          console.log(this.sharedTodos);

          this.sharedTodos.map((todo) => {
            const foundUser = this.usersService.users.find(
              (user) => user.id === todo.userID
            );
            console.log(foundUser);

            if (foundUser) {
              todo.fullName = `${foundUser.firstName} ${foundUser.lastName}`;
            }
            return todo;
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.componentDesteroyed$.next();
    this.componentDesteroyed$.complete();
  }
}
