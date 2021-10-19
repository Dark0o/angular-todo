import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITodo, TodoDto } from 'src/app/shared/model/todo';
import { UsersService } from 'src/app/services/users.service';
import { ToDoService } from '../../services/todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  completed = false;
  date: string;
  important = false;
  description: string = '';
  isPublic: boolean = false;
  toggleImp: boolean = false;
  toggleComplete: boolean = false;
  userId: string;
  loadingState: boolean = true;
  filteredTodos = [];
  isAscending: boolean = true;
  sortingFlags = {
    sortTitle: true,
    sortDate: true,
    sortImportant: true,
    sortDone: true,
  };
  errorMessage: string = null;
  usersHeading: string;
  componentDesteroyed$: Subject<boolean> = new Subject();

  private _filter: string;

  get filter() {
    return this._filter;
  }

  set filter(value) {
    this._filter = value;
    this.performFilter(this.filter);
  }

  get usersTodos(): ITodo[] {
    return this.todoService.usersTodos;
  }
  constructor(
    private todoService: ToDoService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    this.todoService
      .getTodos(this.userId)
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe(
        () => {
          this.performFilter();

          if (this.usersTodos.length === 0) {
            this.errorMessage = 'An error occured!';
          }
          this.loadingState = false;
        },
        (error) => {
          this.errorMessage = 'Couldnt get todos';
          console.log(error);
        }
      );
    this.usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe(
        (user) => {
          this.usersHeading = `${user.firstName}'s Todo list`;
        },
        (error) => {
          this.errorMessage = 'Couldnt get the users';
          console.log(error);
        }
      );
  }

  sortTitle(): void {
    if (this.sortingFlags.sortTitle === true) {
      this.sortByName(this.filteredTodos);
      this.sortingFlags.sortTitle = false;
    } else {
      this.sortByNameDesc(this.filteredTodos);
      this.sortingFlags.sortTitle = true;
    }
  }

  sortDate(): void {
    this.filteredTodos = this.filteredTodos.map((todo) => {
      todo.createdAt = new Date(todo.createdAt);
      todo.createdAt = todo.createdAt.getTime();
      return todo;
    });
    if (this.sortingFlags.sortDate === true) {
      this.sortNewest(this.filteredTodos);
      this.sortingFlags.sortDate = false;
    } else {
      this.sortOldest(this.filteredTodos);
      this.sortingFlags.sortDate = true;
    }
  }

  sortImportant(): void {
    if (this.sortingFlags.sortImportant === true) {
      this.filteredTodos
        .sort((a, b) => {
          return a.isImportant - b.isImportant;
        })
        .reverse();
      this.sortingFlags.sortImportant = false;
    } else {
      this.filteredTodos.sort((a, b) => {
        return a.isImportant - b.isImportant;
      });
      this.sortingFlags.sortImportant = true;
    }
  }

  sortDone(): void {
    if (this.sortingFlags.sortDone === true) {
      this.filteredTodos
        .sort((a, b) => {
          return a.isCompleted - b.isCompleted;
        })
        .reverse();
      this.sortingFlags.sortDone = false;
    } else {
      this.filteredTodos.sort((a, b) => {
        return a.isCompleted - b.isCompleted;
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

  addTodo(title): void {
    console.log(title);

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
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe(
        (response) => {
          this.todoService.usersTodos.push({
            title: title,
            description: this.description,
            isImportant: this.important,
            isCompleted: this.completed,
            id: response.name,
            createdAt: new Date().toISOString(),
            userID: this.userId,
          });
        },
        (error) => {
          this.errorMessage = 'Adding todo failed';
          console.log(error);
        }
      );
  }

  onDelete(todo): void {
    this.filteredTodos = this.filteredTodos.filter(
      (item) => item.title !== todo.title
    );
    this.todoService
      .deleteTodo(todo.id)
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.errorMessage = 'Deleting failed';
          console.log(error);
        },
        () => (this.todoService.usersTodos = this.filteredTodos)
      );
  }

  onItemChecked(todo): void {
    this.todoService
      .updateTodo(todo)
      .pipe(takeUntil(this.componentDesteroyed$))
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.errorMessage = 'Updating failed';
          console.log(error);
        }
      );
  }

  performFilter(filterBy?): void {
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

  sortByName(arr): void {
    arr.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  sortByNameDesc(arr): void {
    arr.sort((a, b) => {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
  }

  sortNewest(arr): void {
    arr.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  }

  sortOldest(arr): void {
    arr.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }

  ngOnDestroy(): void {
    this.componentDesteroyed$.next();
    this.componentDesteroyed$.complete();
  }
}
