import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, GetManyArticlesDto } from '@newsfeed/data';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() data: CreateArticleDto) {
    return this.articlesService.create(data);
  }

  @Get()
  findAll(@Query() data?: GetManyArticlesDto) {
    return this.articlesService.findAll(data);
  }

  @Get(':articleId')
  async findOne(@Param('articleId') id: string) {
    return this.articlesService.findOne(id);
  }
}
