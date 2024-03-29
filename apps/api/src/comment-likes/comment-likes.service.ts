import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCommentLikeDto,
  UpdateCommentLikeDto,
  AuthenticatedUser,
  CreateOrUpdateCommentLikeDto,
  GetUserCommentLikeDto,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { Prisma } from '@prisma/client';
import { EntityNotOwnedByUserException } from '../others/exceptions/entity-not-owned-by-user.exception';

@Injectable()
export class CommentLikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}
  async create(
    data: CreateCommentLikeDto,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ) {
    const { commentId, like } = data;
    const userId = authenticatedUser.metadata.userId;

    const commentAlreadyLiked = await this.prisma.commentLike.findFirst({
      where: {
        commentId,
        userId,
      },
    });

    if (commentAlreadyLiked) {
      throw new Error('Only one comment like per user per comment');
    }

    return await this.prisma.commentLike.create({
      data: {
        commentId,
        userId,
        like: like ? 1 : -1,
      },
    });
  }

  async update(
    data: UpdateCommentLikeDto,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ) {
    const { like, commentLikeId } = data;

    const userId = authenticatedUser.metadata.userId;

    const commentAlreadyLiked = await this.prisma.commentLike.findFirst({
      where: {
        id: commentLikeId,
      },
    });

    if (commentAlreadyLiked.userId !== userId) {
      throw new EntityNotOwnedByUserException(Prisma.ModelName.CommentLike);
    }

    return await this.prisma.commentLike.update({
      where: {
        id: commentLikeId,
      },
      data: {
        like: like ? 1 : -1,
      },
    });
  }

  async getAllLikesByComment(commentId: string) {
    return await this.prisma.commentLike.findMany({
      where: {
        commentId,
      },
    });
  }

  async getCommentLikesCount(commentId: string) {
    return await this.prisma.commentLike.aggregate({
      _sum: {
        like: true,
      },
      where: {
        commentId,
      },
    });
  }

  getAllCommentsLikes(comments?: string[]) {
    return this.prisma.commentLike.groupBy({
      by: ['commentId'],
      _sum: {
        like: true,
      },
      where: {
        commentId: {
          in: comments,
        },
      },
    });
  }

  async delete(
    id: string,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ) {
    const userId = authenticatedUser.metadata.userId;

    const commentLike = await this.prisma.commentLike.findFirst({
      where: {
        id,
      },
    });

    if (!commentLike) {
      throw new Error('Article like not found');
    }

    if (commentLike.userId !== userId) {
      throw new EntityNotOwnedByUserException(Prisma.ModelName.CommentLike);
    }

    return await this.prisma.commentLike.delete({
      where: {
        id,
      },
    });
  }

  async getUserCommentLike(
    { commentId }: GetUserCommentLikeDto,
    authenticatedUser: AuthenticatedUser
  ) {
    const user = await this.usersService.getUserAccount(authenticatedUser);

    return await this.prisma.commentLike.findFirst({
      where: {
        commentId,
        userId: user.id,
      },
    });
  }
}
