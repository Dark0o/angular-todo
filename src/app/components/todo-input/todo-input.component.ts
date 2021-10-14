import { Component, EventEmitter, Output } from '@angular/core';
import { ITodo } from 'src/app/shared/model/todo';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class ToDoInputComponent {
  todoTitle: string;
  @Output() onToDoAdded = new EventEmitter<string>();

  onAddToDo(todo: string) {
    this.onToDoAdded.emit(todo);
    this.todoTitle = '';
  }
}
