import {
  callApiService,
  getEndpoint,
  getEndpointWithPagination,
} from './api-service-utilities';

import {
  GetOneArticlePayload,
  ArticlesWithLikesResponseDto,
  CreateArticleDto,
  UpdateArticleDto,
  GetArticlesPayload,
  UserArticles,
} from '@newsfeed/data';
import { Article } from '@prisma/client';

export async function getArticlesList({
  cursor,
  tags,
}: GetArticlesPayload): Promise<ArticlesWithLikesResponseDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  const url =
    cursor || tags
      ? getEndpointWithPagination('articles', cursor, tags)
      : getEndpoint('articles');
  return callApiService<ArticlesWithLikesResponseDto[]>({
    url,
    method: 'GET',
  });
}

export async function getOneArticle(
  payload: GetOneArticlePayload
): Promise<ArticlesWithLikesResponseDto> {
  return callApiService<ArticlesWithLikesResponseDto>({
    url: getEndpoint(`articles/${payload.id}`),
    method: 'GET',
  });
}

export async function createArticle(
  data: CreateArticleDto,
  authToken: string
): Promise<Article> {
  return callApiService<Article>(
    {
      url: getEndpoint('articles'),
      method: 'POST',
      data,
    },
    authToken
  );
}

export async function getUserArticles(
  authToken: string
): Promise<UserArticles[]> {
  return callApiService<UserArticles[]>(
    {
      url: getEndpoint('articles/user'),
      method: 'GET',
    },
    authToken
  );
}

export async function updateArticle(
  articleId: string,
  data: UpdateArticleDto,
  authToken: string
): Promise<Article> {
  return callApiService<Article>(
    {
      url: getEndpoint(`articles/${articleId}`),
      method: 'PATCH',
      data,
    },
    authToken
  );
}

export async function deleteArticle(
  articleId: string,
  authToken: string
): Promise<Article> {
  return callApiService<Article>(
    {
      url: getEndpoint(`articles/${articleId}`),
      method: 'DELETE',
    },
    authToken
  );
}
