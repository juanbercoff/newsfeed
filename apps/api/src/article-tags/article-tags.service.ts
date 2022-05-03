import { Injectable } from '@nestjs/common';
import { CreateArticleTagDto } from '@newsfeed/data';
import { ArticleTag } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleTagsService {
  constructor(private readonly prisma: PrismaService) {}

  getArticleTags(articleId: string): Promise<ArticleTag[]> {
    return this.prisma.articleTag.findMany({
      where: {
        articleId: articleId,
      },
    });
  }

  /*   tagArticle({
    articleId,
    tags: tag,
  }: CreateArticleTagDto): Promise<ArticleTag> {
    return this.prisma.articleTag.create({
      data: {
        articleId,
        tag,
      },
    });
  } */
}
