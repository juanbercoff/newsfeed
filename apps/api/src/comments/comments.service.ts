import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import {
  CommentWithAuthorDto,
  AuthenticatedUser,
  CreateCommentDto,
  CommentOrderByInput,
} from '@newsfeed/data';
import { Comment, Prisma } from '@prisma/client';
import { CommentLikesService } from '../comment-likes/comment-likes.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly commentLikesService: CommentLikesService
  ) {}

  async findAll(
    articleId: string,
    orderBy: CommentOrderByInput
  ): Promise<CommentWithAuthorDto[]> {
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
      orderBy: orderBy?.createdAt
        ? { createdAt: orderBy.createdAt }
        : undefined,
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

    if (orderBy?.createdAt || !orderBy) {
      return commentsWithLikes;
    }

    return commentsWithLikes.sort((a, b) => {
      if (orderBy?.likes === 'desc') {
        return (
          (b?.commentLike?._sum?.like || 0) - (a?.commentLike?._sum?.like || 0)
        );
      }
      return (
        (a?.commentLike?._sum?.like || 0) - (b?.commentLike?._sum?.like || 0)
      );
    });
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

  async countOfComments(articleId: string): Promise<number> {
    const articleHistory = await this.prisma.articleHistory.findMany({
      where: {
        articleId,
      },
    });

    const articleComments = await this.prisma.comment.count({
      where: {
        articleId,
      },
    });

    const articleHistoryCommentsCount = await this.prisma.comment.count({
      where: {
        articleHistoryId: {
          in: articleHistory.map((articleHistory) => articleHistory.id),
        },
      },
    });

    return articleComments + articleHistoryCommentsCount;
  }
}
