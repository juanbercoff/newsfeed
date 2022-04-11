import {
  callApiService,
  getEndpoint,
  getEndpointWithPagination,
} from './api-service-utilities';

import {
  GetOneArticlePayload,
  GetManyArticlesDto,
  ArticlesWithLikesResponseDto,
} from '@newsfeed/data';

export async function getArticlesList({
  cursor,
}: GetManyArticlesDto): Promise<ArticlesWithLikesResponseDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<ArticlesWithLikesResponseDto[]>({
    url: getEndpointWithPagination('articles', cursor),
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

export async function getOneArticleStatic(
  payload: GetOneArticlePayload
): Promise<ArticlesWithLikesResponseDto> {
  return callApiService<ArticlesWithLikesResponseDto>({
    url: getEndpoint(`articles/static/${payload.id}`),
    method: 'GET',
  });
}
