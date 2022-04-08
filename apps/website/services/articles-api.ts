import {
  callApiService,
  getEndpoint,
  getEndpointWithPagination,
} from './api-service-utilities';

import {
  GetOneArticlePayload,
  ArticleResponseDto,
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
): Promise<ArticleResponseDto> {
  return callApiService<ArticleResponseDto>({
    url: getEndpoint(`articles/${payload.id}`),
    method: 'GET',
  });
}
