import { Component, EventEmitter, Output } from '@angular/core';
import { ITodo } from '../todo';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  todoTitle: string;
  @Output() onToDoAdded = new EventEmitter<string>();

  onAddToDo(todo: string) {
    this.onToDoAdded.emit(todo);
    this.todoTitle = '';
  }
}