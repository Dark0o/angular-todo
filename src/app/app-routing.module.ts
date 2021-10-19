import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-service/auth-guard.service';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { SharedTodosListComponent } from './components/shared-todos-list/shared-todos-list.component';
import { UserProfileComponent } from './components';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'todos',
    component: TodoListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'todos/new',
    component: AddTodoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'todos/shared',
    component: SharedTodosListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'todos/:id',
    component: TodoDetailsComponent,
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
export class AppRoutingModule {}
