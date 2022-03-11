import { callApiService, getEndpoint } from './api-service-utilities';

import {
  GetOneArticlePayload,
  ArticleWithAuthorResponseDto,
} from '@newsfeed/data';

export async function getArticlesList(): Promise<
  ArticleWithAuthorResponseDto[]
> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<ArticleWithAuthorResponseDto[]>({
    url: getEndpoint('articles'),
    method: 'GET',
  });
}

export async function getOneArticle(
  payload: GetOneArticlePayload
): Promise<ArticleWithAuthorResponseDto> {
  return callApiService<ArticleWithAuthorResponseDto>({
    url: getEndpoint(`articles/${payload.id}`),
    method: 'GET',
  });
}
