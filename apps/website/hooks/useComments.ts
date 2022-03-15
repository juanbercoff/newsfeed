import { useFetch } from './useFetch';
import { CommentWithAuthorDto, GetCommentsListPayload } from '@newsfeed/data';
import { getCommentsList } from '../services/comments-api';

export function useGetComments(articleId: GetCommentsListPayload) {
  return useFetch<CommentWithAuthorDto[], GetCommentsListPayload>(
    getCommentsList,
    articleId
  );
}
