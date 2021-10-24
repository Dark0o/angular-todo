import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

import { DatePipe } from './pipe/date.pipe';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [DatePipe, NavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, MaterialModule, NavigationComponent, DatePipe],
})
export class SharedModule {}
