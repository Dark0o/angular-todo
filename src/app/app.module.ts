import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app/app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  TodoListComponent,
  TodoInputComponent,
  TodoItemComponent,
  LoginComponent,
  TodoDetailsComponent,
  NavigationComponent,
  AddTodoComponent,
  SharedTodosListComponent,
  UserProfileComponent,
} from './components/index';
import { DatePipe } from './shared/pipe/date.pipe';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoInputComponent,
    TodoItemComponent,
    LoginComponent,
    TodoDetailsComponent,
    NavigationComponent,
    AddTodoComponent,
    SharedTodosListComponent,
    UserProfileComponent,
    DatePipe,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
