import { format } from 'date-fns';

export class DateFormatter {
  static formatDate(date) {
    return format(new Date(date), 'dd/MM/yyyy @ HH:mm');
  }
}
