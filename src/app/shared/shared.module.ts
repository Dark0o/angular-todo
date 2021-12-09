import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';

import { CustomDatePipe } from './pipe/date.pipe';
import { NavigationComponent } from './navigation/navigation.component';
import { FocusDirective } from './focus.directive';
import { NotFoundComponent } from './page-not-found/not-found/not-found.component';
import { PermissionDeniedComponent } from './permission-denied/permission-denied/permission-denied.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'permission-denied',
    component: PermissionDeniedComponent,
  },
];
@NgModule({
  declarations: [
    CustomDatePipe,
    NavigationComponent,
    FocusDirective,
    NotFoundComponent,
    PermissionDeniedComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule, RouterModule],
  exports: [
    MaterialModule,
    NavigationComponent,
    CustomDatePipe,
    CommonModule,
    FocusDirective,
  ],
})
export class SharedModule {}
