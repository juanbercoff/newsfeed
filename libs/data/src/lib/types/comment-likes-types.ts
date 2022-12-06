export type CommentLike = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  commentId: string;
  like: number;
};
