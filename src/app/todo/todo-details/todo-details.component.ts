import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo } from '../todo';
import { ToDoService } from 'src/app/todo/todo.service';
import { UsersService } from '../../user/users.service';

@Component({
  selector: 'app-to-do-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  todo: Todo;
  date: string;
  editStatus: string;
  deleteStatus: string;
  userId: string;
  usersName: string;
  errorMessage: string;
  editTitle: boolean = false;
  editDescription: boolean = false;
  private isDestroyed$ = new Subject();

  constructor(
    private router: Router,
    private todoService: ToDoService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;

    this.todoService
      .getTodoById(this.route.snapshot.params.id)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (todo: Todo) => {
          this.todo = todo;
        },
        () => {
          this.errorMessage = 'Couldnt get todo!';
        }
      );

    this.usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (user) => {
          this.usersName = `${user.firstName} ${user.lastName}`;
        },
        () => {
          this.errorMessage = 'Couldnt get the user!';
        }
      );
  }
  editFiled(event): void {
    if (event.target.id === 'public') {
      this.todo.isPublic = !this.todo.isPublic;
      this.todoService
        .updateTodo(this.todo)
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }
    if (event.target.id === 'completed') {
      this.todo.isCompleted = !this.todo.isCompleted;
      this.todoService
        .updateTodo(this.todo)
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }
    if (event.target.id === 'important') {
      this.todo.isImportant = !this.todo.isImportant;
      this.todoService
        .updateTodo(this.todo)
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }
  }

  editInput(event): void {
    if (event.target.id === 'title') {
      this.editTitle = true;
    }
    if (event.target.id === 'description') {
      this.editDescription = true;
    }
  }

  saveEdit(): void {
    console.log('fired');
    console.log(this.todo);

    this.todoService
      .updateTodo(this.todo)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (res) => {
          console.log(res);
        },
        () => {
          this.errorMessage = 'Updating failed';
        }
      );
    if ((this.editDescription || this.editTitle) === true) {
      this.editTitle = false;
      this.editDescription = false;
    }
  }
  deleteTodo(): void {
    this.deleteStatus = 'Deleting...';

    this.todoService
      .deleteTodo(this.todo.id)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        () => {
          this.deleteStatus = 'ToDo Deleted!';
        },
        () => {
          this.errorMessage = 'Couldnt delete todo';
        },
        () => {
          this.todoService.usersTodos = this.todoService.usersTodos.filter(
            (todo) => todo.id !== this.todo.id
          );
        }
      );
  }

  navigateBack(): void {
    this.router.navigate(['todos']);
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
