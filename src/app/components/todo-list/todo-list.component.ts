import { Component, OnInit } from '@angular/core';
import { isThisSecond } from 'date-fns';
import { Observable } from 'rxjs';
import { TodoDto } from 'src/app/model/todo';
import { UsersService } from 'src/app/services/users.service';
import { ToDoService } from '../../services/todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  todos;
  completed = false;
  date: string;
  important = false;
  description = '';
  public = false;
  toggleImp = false;
  toggleComplete = false;
  userId: string;
  loadingState: boolean = false;
  filteredTodos = [];
  isAscending: boolean = true;
  sortingFlags = {
    sortTitle: true,
    sortDate: true,
    sortImportant: true,
    sortDone: true,
  };
  errorMessage: string = null;

  private _filter;

  get filter() {
    return this._filter;
  }

  set filter(value) {
    this._filter = value;
    this.performFilter(this.filter);
  }

  get usersTodos() {
    return this.toDoService.usersTodos;
  }
  constructor(private toDoService: ToDoService) {
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
  }

  ngOnInit() {
    this.toDoService.getToDos(this.userId).subscribe(
      (todos) => {
        console.log(todos);
        //this.todos = todos;
        //this.usersToDos = todos.filter((todo) => todo.userID === this.userId);
        console.log(this.usersTodos.length);
        this.performFilter();
        if (this.usersTodos.length === 0) {
          this.errorMessage = 'An error occured!';
          console.log(this.errorMessage);
        }
      },
      (error) => {
        this.errorMessage = 'An error occured!';
        console.log(error);
      }
    );
    console.log(this.sortingFlags);
  }

  sortTitle() {
    if (this.sortingFlags.sortTitle === true) {
      this.sortByName(this.filteredTodos);
      this.sortingFlags.sortTitle = false;
    } else {
      this.sortByNameDesc(this.filteredTodos);
      this.sortingFlags.sortTitle = true;
    }
  }

  sortDate() {
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

  sortImportant() {
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

  sortDone() {
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

  toggleImportant() {
    this.toggleImp = !this.toggleImp;

    if (this.toggleImp === true) {
      this.filteredTodos = this.filteredTodos.filter(
        (todo) => todo.isImportant === true
      );
    } else {
      this.filteredTodos = this.usersTodos;
    }
  }

  toggleDone() {
    this.toggleComplete = !this.toggleComplete;

    if (this.toggleComplete === true) {
      this.filteredTodos = this.filteredTodos.filter(
        (todo) => todo.isCompleted === true
      );
    } else {
      this.filteredTodos = this.usersTodos;
    }
  }

  addToDo(title) {
    console.log(title);
    const todo: TodoDto = {
      title: title,
      description: this.description,
      isImportant: this.important,
      isCompleted: this.completed,
      isPublic: this.public,
      createdAt: new Date().toISOString(),
      userID: this.userId,
    };
    this.toDoService.addToDo(todo).subscribe((response) => {
      console.log(response);
      this.toDoService.usersTodos.push({
        title: title,
        description: this.description,
        isImportant: this.important,
        isCompleted: this.completed,
        id: response.name,
        createdAt: new Date().toISOString(),
        userID: this.userId,
      });
      console.log(this.toDoService.usersTodos);
    });

    //console.log(this.todos);
    console.log(this.filteredTodos);
    //console.log(this.toDoService.todos);
  }

  onDelete(todo) {
    console.log(todo);
    console.log('delete');
    this.filteredTodos = this.filteredTodos.filter(
      (item) => item.title !== todo.title
    );
    this.toDoService.deleteToDo(todo.id).subscribe();
    this.toDoService.usersTodos = this.filteredTodos;
  }

  onItemChecked(todo) {
    this.toDoService.updateToDo(todo).subscribe();
  }

  performFilter(filterBy?) {
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

  sortByName(arr) {
    arr.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  sortByNameDesc(arr) {
    arr.sort((a, b) => {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
  }

  sortNewest(arr) {
    arr.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  }

  sortOldest(arr) {
    arr.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }
}
