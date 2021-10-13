import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class ToDoItemComponent {
  @Input() todoItem;
  @Output() itemDeleted = new EventEmitter();
  @Output() itemChecked = new EventEmitter();

  constructor(private router: Router) {}

  onItemDeleted(todo) {
    this.itemDeleted.emit(todo);
  }

  toggleCheckbox(todo) {
    todo.isCompleted = !todo.isCompleted;

    this.itemChecked.emit(todo);
  }

  openToDoDetails(todo) {
    this.router.navigate([`todos/${todo.id}`], {
      state: this.todoItem,
    });
  }
}
