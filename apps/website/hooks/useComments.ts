import { CreateCommentDto, GetCommentsListPayload } from '@newsfeed/data';
import {
  getCommentsWithLikesList,
  postComment,
} from '../services/comments-api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useAuthToken from './useAuthToken';

export function useGetComments(payload: GetCommentsListPayload) {
  return useQuery(['comments', payload.articleId, payload.orderBy], () =>
    getCommentsWithLikesList(payload)
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
