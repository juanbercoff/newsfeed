import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleDto,
  GetManyArticlesDto,
  AuthenticatedRequest,
  AuthenticatedUser,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() data: CreateArticleDto, @Req() req: AuthenticatedRequest) {
    const user = req.user as AuthenticatedUser;
    return this.articlesService.create(data, user);
  }

  @Get()
  findAll(@Query() data?: GetManyArticlesDto) {
    return this.articlesService.findAll(data);
  }

  @UseGuards(AuthorizationGuard)
  @Get('/user')
  findByUser(@Req() req: AuthenticatedRequest) {
    const user = req.user as AuthenticatedUser;
    return this.articlesService.getArticlesByUser(user);
  }

  @Get(':articleId')
  findOne(@Param('articleId') id: string) {
    return this.articlesService.findOne(id);
  }
}
