import { callApiService, getEndpoint } from './api-service-utilities';

import { GetOneArticlePayload, ArticleResponseDto } from '@newsfeed/data';

export async function getArticlesList(): Promise<ArticleResponseDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<ArticleResponseDto[]>({
    url: getEndpoint('articles'),
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
