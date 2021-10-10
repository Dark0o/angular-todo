import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormatter } from 'src/app/date-formatter';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class ToDoItemComponent implements OnInit {
  @Input() todoItem;
  @Output() itemDeleted = new EventEmitter();
  @Output() itemChecked = new EventEmitter();
  date;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.date = DateFormatter.formatDate(this.todoItem.createdAt);
  }

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
