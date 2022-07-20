import {
  CreateCommentDto,
  GetCommentsListPayload,
  ArticleResponseDto,
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
import Utils from '../utils/Utils';

export function useGetComments(
  payload: GetCommentsListPayload,
  articleType: ArticleResponseDto | ArticleHistoryDto
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
  return useMutation(
    ({ data, authToken }: { data: CreateCommentDto; authToken: string }) =>
      postComment(data, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
        toast.success('Comentario creado con éxito');
        onSuccess();
      },
      onError: (error) => {
        toast.error(Utils.handleError(error));
      },
    }
  );
}

export function useGetCountOfComments(articleId: string) {
  return useQuery(['comments', articleId], () => getCountOfComments(articleId));
}
