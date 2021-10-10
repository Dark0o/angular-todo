import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

const MaterialModules = [MatTableModule];
@NgModule({
  imports: [...MaterialModules],
  exports: [...MaterialModules],
})
export class MaterialModule {}
