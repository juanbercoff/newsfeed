import { getAllCommentsLikes } from '../services/comment-likes-api';
import { useQuery } from 'react-query';

export function useGetCommentLikes() {
  return useQuery('commentLikes', getAllCommentsLikes);
}
