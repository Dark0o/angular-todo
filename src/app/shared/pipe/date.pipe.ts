import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(date: string): string {
    return format(new Date(date), 'dd/MM/yyyy @ HH:mm');
  }
}
