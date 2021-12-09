import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../shared/guards/auth-guard';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
    ]),
    CommonModule,
    SharedModule,
  ],
})
export class UserModule {}
