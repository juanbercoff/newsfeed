import { callApiService, getEndpoint } from './api-service-utilities';

import {
  CreateCommentDto,
  GetCommentsListPayload,
  CommentsResponseDto,
} from '@newsfeed/data';
import { Comment } from '@prisma/client';

export async function getCommentsOfArticle({
  id,
  orderBy,
}: GetCommentsListPayload): Promise<CommentsResponseDto[]> {
  return callApiService<CommentsResponseDto[]>({
    url: getEndpoint(`comments/article/${id}?${orderBy}`),
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

export async function getCommentsOfArticleHistory({
  id,
  orderBy,
}: GetCommentsListPayload): Promise<CommentsResponseDto[]> {
  return callApiService<CommentsResponseDto[]>({
    url: getEndpoint(`comments/articleHistory/${id}?${orderBy}`),
    method: 'GET',
  });
}
