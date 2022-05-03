import { callApiService, getEndpoint } from './api-service-utilities';

import { CreateArticleVisitDto, ArticleVisitDto } from '@newsfeed/data';
import { ArticleVisit } from '@prisma/client';

export async function postArticleVisit(
  data: CreateArticleVisitDto
): Promise<ArticleVisit> {
  return callApiService({
    url: getEndpoint('article-visit'),
    method: 'POST',
    data,
  });
}

export async function getArticleVisits(
  articleId: string
): Promise<ArticleVisitDto[]> {
  return callApiService({
    url: getEndpoint(`article-visit/${articleId}`),
    method: 'GET',
  });
}
