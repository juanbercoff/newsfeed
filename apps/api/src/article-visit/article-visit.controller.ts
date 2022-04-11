import { Controller, Get, Post, Body, Req, Param, Res } from '@nestjs/common';
import { ArticleVisitService } from './article-visit.service';
import { CreateArticleVisitDto, RequestWithCookie } from '@newsfeed/data';

@Controller('article-visit')
export class ArticleVisitController {
  constructor(private readonly articleVisitService: ArticleVisitService) {}

  @Post()
  create(
    @Body() data: CreateArticleVisitDto,
    @Req() { cookies }: RequestWithCookie
  ) {
    return this.articleVisitService.create(data, cookies.visit);
  }

  @Get(':articleId')
  getCountOfVisits(@Param(':articleId') articleId: string) {
    return this.articleVisitService.countOfVisits(articleId);
  }
}
