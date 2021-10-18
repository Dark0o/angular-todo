import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app/app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  ToDoListComponent,
  ToDoInputComponent,
  ToDoItemComponent,
  LoginComponent,
  ToDoDetailsComponent,
  NavigationComponent,
  AddToDoComponent,
  SharedTodosListComponent,
  UserProfileComponent,
} from './components/index';
import { DatePipe } from './shared/pipe/date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoInputComponent,
    ToDoItemComponent,
    LoginComponent,
    ToDoDetailsComponent,
    NavigationComponent,
    AddToDoComponent,
    SharedTodosListComponent,
    UserProfileComponent,
    DatePipe,
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
