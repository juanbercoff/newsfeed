import { DateTime } from 'luxon';
import DOMPurify from 'dompurify';
import { CreateOrUpdateLikesEntityPayload } from '@newsfeed/data';

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

  static handleLike<
    TCreatePayload extends CreateOrUpdateLikesEntityPayload,
    TUpdatePayload extends CreateOrUpdateLikesEntityPayload,
    TDeletePayload extends { authToken: string },
    TEntity extends { like?: number }
  >(
    like: boolean,
    entityLiked: TEntity | undefined,
    authToken: string | null,
    url: string,
    createLike: (createPayload: TCreatePayload) => void,
    updateLike: (updatePayload: TUpdatePayload) => void,
    deleteLike: (deletePayload: TDeletePayload) => void,
    push: (url: string) => Promise<boolean>,
    createPayload: TCreatePayload,
    updatePayload: TUpdatePayload,
    deletePayload: TDeletePayload
  ) {
    if (!authToken) return push(url);
    const likeValue = like ? 1 : -1;
    if (entityLiked) {
      if (entityLiked?.like === likeValue) {
        deleteLike(deletePayload);
      } else {
        updateLike(updatePayload);
      }
    } else {
      createLike(createPayload);
    }
  }
  static falsyStorageTransformer(value: string, returnValue: null | '') {
    return value === 'null' || value === 'undefined' ? returnValue : value;
  }
}
