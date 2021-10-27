import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

import { CustomDatePipe } from './pipe/date.pipe';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [CustomDatePipe, NavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [MaterialModule, NavigationComponent, CustomDatePipe, CommonModule],
})
export class SharedModule {}
