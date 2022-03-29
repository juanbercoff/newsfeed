import { useFetch } from './useFetch';
import { AllCommentsLikesDto } from '@newsfeed/data';
import { getAllCommentsLikes } from '../services/comment-likes-api';

export function useGetCommentLikes() {
  return useFetch<AllCommentsLikesDto[]>(getAllCommentsLikes, {});
}
