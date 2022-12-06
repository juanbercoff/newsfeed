import { CommentWithAuthorDto } from '../dtos/comment.dto';
import { AllCommentsLikesDto } from '../dtos/comment-likes.dto';
import { Prisma } from '@prisma/client';

export type GetCommentsListPayload = {
  id: string;
  orderBy?: CommentOrderBy;
};

export type CommentOrderBy =
  | 'createdAt=asc'
  | 'createdAt=desc'
  | 'likes=desc'
  | 'likes=asc';

export type CommentOrderByInput = {
  createdAt?: Prisma.SortOrder;
  likes?: Prisma.SortOrder;
};

export type CommentWithAuthorAndLikes = CommentWithAuthorDto & {
  commentLike: AllCommentsLikesDto;
};

export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
  articleId: string | null;
  parentCommentId: string | null;
  articleHistoryId: string | null;
};
