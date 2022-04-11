import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleDto,
  GetManyArticlesDto,
  RequestWithCookie,
} from '@newsfeed/data';
import { ArticleVisitService } from '../article-visit/article-visit.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articleVisitService: ArticleVisitService
  ) {}

  @Post()
  create(@Body() data: CreateArticleDto) {
    return this.articlesService.create(data);
  }

  @Get()
  findAll(@Query() data?: GetManyArticlesDto) {
    return this.articlesService.findAll(data);
  }

  @Get(':articleId')
  async findOne(
    @Req() { cookies }: RequestWithCookie,
    @Param('articleId') id: string
  ) {
    await this.articleVisitService.create({ articleId: id }, cookies.visits);
    return this.articlesService.findOne(id);
  }

  @Get('static/:articleId')
  async findOneStatic(@Param('articleId') id: string) {
    return this.articlesService.findOne(id);
  }
}
