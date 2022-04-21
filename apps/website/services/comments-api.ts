import { callApiService, getEndpoint } from './api-service-utilities';

import {
  CreateCommentDto,
  GetCommentsListPayload,
  CommentWithAuthorAndLikes,
} from '@newsfeed/data';
import { Comment } from '@prisma/client';

export async function getCommentsWithLikesList({
  articleId,
}: GetCommentsListPayload): Promise<CommentWithAuthorAndLikes[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<CommentWithAuthorAndLikes[]>({
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
