import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuardService } from '../services/auth-service/auth-guard.service';
import { ToDoDetailsComponent } from '../components/todo-details/todo-details.component';
import { ToDoListComponent } from '../components/todo-list/todo-list.component';
import { AddToDoComponent } from '../components/add-todo/add-todo.component';
import { SharedTodosListComponent } from '../components/shared-todos-list/shared-todos-list.component';
import { UserProfileComponent } from '../components';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'todos',
    component: ToDoListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'todos/new',
    component: AddToDoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'todos/shared',
    component: SharedTodosListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'todos/:id',
    component: ToDoDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
