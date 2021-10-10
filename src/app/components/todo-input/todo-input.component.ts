import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class ToDoInputComponent {
  todo;
  @Output() onToDoAdded = new EventEmitter<string>();

  onAddToDo(todo) {
    this.onToDoAdded.emit(todo);
    this.todo = '';
  }
}
