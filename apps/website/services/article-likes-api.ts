import { callApiService, getEndpoint } from './api-service-utilities';

import { AllArticlesLikesDto } from '@newsfeed/data';
import { Article, ArticleLike } from '@prisma/client';

export async function getAllArticlesLikes(): Promise<AllArticlesLikesDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<AllArticlesLikesDto[]>({
    url: getEndpoint('article-likes/likes-count/all'),
    method: 'GET',
  });
}

export async function postArticleLike(
  {
    id,
    like,
  }: {
    id: string;
    like: boolean;
  },
  authToken: string
): Promise<ArticleLike> {
  return callApiService(
    {
      url: getEndpoint('article-likes'),
      method: 'POST',
      data: {
        articleId: id,
        like,
      },
    },
    authToken
  );
}

export async function deleteArticleLike(
  articleLikeId: string,
  authToken: string
): Promise<ArticleLike> {
  return callApiService(
    {
      url: getEndpoint(`article-likes/${articleLikeId}`),
      method: 'DELETE',
    },
    authToken
  );
}

export async function getUserArticleLike(
  articleId: string,
  authToken: string
): Promise<ArticleLike | null> {
  return callApiService(
    {
      url: getEndpoint(`article-likes/${articleId}`),
      method: 'GET',
    },
    authToken
  );
}
