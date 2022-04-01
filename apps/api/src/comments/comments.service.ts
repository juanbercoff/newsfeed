import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import {
  CommentWithAuthorDto,
  AuthenticatedUser,
  CreateCommentDto,
} from '@newsfeed/data';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  findAll(articleId: string): Promise<CommentWithAuthorDto[]> {
    return this.prisma.comment.findMany({
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
