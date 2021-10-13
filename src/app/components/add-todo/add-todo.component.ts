import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoDto, ITodo } from 'src/app/shared/model/todo';
import { ToDoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddToDoComponent implements OnInit, OnDestroy {
  title: string;
  description: string;
  important: boolean = false;
  completed: boolean = false;
  public: boolean = false;
  userId: string;
  addingNewTodoStatus: string;
  sub: Subscription;

  constructor(private todoService: ToDoService, private router: Router) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
  }

  addNewTodo() {
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

    this.sub = this.todoService.addTodo(todo).subscribe((data) => {
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
    });

    setTimeout(() => {
      this.router.navigate(['todos']);
    }, 3000);
  }

  markImportant() {
    this.important = !this.important;
  }
  markPublic() {
    this.public = !this.public;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
