import { DateTime } from 'luxon';

export default class Utils {
  static formatDateRelative(date: Date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
  }
}
