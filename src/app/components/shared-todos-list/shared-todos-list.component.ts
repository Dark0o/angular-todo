import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/todo.service';
import { UsersService } from 'src/app/services/users.service';
import { DateFormatter } from 'src/app/date-formatter';

@Component({
  selector: 'app-shared-todos-list',
  templateUrl: './shared-todos-list.component.html',
  styleUrls: ['./shared-todos-list.component.scss'],
})
export class SharedTodosListComponent implements OnInit {
  todo;
  sharedTodos = [];
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'fullName'];

  constructor(private todosService: ToDoService, private usersService: UsersService) {}

  ngOnInit(): void {
    if (this.usersService.users.length === 0) {
      this.usersService.getSignedUpUsers().subscribe((users) => {
        this.usersService.users = users;
      });
    }
    this.todosService.getToDos().subscribe((todos) => {
      this.sharedTodos = todos.filter((todo) => todo.isPublic === true);
      this.sharedTodos.map((todo) => {
        let foundUser = this.usersService.users.find((user) => user.id === todo.userID);
        if (foundUser.fullName) {
          todo.fullName = foundUser.fullName;
        }
        todo.createdAt = DateFormatter.formatDate(todo.createdAt);
        return todo;
      });
      console.log(this.sharedTodos);
    });
  }
}
