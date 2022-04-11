import {
  GetOneArticlePayload,
  ArticlesWithLikesResponseDto,
} from '@newsfeed/data';
import { getOneArticle, getArticlesList } from '../services/articles-api';
import { useQuery, useInfiniteQuery } from 'react-query';

export function useGetArticles() {
  return useInfiniteQuery(
    'articles',
    ({ pageParam = '' }) => getArticlesList({ cursor: pageParam }),
    {
      getNextPageParam: (lastPage) =>
        lastPage[lastPage.length - 1]?.id ?? undefined,
    }
  );

  /*   return useQuery(['articles'], () => getArticlesList(), {
    initialData,
  }); */
}

export function useGetOneArticle(
  articleId: GetOneArticlePayload,
  initialData: ArticlesWithLikesResponseDto
) {
  return useQuery(['article', articleId], () => getOneArticle(articleId), {
    initialData,
  });
}
