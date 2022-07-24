import {
  getAllCommentsLikes,
  getUserCommentLike,
  postCommentLike,
  updateCommentLike,
  deleteCommentLike,
} from '../services/comment-likes-api';
import { useQuery, useQueryClient, useMutation } from 'react-query';

export function useGetCommentLikes() {
  return useQuery('commentLikes', getAllCommentsLikes);
}

export function useGetCommentIsLiked(commentId: string, authToken: string) {
  return useQuery(
    ['commentLikes', commentId, authToken],
    () => getUserCommentLike(commentId, authToken),
    {
      enabled: !!authToken,
    }
  );
}

export function useCreateCommentLike() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      like,
      commentId,
      authToken,
    }: {
      like: boolean;
      commentId: string;
      authToken: string;
    }) => postCommentLike({ id: commentId, like }, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('commentLikes');
        queryClient.invalidateQueries('comments');
      },
    }
  );
}

export function useUpdateCommentLike() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      like,
      commentLikeId,
      authToken,
    }: {
      like: boolean;
      commentLikeId: string;
      authToken: string;
    }) => updateCommentLike({ like, commentLikeId }, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('commentLikes');
        queryClient.invalidateQueries('comments');
      },
    }
  );
}

export function useDeleteCommentLike() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      commentLikeId,
      authToken,
    }: {
      commentLikeId: string;
      authToken: string;
    }) => deleteCommentLike(commentLikeId, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('commentLikes');
        queryClient.invalidateQueries('comments');
      },
    }
  );
}
