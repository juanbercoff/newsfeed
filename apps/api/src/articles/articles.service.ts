import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateArticleDto, ArticleWithAuthorResponseDto } from '@newsfeed/data';
import { UsersService } from '../users/users.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async create(data: CreateArticleDto): Promise<Article> {
    const { userId, title, content } = data;
    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.article.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findOne(id: string): Promise<ArticleWithAuthorResponseDto> {
    return this.prisma.article.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  }

  findAll(): Promise<ArticleWithAuthorResponseDto[]> {
    return this.prisma.article.findMany({
      include: {
        author: true,
      },
    });
  }
}