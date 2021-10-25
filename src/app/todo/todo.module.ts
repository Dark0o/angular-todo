import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';

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
  imports: [FormsModule, SharedModule, TodoRoutingModule],
})
export class TodoModule {}
