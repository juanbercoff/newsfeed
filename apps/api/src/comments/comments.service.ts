import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentWithAuthorDto } from '@newsfeed/data';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

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
}
