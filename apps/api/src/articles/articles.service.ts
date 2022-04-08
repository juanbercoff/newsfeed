import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import {
  CreateArticleDto,
  ArticleResponseDto,
  GetManyArticlesDto,
  ArticlesWithLikesResponseDto,
} from '@newsfeed/data';
import { UsersService } from '../users/users.service';
import { Article } from '@prisma/client';
import { ArticleLikesService } from '../article-likes/article-likes.service';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly articleLikesService: ArticleLikesService
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
        author: {
          connect: {
            id: userId,
          },
        },
        articleContent: {
          create: content.map((articleContent) => ({
            ...articleContent,
          })),
        },
      },
    });
  }

  findOne(id: string): Promise<ArticleResponseDto> {
    return this.prisma.article.findFirst({
      where: {
        id,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        articleContent: true,
      },
    });
  }

  async findAll({
    cursor,
  }: GetManyArticlesDto): Promise<ArticlesWithLikesResponseDto[]> {
    const paginationObject = {
      take: 4,
      skip: cursor ? 1 : 0,
    };
    cursor ? (paginationObject['cursor'] = { id: cursor }) : null;

    const articles = await this.prisma.article.findMany({
      ...paginationObject,
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        articleContent: true,
      },
    });

    const articlesLikes = await this.articleLikesService.getAllArticlesLikes();

    const articlesWithLikes = articles.map((article) => {
      const articleLike = articlesLikes.find(
        (articleLike) => articleLike.articleId === article.id
      );
      return { ...article, articleLike };
    });

    return articlesWithLikes;
  }
}
