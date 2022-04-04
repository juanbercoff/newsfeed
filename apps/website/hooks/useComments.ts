import { GetCommentsListPayload, CreateCommentDto } from '@newsfeed/data';
import { getCommentsList, postComment } from '../services/comments-api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useAuthToken from './useAuthToken';

export function useGetComments(articleId: GetCommentsListPayload) {
  return useQuery(['comments', articleId], () => getCommentsList(articleId));
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
