import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentWithClosureDto } from '@newsfeed/data';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<CommentWithClosureDto[]> {
    return this.prisma.comment.findMany({
      include: {
        parentComment: true,
      },
    });
  }
}
