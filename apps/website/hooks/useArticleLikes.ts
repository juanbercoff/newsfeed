import { AllArticlesLikesDto } from '@newsfeed/data';
import {
  getAllArticlesLikes,
  getUserArticleLike,
  deleteArticleLike,
  postArticleLike,
  updateArticleLike,
  getArticleLikesCount,
} from '../services/article-likes-api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAuthToken from '../hooks/useAuthToken';

export function useGetAllArticlesLikes(initialData: AllArticlesLikesDto[]) {
  return useQuery(['articleLikesAll'], () => getAllArticlesLikes(), {
    initialData,
  });
}

export function useGetArticlesLikesCount(articleId: string) {
  return useQuery(
    ['articleLikes', articleId],
    () => getArticleLikesCount(articleId),
    {}
  );
}

export function useGetArticleIsLiked(articleId: string) {
  const { authToken } = useAuthToken();
  return useQuery(
    ['articleLikesUserLiked', articleId],
    () => getUserArticleLike(articleId, authToken),
    {
      enabled: !!authToken,
    }
  );
}

export async function useCreateArticleLike(articleId: string) {
  const { authToken } = useAuthToken();
  return useMutation((like: boolean) =>
    postArticleLike({ id: articleId, like }, authToken)
  );
}

export async function useUpdateArticleLike(
  articleId: string,
  articleLikeId: string
) {
  const { authToken } = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation(
    (like: boolean) =>
      updateArticleLike({ articleId, like, articleLikeId }, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articleLikes');
      },
    }
  );
}

export async function useDeleteArticleLike(articleLikeId: string) {
  const { authToken } = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation(() => deleteArticleLike(articleLikeId, authToken), {
    onSuccess: () => {
      queryClient.invalidateQueries('articleLikes');
    },
  });
}
