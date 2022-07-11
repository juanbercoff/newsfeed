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

export function useGetAllArticlesLikes(initialData: AllArticlesLikesDto[]) {
  return useQuery(['articleLikes'], () => getAllArticlesLikes(), {
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

export function useGetArticleIsLiked(articleId: string, authToken: string) {
  return useQuery(
    ['articleLikes', articleId, authToken],
    () => getUserArticleLike(articleId, authToken),
    {
      enabled: !!authToken,
    }
  );
}

export function useCreateArticleLike() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      like,
      articleId,
      authToken,
    }: {
      like: boolean;
      articleId: string;
      authToken: string;
    }) => postArticleLike({ id: articleId, like }, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articleLikes');
      },
    }
  );
}

export function useUpdateArticleLike() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      like,
      articleLikeId,
      authToken,
    }: {
      like: boolean;
      articleLikeId: string;
      authToken: string;
    }) => updateArticleLike({ like, articleLikeId }, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articleLikes');
      },
    }
  );
}

export function useDeleteArticleLike() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      articleLikeId,
      authToken,
    }: {
      articleLikeId: string;
      authToken: string;
    }) => deleteArticleLike(articleLikeId, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['articleLikes']);
        queryClient.refetchQueries('articles');
      },
    }
  );
}
