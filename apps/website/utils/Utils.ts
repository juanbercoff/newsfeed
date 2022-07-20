import { DateTime } from 'luxon';
import DOMPurify from 'dompurify';

export default class Utils {
  static formatDateTimeRelative(date: Date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
  }

  static formatDateRelative(date: Date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
  }

  static parseHtml(html: string) {
    return DOMPurify.sanitize(html, { FORBID_ATTR: ['style'] });
  }

  static handleError(error: unknown) {
    const errorMessage: string = (error as any)['message'];
    return errorMessage ?? 'Ha ocurrido un error';
  }
}
