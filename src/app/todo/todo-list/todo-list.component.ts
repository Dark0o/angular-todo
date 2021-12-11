import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo, TodoDto } from '../todo';
import { UsersService } from '../../user/users.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  completed = false;
  date!: string;
  important = false;
  description: string = '';
  isPublic: boolean = false;
  userId!: string;
  filteredTodos: Todo[] = [];
  toggleImp: boolean = false;
  toggleComplete: boolean = false;
  loadingState: boolean = true;
  isAscending: boolean = true;
  sortingFlags = {
    sortTitle: true,
    sortDate: true,
    sortImportant: true,
    sortDone: true,
  };
  errorMessage: string = '';
  usersHeading!: string;

  private isDestroyed$ = new Subject();

  private _filter!: string;

  get filter() {
    return this._filter;
  }

  set filter(value) {
    this._filter = value;
    this.performFilter(this.filter);
  }

  get usersTodos(): Todo[] {
    return this.todoService.usersTodos;
  }
  constructor(
    private todoService: TodoService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).userId;

    this.todoService
      .getUsersTodos(this.userId)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        () => {
          this.performFilter();

          if (this.usersTodos.length === 0) {
            this.errorMessage = 'No todos yet!';
          }
          this.loadingState = false;
        },
        () => {
          this.errorMessage = 'Couldnt get todos';
        }
      );
    this.usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (user) => {
          this.usersHeading = `${user.firstName}'s Todo list`;
        },
        () => {
          this.errorMessage = 'Couldnt get the users';
        }
      );
  }

  trackByFn(index: number, todo: Todo): string {
    return todo.id;
  }

  sortTitle(): void {
    if (this.sortingFlags.sortTitle === true) {
      this.filteredTodos.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      this.sortingFlags.sortTitle = false;
    } else {
      this.filteredTodos.sort((a, b) => {
        return -a.title.localeCompare(b.title);
      });
      this.sortingFlags.sortTitle = true;
    }
  }

  sortDate(): void {
    if (this.sortingFlags.sortDate === true) {
      this.filteredTodos.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      this.sortingFlags.sortDate = false;
    } else {
      this.filteredTodos.sort(
        (a, b) => -a.createdAt.localeCompare(b.createdAt)
      );
      this.sortingFlags.sortDate = true;
    }
  }

  sortImportant(): void {
    if (this.sortingFlags.sortImportant === true) {
      this.filteredTodos
        .sort((todo) => {
          return todo.isImportant ? -1 : 1;
        })
        .reverse();
      this.sortingFlags.sortImportant = false;
    } else {
      this.filteredTodos.sort((todo) => {
        return todo.isImportant ? -1 : 1;
      });
      this.sortingFlags.sortImportant = true;
    }
  }

  sortCompleted(): void {
    if (this.sortingFlags.sortDone === true) {
      this.filteredTodos
        .sort((todo) => {
          return todo.isCompleted ? -1 : 1;
        })
        .reverse();
      this.sortingFlags.sortDone = false;
    } else {
      this.filteredTodos.sort((todo) => {
        return todo.isCompleted ? -1 : 1;
      });
      this.sortingFlags.sortDone = true;
    }
  }

  toggleImportant(): void {
    this.toggleImp = !this.toggleImp;

    if (this.toggleImp === true) {
      this.filteredTodos = this.filteredTodos.filter(
        (todo) => todo.isImportant === true
      );
    } else {
      this.filteredTodos = this.usersTodos;
    }
  }

  toggleDone(): void {
    this.toggleComplete = !this.toggleComplete;

    if (this.toggleComplete === true) {
      this.filteredTodos = this.filteredTodos.filter(
        (todo) => todo.isCompleted === true
      );
    } else {
      this.filteredTodos = this.usersTodos;
    }
  }

  addTodo(title: string): void {
    const todo: TodoDto = {
      title: title,
      description: this.description,
      isImportant: this.important,
      isCompleted: this.completed,
      isPublic: this.isPublic,
      createdAt: new Date().toISOString(),
      userID: this.userId,
    };

    this.todoService
      .addTodo(todo)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (response) => {
          this.todoService.usersTodos.push({
            title: title,
            description: this.description,
            isImportant: this.important,
            isCompleted: this.completed,
            isPublic: this.isPublic,
            id: response.name!,
            createdAt: new Date().toISOString(),
            userID: this.userId,
          });
        },
        () => {
          this.errorMessage = 'Adding todo failed';
        }
      );
  }

  onDelete(todo: Todo): void {
    this.filteredTodos = this.filteredTodos.filter(
      (item) => item.title !== todo.title
    );
    this.todoService
      .deleteTodo(todo.id)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        () => {},
        () => {
          this.errorMessage = 'Deleting failed';
        },
        () => (this.todoService.usersTodos = this.filteredTodos)
      );
  }

  onItemChecked(todo: Todo): void {
    this.todoService
      .updateTodo({ isCompleted: todo.isCompleted }, todo.id)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        () => {},
        () => {
          this.errorMessage = 'Updating failed';
        }
      );
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredTodos = this.usersTodos.filter(
        (todo) =>
          todo.title
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredTodos = this.usersTodos;
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
