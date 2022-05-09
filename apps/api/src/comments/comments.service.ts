import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import {
  AuthenticatedUser,
  CreateCommentDto,
  CommentOrderByInput,
  CommentsResponseDto,
} from '@newsfeed/data';
import { Comment, Prisma } from '@prisma/client';
import { allCommentWithLikesQuery } from './queries/allCommentsWithLikesQuery';

type FindAllBy = 'articleId' | 'articleHistoryId';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async findAll(
    whereColumn: FindAllBy,
    id: string,
    orderBy?: CommentOrderByInput
  ): Promise<CommentsResponseDto[]> {
    const whereCondition = `WHERE c."${whereColumn}" = '${id}'`;
    const orderByCondition =
      Object.keys(orderBy).length !== 0
        ? `ORDER BY "${Object.keys(orderBy)[0]}" ${Object.values(orderBy)[0]}`
        : null;
    const query = allCommentWithLikesQuery(whereCondition, orderByCondition);

    return await this.prisma.$queryRaw<CommentsResponseDto[]>(
      Prisma.raw(query)
    );
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
