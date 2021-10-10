import { format } from 'date-fns';

export class DateFormatter {
  static formatDate(timestamp) {
    return format(new Date(timestamp), 'yyyy-MM-dd HH:mm');
  }
}
