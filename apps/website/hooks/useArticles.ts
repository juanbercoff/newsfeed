import { useFetch } from './useFetch';
import {
  ArticleWithAuthorResponseDto,
  GetOneArticlePayload,
} from '@newsfeed/data';
import { getOneArticle, getArticlesList } from '../services/articles-api';

export function useGetArticles() {
  return useFetch<ArticleWithAuthorResponseDto[]>(getArticlesList, {});
}

export function useGetOneArticle(articleId: GetOneArticlePayload) {
  return useFetch<ArticleWithAuthorResponseDto, GetOneArticlePayload>(
    getOneArticle,
    articleId
  );
}
