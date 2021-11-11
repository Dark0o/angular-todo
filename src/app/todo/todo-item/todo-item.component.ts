import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todoItem: Todo;
  @Output() itemDeleted = new EventEmitter();
  @Output() itemChecked = new EventEmitter();

  constructor(private router: Router) {}

  onItemDeleted(todo: Todo): void {
    this.itemDeleted.emit(todo);
  }

  toggleCheckbox(todo: Todo): void {
    todo.isCompleted = !todo.isCompleted;

    this.itemChecked.emit(todo);
  }

  openToDoDetails(todo: Todo): void {
    this.router.navigate([`todos/${todo.id}`], {
      state: this.todoItem,
    });
  }
}
