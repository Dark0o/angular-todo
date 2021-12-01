import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { TodoDto } from '../todo';
import { TodoService } from 'src/app/todo/todo.service';
import { UsersService } from '../../user/users.service';

@Component({
  selector: 'app-to-do-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  todo!: TodoDto;
  date!: string;
  editStatus!: string;
  deleteStatus!: string;
  errorMessage!: string;
  editTitle: boolean = false;
  editDescription: boolean = false;
  private isDestroyed$ = new Subject();

  user$ = this.todoService
    .getTodoById(this.route.snapshot.params['id'])
    .pipe(mergeMap((todo) => this.usersService.getUserById(todo.userID)));

  constructor(
    private router: Router,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.todoService
      .getTodoById(this.route.snapshot.params['id'])
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (todo: TodoDto) => {
          if (!todo) {
            this.errorMessage = 'Couldnt get todo!';
          }
          this.todo = todo;
        },
        () => {
          this.errorMessage = 'Couldnt get todo!';
        }
      );
  }
  editFiled(event: MouseEvent): void {
    const target = event.target as HTMLTableCellElement;
    if (target.id === 'public') {
      this.todo.isPublic = !this.todo.isPublic;
      this.todoService
        .updateTodo(
          { isPublic: this.todo.isPublic },
          this.route.snapshot.params['id']
        )
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }
    if (target.id === 'completed') {
      this.todo.isCompleted = !this.todo.isCompleted;
      this.todoService
        .updateTodo(
          { isCompleted: this.todo.isCompleted },
          this.route.snapshot.params['id']
        )
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }
    if (target.id === 'important') {
      this.todo.isImportant = !this.todo.isImportant;
      this.todoService
        .updateTodo(
          { isImportant: this.todo.isImportant },
          this.route.snapshot.params['id']
        )
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }
  }

  editInput(event: MouseEvent): void {
    const target = event.target as HTMLTableCellElement;
    if (target.id === 'title') {
      this.editTitle = true;
    }
    if (target.id === 'description') {
      this.editDescription = true;
    }
  }

  saveEdit(event: FocusEvent): void {
    const target = event.target as HTMLTableCellElement;
    if (target.id === 'titleInput') {
      this.todoService
        .updateTodo(
          { title: this.todo.title },
          this.route.snapshot.params['id']
        )
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }
    if (target.id === 'descriptionInput') {
      this.todoService
        .updateTodo(
          { description: this.todo.description },
          this.route.snapshot.params['id']
        )
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(
          () => {},
          () => {
            this.errorMessage = 'Updating failed';
          }
        );
    }

    if ((this.editDescription || this.editTitle) === true) {
      this.editTitle = false;
      this.editDescription = false;
    }
  }

  deleteTodo(): void {
    this.deleteStatus = 'Deleting...';

    this.todoService
      .deleteTodo(this.route.snapshot.params['id'])
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        () => {
          this.deleteStatus = 'Todo Deleted!';
        },
        () => {
          this.errorMessage = 'Couldnt delete todo';
        },
        () => {
          this.todoService.usersTodos = this.todoService.usersTodos.filter(
            (todo) => todo.id !== this.route.snapshot.params['id']
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
