import { callApiService, getEndpoint } from './api-service-utilities';

import { CreateArticleTagDto, ArticleTag } from '@newsfeed/data';

export async function tagArticle(
  { articleId }: CreateArticleTagDto,
  authToken: string
): Promise<ArticleTag> {
  return callApiService(
    {
      url: getEndpoint('article-tags'),
      method: 'POST',
      data: {
        articleId,
      },
    },
    authToken
  );
}
