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
    const parsedHtml = DOMPurify.sanitize(html, { FORBID_ATTR: ['style'] });
    const removeRegexP = /<p><\/p>/g;
    return parsedHtml.replace(removeRegexP, '<br>');
  }
}
