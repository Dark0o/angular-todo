import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './auth/auth-service/auth-guard.service';
import { TodoDetailsComponent } from './todo/todo-details/todo-details.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { SharedTodosListComponent } from './todo/shared-todos-list/shared-todos-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignupComponent } from './auth/signup/signup.component';

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
