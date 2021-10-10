import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  addingNewToDoStatus: string;

  constructor(private todoService: ToDoService, private router: Router) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {}

  addNewToDo() {
    this.addingNewToDoStatus = 'Adding...';
    this.todoService
      .addToDo({
        id: null,
        title: this.title,
        description: this.description,
        isImportant: this.important,
        isCompleted: this.completed,
        isPublic: this.public,
        createdAt: Date.now(),
        userID: this.userId,
      })
      .subscribe((data) => {
        this.todoService.usersTodos.push({
          id: data.name,
          title: this.title,
          description: this.description,
          isImportant: this.important,
          isCompleted: this.completed,
          isPublic: this.public,
          createdAt: Date.now(),
          userID: this.userId,
        });
        this.addingNewToDoStatus = 'Added!';
      });
    setTimeout(() => {
      this.router.navigate(['todos']);
    }, 3000);
  }

  markImportant() {
    this.important = !this.important;
    console.log(this.important);
  }
  markPublic() {
    this.public = !this.public;
  }
}
