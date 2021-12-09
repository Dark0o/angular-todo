import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard';

import {
  TodoListComponent,
  AddTodoComponent,
  SharedTodosListComponent,
  TodoDetailsComponent,
} from './index';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: AddTodoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shared',
    component: SharedTodosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: TodoDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
