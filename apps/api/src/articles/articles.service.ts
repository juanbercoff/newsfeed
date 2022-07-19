import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import {
  CreateArticleDto,
  ArticlesResponseDto,
  ArticleResponseDto,
  GetManyArticlesDto,
  AuthenticatedUser,
  UpdateArticleDto,
  FullyRegisteredAuthenticatedUser,
  UserArticles,
  GetArticleConditionMappedValues,
} from '@newsfeed/data';
import { UsersService } from '../users/users.service';
import { Article, Prisma } from '@prisma/client';
import { ArticleHistoryService } from '../article-history/article-history.service';
import { EntityNotOwnedByUserException } from '../others/exceptions/entity-not-owned-by-user.exception';
import { allArticlesWithLikesQuery } from './queries/allArticlesWithLikesQuery';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly articleHistoryService: ArticleHistoryService
  ) {}

  async create(
    data: CreateArticleDto,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ): Promise<Article> {
    const { title, content, portraitImageUrl, tagId } = data;
    const userId = authenticatedUser.metadata.userId;

    return this.prisma.article.create({
      data: {
        title,
        author: {
          connect: {
            id: userId,
          },
        },
        articleContent: content,
        portraitImageUrl,
        articleTag: {
          create: {
            tag: {
              connect: {
                id: tagId,
              },
            },
          },
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
    sortBy,
  }: GetManyArticlesDto): Promise<ArticlesResponseDto[]> {
    const conditionValues: GetArticleConditionMappedValues = {
      latest: {
        orderBy: `ORDER BY a."createdAt" desc`,
      },
      top: {
        orderBy: `ORDER BY likes desc`,
      },
      mostDiscused: {
        orderBy: `ORDER BY "countOfComments" desc`,
      },
    };

    const query = allArticlesWithLikesQuery(
      conditionValues[sortBy].orderBy,
      cursor ? `LIMIT 4 OFFSET ${cursor * 4 - 4}` : ''
    );

    return await this.prisma.$queryRaw(Prisma.raw(query));
  }

  async getArticlesByUser(
    authenticatedUser: AuthenticatedUser
  ): Promise<UserArticles[]> {
    const user = await this.usersService.getUserAccount(authenticatedUser);

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.article.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        _count: {
          select: {
            articleHistory: true,
          },
        },
      },
    });
  }

  findOneToUpdate(articleId: string) {
    return this.prisma.article.findFirst({
      where: {
        id: articleId,
      },
      include: {
        comments: true,
        _count: {
          select: {
            articleHistory: true,
          },
        },
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

    if (article.articleContent === data.content) {
      if (article.title === data.title) {
        //TODO
        throw new Error('Article is the same');
      }
      return this.prisma.article.update({
        where: {
          id: articleId,
        },
        data: {
          title: data.title,
        },
      });
    }

    if (article._count.articleHistory >= 4) {
      throw new Error("You can't edit an article more than 5 times");
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
        articleContent: data.content,
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
