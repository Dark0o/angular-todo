import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-service/auth-guard.service';

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
    canActivate: [AuthGuardService],
  },
  {
    path: 'new',
    component: AddTodoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'shared',
    component: SharedTodosListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':id',
    component: TodoDetailsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
