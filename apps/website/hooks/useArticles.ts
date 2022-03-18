import { useFetch } from './useFetch';
import { ArticleResponseDto, GetOneArticlePayload } from '@newsfeed/data';
import { getOneArticle, getArticlesList } from '../services/articles-api';

export function useGetArticles() {
  return useFetch<ArticleResponseDto[]>(getArticlesList, {});
}

export function useGetOneArticle(articleId: GetOneArticlePayload) {
  return useFetch<ArticleResponseDto, GetOneArticlePayload>(
    getOneArticle,
    articleId
  );
}
