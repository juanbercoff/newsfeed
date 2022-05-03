import { CreateCommentDto, GetCommentsListPayload } from '@newsfeed/data';
import {
  getCommentsWithLikes,
  postComment,
  getCountOfComments,
} from '../services/comments-api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useAuthToken from './useAuthToken';

export function useGetComments<T>(payload: GetCommentsListPayload) {
  return useQuery(['comments', payload.articleId, payload.orderBy], () =>
    getCommentsWithLikes(payload)
  );
}

export function useCreateComment(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const { authToken } = useAuthToken();
  return useMutation((data: CreateCommentDto) => postComment(data, authToken), {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      toast.success('Comentario creado con éxito');
      onSuccess();
    },
  });
}

export function useGetCountOfComments(articleId: string) {
  return useQuery(['commentsCount', articleId], () =>
    getCountOfComments(articleId)
  );
}
