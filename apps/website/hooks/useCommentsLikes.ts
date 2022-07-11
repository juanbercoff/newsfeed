import {
  getAllCommentsLikes,
  getUserCommentLike,
} from '../services/comment-likes-api';
import { useQuery } from 'react-query';

export function useGetCommentLikes() {
  return useQuery('commentLikes', getAllCommentsLikes);
}

export function useGetCommentIsLiked(commentId: string, authToken: string) {
  return useQuery(
    ['commentLikesUserLiked', commentId],
    () => getUserCommentLike(commentId, authToken),
    {
      enabled: !!authToken,
    }
  );
}
