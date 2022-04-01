import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateArticleLikeDto,
  UpdateArticleLikeDto,
  AuthenticatedUser,
  CreateOrUpdateArticleLikeDto,
  GetUserArticleLikeDto,
} from '@newsfeed/data';
import { UsersService } from '../users/users.service';

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
    authenticatedUser: AuthenticatedUser
  ) {
    const { articleId, like } = data;
    const user = await this.usersService.getUserAccount(authenticatedUser);

    const articleAlreadyLiked = await this.prisma.articleLike.findFirst({
      where: {
        articleId,
        userId: user.id,
      },
    });

    if (articleAlreadyLiked) {
      return await this.update({ id: articleAlreadyLiked.id, like });
    }
    return await this.create({ articleId, like, userId: user.id });
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

  async delete(id: string) {
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
