import {
  CreateCommentDto,
  GetCommentsListPayload,
  ArticlesWithLikesResponseDto,
  ArticleHistoryDto,
} from '@newsfeed/data';
import {
  getCommentsOfArticle,
  getCommentsOfArticleHistory,
  postComment,
  getCountOfComments,
} from '../services/comments-api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useAuthToken from './useAuthToken';

export function useGetComments(
  payload: GetCommentsListPayload,
  articleType: ArticlesWithLikesResponseDto | ArticleHistoryDto
) {
  const queryFunction =
    'comments' in articleType
      ? getCommentsOfArticleHistory
      : getCommentsOfArticle;
  return useQuery(['comments', payload.id, payload.orderBy], () =>
    queryFunction(payload)
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
  return useQuery(['comments', articleId], () => getCountOfComments(articleId));
}
