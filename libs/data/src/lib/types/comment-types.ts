import { Comment } from '@prisma/client';

export type GetCommentsListPayload = {
  articleId: string;
}; // TODO: Pagination, Order by, etc.
