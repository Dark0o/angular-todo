import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todoItem;
  @Output() itemDeleted = new EventEmitter();
  @Output() itemChecked = new EventEmitter();

  constructor(private router: Router) {}

  onItemDeleted(todo): void {
    this.itemDeleted.emit(todo);
  }

  toggleCheckbox(todo): void {
    todo.isCompleted = !todo.isCompleted;

    this.itemChecked.emit(todo);
  }

  openToDoDetails(todo): void {
    this.router.navigate([`todos/${todo.id}`], {
      state: this.todoItem,
    });
  }
}
