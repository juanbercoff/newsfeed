import { callApiService, getEndpoint } from './api-service-utilities';

import { CreateArticleVisitDto } from '@newsfeed/data';
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
