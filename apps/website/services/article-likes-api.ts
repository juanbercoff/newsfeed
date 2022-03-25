import { callApiService, getEndpoint } from './api-service-utilities';

import { AllArticlesLikesDto } from '@newsfeed/data';

export async function getAllArticlesLikes(): Promise<AllArticlesLikesDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<AllArticlesLikesDto[]>({
    url: getEndpoint('article-likes/likes-count/all'),
    method: 'GET',
  });
}
