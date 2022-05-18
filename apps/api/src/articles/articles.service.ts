import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import {
  CreateArticleDto,
  ArticleResponseDto,
  GetManyArticlesDto,
  ArticlesWithLikesResponseDto,
  AuthenticatedUser,
  UpdateArticleDto,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { UsersService } from '../users/users.service';
import { Article, Prisma } from '@prisma/client';
import { ArticleLikesService } from '../article-likes/article-likes.service';
import { ArticleHistoryService } from '../article-history/article-history.service';
import { EntityNotOwnedByUserException } from '../others/exceptions/entity-not-owned-by-user.exception';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly articleLikesService: ArticleLikesService,
    private readonly articleHistoryService: ArticleHistoryService
  ) {}

  async create(
    data: CreateArticleDto,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ): Promise<Article> {
    const { title, content, portraitImageUrl } = data;
    const userId = authenticatedUser.metadata.userId;

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
        portraitImageUrl,
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
        articleHistory: true,
        articleTag: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async findAll({
    cursor,
    tags,
  }: GetManyArticlesDto): Promise<ArticlesWithLikesResponseDto[]> {
    const paginationObject = {
      take: 4,
      skip: cursor ? 1 : 0,
    };

    if (cursor) {
      paginationObject['cursor'] = { id: cursor };
    }

    if (typeof tags === 'string') {
      tags = [tags];
    }

    const tagsFilter = tags?.map((tag) => {
      return {
        articleTag: {
          some: {
            tag: {
              name: {
                contains: tag,
              },
            },
          },
        },
      };
    });

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
        articleHistory: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        articleTag: {
          include: {
            tag: true,
          },
        },
      },
      where: {
        OR: tagsFilter,
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

  async getArticlesByUser(
    authenticatedUser: AuthenticatedUser
  ): Promise<Article[]> {
    const user = await this.usersService.getUserAccount(authenticatedUser);

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.article.findMany({
      where: {
        authorId: user.id,
      },
    });
  }

  findOneToUpdate(articleId: string) {
    return this.prisma.article.findFirst({
      where: {
        id: articleId,
      },
      include: {
        articleContent: true,
        comments: true,
      },
    });
  }

  async update(
    data: UpdateArticleDto,
    authenticatedUser: FullyRegisteredAuthenticatedUser,
    articleId: string
  ) {
    const userId = authenticatedUser.metadata.userId;

    const article = await this.findOneToUpdate(articleId);

    if (!article) {
      throw new Error('Article not found');
    }

    if (article.authorId !== userId) {
      throw new EntityNotOwnedByUserException(Prisma.ModelName.Article);
    }

    const articleHistoryData = {
      articleId,
      content: article.articleContent,
      comments: article.comments,
    };

    const createArticleHistory =
      this.articleHistoryService.create(articleHistoryData);

    const updateArticleRecord = this.prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        articleContent: {
          set: [],
          create: data.content.map((articleContent) => ({
            ...articleContent,
          })),
        },
        comments: {
          set: [],
        },
      },
    });

    return await this.prisma.$transaction([
      createArticleHistory,
      updateArticleRecord,
    ]);
  }

  async delete(
    articleId: string,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ) {
    const userId = authenticatedUser.metadata.userId;

    const article = await this.prisma.article.findFirst({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new Error('Article not found');
    }

    if (article.authorId !== userId) {
      throw new EntityNotOwnedByUserException(Prisma.ModelName.Article);
    }

    return this.prisma.article.delete({
      where: {
        id: articleId,
      },
    });
  }
}
