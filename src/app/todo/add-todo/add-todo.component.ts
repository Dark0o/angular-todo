import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TodoDto, ITodo } from '../todo';
import { ToDoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit, OnDestroy {
  title: string;
  description: string;
  important: boolean = false;
  completed: boolean = false;
  public: boolean = false;
  userId: string;
  addingNewTodoStatus: string;
  errorMessage: string;
  private isDestroyed$ = new Subject();

  constructor(private todoService: ToDoService, private router: Router) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
  }

  addNewTodo(): void {
    const todo: TodoDto = {
      title: this.title,
      description: this.description,
      isImportant: this.important,
      isCompleted: this.completed,
      isPublic: this.public,
      createdAt: new Date().toISOString(),
      userID: this.userId,
    };

    this.addingNewTodoStatus = 'Adding...';

    this.todoService
      .addTodo(todo)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (data) => {
          this.todoService.usersTodos.push({
            id: data.name,
            title: this.title,
            description: this.description,
            isImportant: this.important,
            isCompleted: this.completed,
            isPublic: this.public,
            createdAt: new Date().toISOString(),
            userID: this.userId,
          });

          this.addingNewTodoStatus = 'Added!';
        },
        (error) => {
          this.errorMessage = 'Adding todo failed';
          console.log(error);
        }
      );

    setTimeout(() => {
      this.router.navigate(['todos']);
    }, 3000);
  }

  markImportant(): void {
    this.important = !this.important;
  }
  markPublic(): void {
    this.public = !this.public;
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
