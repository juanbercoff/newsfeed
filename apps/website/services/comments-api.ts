import { callApiService, getEndpoint } from './api-service-utilities';

import { CommentWithAuthorDto, GetCommentsListPayload } from '@newsfeed/data';

export async function getCommentsList({
  articleId,
}: GetCommentsListPayload): Promise<CommentWithAuthorDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<CommentWithAuthorDto[]>({
    url: getEndpoint(`comments/${articleId}`),
    method: 'GET',
  });
}
