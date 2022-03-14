import { callApiService, getEndpoint } from './api-service-utilities';

import { CommentWithClosureDto } from '@newsfeed/data';

export async function getCommentsList(): Promise<CommentWithClosureDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<CommentWithClosureDto[]>({
    url: getEndpoint('comments'),
    method: 'GET',
  });
}
