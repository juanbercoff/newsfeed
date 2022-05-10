import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateArticleLikeDto,
  UpdateArticleLikeDto,
  AuthenticatedUser,
  CreateOrUpdateArticleLikeDto,
  GetUserArticleLikeDto,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { UsersService } from '../users/users.service';
import { EntityNotOwnedByUserException } from '../others/exceptions/entity-not-owned-by-user.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleLikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async create(data: CreateArticleLikeDto) {
    const { articleId, like, userId } = data;

    return await this.prisma.articleLike.create({
      data: {
        articleId,
        userId,
        like: like ? 1 : -1,
      },
    });
  }

  async update(data: UpdateArticleLikeDto) {
    const { id, like } = data;

    return await this.prisma.articleLike.update({
      where: {
        id,
      },
      data: {
        like: like ? 1 : -1,
      },
    });
  }

  async createOrUpdate(
    data: CreateOrUpdateArticleLikeDto,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ) {
    const { articleId, like } = data;
    const userId = authenticatedUser.metadata.userId;

    const articleAlreadyLiked = await this.prisma.articleLike.findFirst({
      where: {
        articleId,
        userId,
      },
    });

    if (articleAlreadyLiked) {
      if (articleAlreadyLiked.userId !== userId) {
        throw new EntityNotOwnedByUserException(Prisma.ModelName.ArticleLike);
      }
      return await this.update({ id: articleAlreadyLiked.id, like });
    }
    return await this.create({ articleId, like, userId });
  }

  async getAllLikesByArticle(articleId: string) {
    return await this.prisma.articleLike.findMany({
      where: {
        articleId,
      },
    });
  }

  async getArticleLikesCount(articleId: string) {
    return await this.prisma.articleLike.aggregate({
      _sum: {
        like: true,
      },
      where: {
        articleId,
      },
    });
  }

  async getAllArticlesLikes() {
    return await this.prisma.articleLike.groupBy({
      by: ['articleId'],
      _sum: {
        like: true,
      },
    });
  }

  async delete(
    id: string,
    authenticatedUser: FullyRegisteredAuthenticatedUser
  ) {
    const userId = authenticatedUser.metadata.userId;

    const articleLike = await this.prisma.articleLike.findFirst({
      where: {
        id,
      },
    });

    if (!articleLike) {
      throw new Error('Article like not found');
    }

    if (articleLike.userId !== userId) {
      throw new EntityNotOwnedByUserException(Prisma.ModelName.ArticleLike);
    }

    return await this.prisma.articleLike.delete({
      where: {
        id,
      },
    });
  }

  async getUserArticleLike(
    { articleId }: GetUserArticleLikeDto,
    authenticatedUser: AuthenticatedUser
  ) {
    const user = await this.usersService.getUserAccount(authenticatedUser);

    return await this.prisma.articleLike.findFirst({
      where: {
        articleId,
        userId: user.id,
      },
    });
  }
}
