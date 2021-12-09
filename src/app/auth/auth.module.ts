import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LogInGuard } from '../shared/guards/log-in.guard';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogInGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LogInGuard],
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class AuthModule {}
