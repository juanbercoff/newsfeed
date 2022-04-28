import { DateTime } from 'luxon';

export default class Utils {
  static formatDateTimeRelative(date: Date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
  }

  static formatDateRelative(date: Date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
  }
}
