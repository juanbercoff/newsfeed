import { callApiService, getEndpoint } from './api-service-utilities';

import { ArticleHistoryDto } from '@newsfeed/data';

export async function getArticleHistory(
  articleId: string
): Promise<ArticleHistoryDto[]> {
  return callApiService<ArticleHistoryDto[]>({
    url: getEndpoint(`article-history/${articleId}`),
    method: 'GET',
  });
}
