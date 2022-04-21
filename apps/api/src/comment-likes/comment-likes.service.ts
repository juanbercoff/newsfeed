import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCommentLikeDto,
  UpdateCommentLikeDto,
  AuthenticatedUser,
  CreateOrUpdateCommentLikeDto,
  GetUserCommentLikeDto,
} from '@newsfeed/data';

@Injectable()
export class CommentLikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}
  async create(data: CreateCommentLikeDto) {
    const { commentId, like, userId } = data;

    return await this.prisma.commentLike.create({
      data: {
        commentId,
        userId,
        like: like ? 1 : -1,
      },
    });
  }

  async update(data: UpdateCommentLikeDto) {
    const { id, like } = data;

    return await this.prisma.commentLike.update({
      where: {
        id,
      },
      data: {
        like: like ? 1 : -1,
      },
    });
  }

  async createOrUpdate(
    data: CreateOrUpdateCommentLikeDto,
    authenticatedUser: AuthenticatedUser
  ) {
    const { commentId, like } = data;
    const user = await this.usersService.getUserAccount(authenticatedUser);

    const commentAlreadyLiked = await this.prisma.commentLike.findFirst({
      where: {
        commentId,
        userId: user.id,
      },
    });

    if (commentAlreadyLiked) {
      return this.update({ id: commentAlreadyLiked.id, like });
    }
    return this.create({ commentId, like, userId: user.id });
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

  async delete(id: string) {
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
