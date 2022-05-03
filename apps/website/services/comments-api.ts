import { callApiService, getEndpoint } from './api-service-utilities';

import {
  CreateCommentDto,
  GetCommentsListPayload,
  CommentWithAuthorAndLikes,
} from '@newsfeed/data';
import { Comment } from '@prisma/client';

export async function getCommentsWithLikes({
  articleId,
  orderBy,
}: GetCommentsListPayload): Promise<CommentWithAuthorAndLikes[]> {
  return callApiService<CommentWithAuthorAndLikes[]>({
    url: getEndpoint(`comments/${articleId}?${orderBy}`),
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

export async function getCountOfComments(articleId: string) {
  return callApiService<number>({
    url: getEndpoint(`comments/count/${articleId}`),
    method: 'GET',
  });
}
