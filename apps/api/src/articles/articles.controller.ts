import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleDto,
  GetManyArticlesDto,
  AuthenticatedRequest,
  AuthenticatedUser,
  UpdateArticleDto,
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
  findAllCurrent(@Query() data?: GetManyArticlesDto) {
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

  @UseGuards(AuthorizationGuard)
  @Patch(':articleId')
  update(
    @Param('articleId') articleId: string,
    @Body() data: UpdateArticleDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as AuthenticatedUser;
    return this.articlesService.update(data, user, articleId);
  }
}
