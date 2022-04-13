import {
  GetOneArticlePayload,
  ArticlesWithLikesResponseDto,
} from '@newsfeed/data';
import { getOneArticle, getArticlesList } from '../services/articles-api';
import { useQuery, useInfiniteQuery } from 'react-query';

export function useGetArticles(initialData: ArticlesWithLikesResponseDto[]) {
  return useInfiniteQuery(
    'articles',
    ({ pageParam = '' }) => getArticlesList({ cursor: pageParam }),
    {
      getNextPageParam: (lastPage) =>
        lastPage[lastPage.length - 1]?.id ?? undefined,
      refetchOnMount: false,
      initialData: {
        pages: [initialData],
        pageParams: [''],
      },
    }
  );
}

export function useGetOneArticle(
  articleId: GetOneArticlePayload,
  initialData: ArticlesWithLikesResponseDto
) {
  return useQuery(['article', articleId], () => getOneArticle(articleId), {
    initialData,
  });
}
