import {
  callApiService,
  getEndpoint,
  getEndpointWithPagination,
} from './api-service-utilities';

import {
  GetOneArticlePayload,
  GetManyArticlesDto,
  ArticlesWithLikesResponseDto,
  CreateArticleDto,
} from '@newsfeed/data';
import { Article } from '@prisma/client';

export async function getArticlesList({
  cursor,
}: GetManyArticlesDto): Promise<ArticlesWithLikesResponseDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  const url = cursor
    ? getEndpointWithPagination('articles', cursor)
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

export async function getUserArticles(authToken: string): Promise<Article[]> {
  return callApiService<Article[]>(
    {
      url: getEndpoint('articles/user'),
      method: 'GET',
    },
    authToken
  );
}
