import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
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
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, RoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
