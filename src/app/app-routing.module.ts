import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'todos',
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
