import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

import { CustomDatePipe } from './pipe/date.pipe';
import { NavigationComponent } from './navigation/navigation.component';
import { FocusDirective } from './focus.directive';

@NgModule({
  declarations: [CustomDatePipe, NavigationComponent, FocusDirective],
  imports: [CommonModule, RouterModule],
  exports: [
    MaterialModule,
    NavigationComponent,
    CustomDatePipe,
    CommonModule,
    FocusDirective,
  ],
})
export class SharedModule {}
