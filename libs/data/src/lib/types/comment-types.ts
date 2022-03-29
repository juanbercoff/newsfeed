import { Comment } from '@prisma/client';
import { CommentWithAuthorDto } from '../dtos/comment.dto';
import { AllCommentsLikesDto } from '../dtos/comment-likes.dto';

export type GetCommentsListPayload = {
  articleId: string;
}; // TODO: Pagination, Order by, etc.

export type CommentWithAuthorAndLikes = CommentWithAuthorDto & {
  commentLike: AllCommentsLikesDto;
};
