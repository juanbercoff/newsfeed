import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from '@newsfeed/data';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() data: CreateArticleDto) {
    return this.articlesService.create(data);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':articleId')
  findOne(@Param('articleId') id: string) {
    return this.articlesService.findOne(id);
  }
}