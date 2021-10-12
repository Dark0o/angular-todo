import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDto, ITodo } from 'src/app/model/todo';
import { ToDoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddToDoComponent implements OnInit {
  title: string;
  description: string;
  important: boolean = false;
  completed: boolean = false;
  public: boolean = false;
  userId: string;
  addingNewTodoStatus: string;

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

    this.todoService.addTodo(todo).subscribe((data) => {
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
}
