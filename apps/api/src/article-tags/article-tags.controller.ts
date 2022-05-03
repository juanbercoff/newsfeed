import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleTagsService } from './article-tags.service';
import { ArticleTag } from '@prisma/client';
import { CreateArticleTagDto } from '@newsfeed/data';

@Controller('article-tags')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Get(':articleId')
  getArticleTags(@Param('articleId') articleId: string): Promise<ArticleTag[]> {
    return this.articleTagsService.getArticleTags(articleId);
  }
}
