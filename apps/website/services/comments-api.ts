import { callApiService, getEndpoint } from './api-service-utilities';

import {
  CommentWithAuthorDto,
  CreateCommentDto,
  GetCommentsListPayload,
} from '@newsfeed/data';
import { Comment } from '@prisma/client';

export async function getCommentsList({
  articleId,
}: GetCommentsListPayload): Promise<CommentWithAuthorDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<CommentWithAuthorDto[]>({
    url: getEndpoint(`comments/${articleId}`),
    method: 'GET',
  });
}

export async function postComment(data: CreateCommentDto, authToken: string) {
  return callApiService<Comment>(
    {
      url: getEndpoint('comments'),
      method: 'POST',
      data,
    },
    authToken
  );
}
