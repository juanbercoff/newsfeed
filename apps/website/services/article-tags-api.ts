import { callApiService, getEndpoint } from './api-service-utilities';

import { CreateArticleTagDto } from '@newsfeed/data';
import { ArticleTag } from '@prisma/client';

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
