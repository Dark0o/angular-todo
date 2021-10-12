import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatter } from 'src/app/date-formatter';
import { ITodo } from 'src/app/model/todo';
import { ToDoService } from 'src/app/services/todo.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-to-do-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class ToDoDetailsComponent implements OnInit {
  todo;
  date: string;
  showEdit: boolean = false;
  editStatus: string;
  deleteStatus: string;
  userId: string;
  usersName: string;

  constructor(
    private router: Router,
    private todoService: ToDoService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.todo = this.router.getCurrentNavigation().extras.state;
    this.userId = localStorage.getItem('userId');
    console.log(this.todo);
  }

  ngOnInit(): void {
    if (this.todo) {
      this.date = DateFormatter.formatDate(this.todo.createdAt);
    } else {
      this.todoService
        .getTodoById(this.route.snapshot.params.id)
        .subscribe((todo) => {
          this.todo = todo;
          this.date = DateFormatter.formatDate(this.todo.createdAt);
        });
    }
    this.usersService.getUserById(this.userId).subscribe((user) => {
      this.usersName = user.fullName;
    });
  }

  navigateBack() {
    this.router.navigate(['todos']);
  }

  deleteTodo() {
    this.deleteStatus = 'Deleting...';
    this.todoService.usersTodos = this.todoService.usersTodos.filter(
      (todo) => todo.id !== this.todo.id
    );
    this.todoService.deleteTodo(this.todo.id).subscribe(() => {
      this.deleteStatus = 'ToDo Deleted!';
      setTimeout(() => {
        this.router.navigate(['todos']);
      }, 3000);
    });
  }

  markImportant() {
    this.todo.isImportant = !this.todo.isImportant;
  }

  markDone() {
    this.todo.isCompleted = !this.todo.isCompleted;
  }
  markPublic() {
    this.todo.isPublic = !this.todo.isPublic;
  }

  edit() {
    this.editStatus = 'Editing...';
    this.todoService.updateTodo(this.todo).subscribe(() => {
      this.editStatus = 'Edited!';
      setInterval(() => {
        this.showEdit = false;
        this.editStatus = undefined;
      }, 3000);
    });
    this.showEdit = false;
    console.log('saved');
  }

  onEdit() {
    this.showEdit = true;
  }

  cancelEditing() {
    this.showEdit = false;
  }
}
