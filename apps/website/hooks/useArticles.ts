import { ArticleResponseDto, GetOneArticlePayload } from '@newsfeed/data';
import { getOneArticle, getArticlesList } from '../services/articles-api';
import { useQuery } from 'react-query';

export function useGetArticles(initialData: ArticleResponseDto[]) {
  return useQuery(['articles'], () => getArticlesList(), {
    initialData,
  });
}

export function useGetOneArticle(
  articleId: GetOneArticlePayload,
  initialData: ArticleResponseDto
) {
  return useQuery(['article', articleId], () => getOneArticle(articleId), {
    initialData,
  });
}
