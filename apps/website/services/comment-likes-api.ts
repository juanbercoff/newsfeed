import { callApiService, getEndpoint } from './api-service-utilities';

import { AllCommentsLikesDto } from '@newsfeed/data';
import { CommentLike } from '@prisma/client';

export async function getAllCommentsLikes(): Promise<AllCommentsLikesDto[]> {
  // TODO: Apply payload once it has pagination, order by, etc.
  return callApiService<AllCommentsLikesDto[]>({
    url: getEndpoint('comment-likes/likes-count/all'),
    method: 'GET',
  });
}

export async function postCommentLike(
  {
    id,
    like,
  }: {
    id: string;
    like: boolean;
  },
  authToken: string
): Promise<CommentLike> {
  return callApiService(
    {
      url: getEndpoint('comment-likes'),
      method: 'POST',
      data: {
        commentId: id,
        like,
      },
    },
    authToken
  );
}

export async function deleteCommentLike(
  commentLikeId: string,
  authToken: string
): Promise<CommentLike> {
  return callApiService(
    {
      url: getEndpoint(`comment-likes/${commentLikeId}`),
      method: 'DELETE',
    },
    authToken
  );
}

export async function getUserCommentLike(
  commentId: string,
  authToken: string
): Promise<CommentLike | null> {
  return callApiService(
    {
      url: getEndpoint(`comment-likes/${commentId}`),
      method: 'GET',
    },
    authToken
  );
}
