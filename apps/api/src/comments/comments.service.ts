import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import {
  CommentWithAuthorDto,
  AuthenticatedUser,
  CreateCommentDto,
} from '@newsfeed/data';
import { Comment } from '@prisma/client';
import { CommentLikesService } from '../comment-likes/comment-likes.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly commentLikesService: CommentLikesService
  ) {}

  async findAll(articleId: string): Promise<CommentWithAuthorDto[]> {
    const comments = await this.prisma.comment.findMany({
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
      where: {
        articleId,
      },
    });

    const commentsIds = comments.map((comment) => comment.id);

    const commentLikes = await this.commentLikesService.getAllCommentsLikes(
      commentsIds
    );

    const commentsWithLikes = comments.map((comment) => {
      const commentLike = commentLikes.find(
        (commentLike) => commentLike.commentId === comment.id
      );
      return { ...comment, commentLike };
    });

    return commentsWithLikes;
  }

  async create(
    data: CreateCommentDto,
    authenticatedUser: AuthenticatedUser
  ): Promise<Comment> {
    const user = await this.usersService.getUserAccount(authenticatedUser);
    const { articleId, content, parentCommentId } = data;

    return await this.prisma.comment.create({
      data: {
        articleId,
        authorId: user.id,
        content,
        parentCommentId,
      },
    });
  }
}
