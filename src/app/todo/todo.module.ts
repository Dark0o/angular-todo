import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import {
  TodoListComponent,
  TodoInputComponent,
  TodoItemComponent,
  AddTodoComponent,
  SharedTodosListComponent,
  TodoDetailsComponent,
} from './index';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoInputComponent,
    TodoItemComponent,
    AddTodoComponent,
    SharedTodosListComponent,
    TodoDetailsComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
})
export class TodoModule {}
