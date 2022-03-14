import { useFetch } from './useFetch';
import { CommentWithClosureDto } from '@newsfeed/data';
import { getCommentsList } from '../services/comments-api';

export function useGetComments() {
  return useFetch<CommentWithClosureDto[]>(getCommentsList, {});
}
