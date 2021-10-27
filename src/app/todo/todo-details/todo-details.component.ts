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
  showEdit: boolean = false;
  editStatus: string;
  deleteStatus: string;
  userId: string;
  usersName: string;
  errorMessage: string;
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
        (error) => {
          this.errorMessage = 'Couldnt get todo!';
          console.log(error);
        }
      );

    this.usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (user) => {
          this.usersName = `${user.firstName} ${user.lastName}`;
        },
        (error) => {
          this.errorMessage = 'Couldnt get the user!';
          console.log(error);
        }
      );
  }

  navigateBack(): void {
    this.router.navigate(['todos']);
  }

  deleteTodo(): void {
    this.deleteStatus = 'Deleting...';

    this.todoService
      .deleteTodo(this.todo.id)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        () => {
          this.deleteStatus = 'ToDo Deleted!';

          setTimeout(() => {
            this.router.navigate(['todos']);
          }, 3000);
        },
        (error) => {
          this.errorMessage = 'Couldnt delete todo';
          console.log(error);
        },
        () => {
          this.todoService.usersTodos = this.todoService.usersTodos.filter(
            (todo) => todo.id !== this.todo.id
          );
        }
      );
  }

  markImportant(): void {
    this.todo.isImportant = !this.todo.isImportant;
  }

  markDone(): void {
    this.todo.isCompleted = !this.todo.isCompleted;
  }
  markPublic(): void {
    this.todo.isPublic = !this.todo.isPublic;
  }

  edit(): void {
    this.editStatus = 'Editing...';

    this.todoService
      .updateTodo(this.todo)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        () => {
          this.editStatus = 'Edited!';
          setInterval(() => {
            this.showEdit = false;
            this.editStatus = undefined;
          }, 3000);
        },
        (error) => {
          this.errorMessage = 'Couldnt edit todo';
          console.log(error);
        }
      );

    this.showEdit = false;
  }

  onEdit(): void {
    this.showEdit = true;
  }

  cancelEditing(): void {
    this.showEdit = false;
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
