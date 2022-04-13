import { Injectable } from '@nestjs/common';
import { CreateArticleVisitDto } from '@newsfeed/data';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleVisitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateArticleVisitDto, cookie: string) {
    const articleVisit = await this.findOne(cookie, data);

    if (!articleVisit) {
      return this.prisma.articleVisit.create({
        data: {
          articleId: data.articleId,
          cookie,
        },
      });
    }
  }

  findOne(cookie: string, data: CreateArticleVisitDto) {
    return this.prisma.articleVisit.findFirst({
      where: {
        cookie,
        articleId: data.articleId,
      },
    });
  }

  countOfVisits(articleId: string) {
    return this.prisma.articleVisit.aggregate({
      _count: {
        id: true,
      },
      where: {
        articleId,
      },
    });
  }
}
