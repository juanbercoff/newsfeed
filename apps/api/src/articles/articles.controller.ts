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
  SetMetadata,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  CreateArticleDto,
  GetManyArticlesDto,
  AuthenticatedRequest,
  AuthenticatedUser,
  UpdateArticleDto,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';
import { FullyRegisteredUserGuard } from '../authorization/fully-registered-user.guard';
import {
  AUTHORIZATION_PERMISSIONS,
  AUTHORIZATION_PERMISSIONS_KEY,
} from '../others/utils/constants';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(AuthorizationGuard, FullyRegisteredUserGuard)
  @Post()
  create(@Body() data: CreateArticleDto, @Req() req: AuthenticatedRequest) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
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

  @SetMetadata(AUTHORIZATION_PERMISSIONS_KEY, [
    AUTHORIZATION_PERMISSIONS.ACCOUNT_RESOURCES_WRITE,
  ])
  @UseGuards(AuthorizationGuard, PermissionsGuard, FullyRegisteredUserGuard)
  @Patch(':articleId')
  update(
    @Param('articleId') articleId: string,
    @Body() data: UpdateArticleDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.articlesService.update(data, user, articleId);
  }

  @SetMetadata(AUTHORIZATION_PERMISSIONS_KEY, [
    AUTHORIZATION_PERMISSIONS.ACCOUNT_RESOURCES_WRITE,
  ])
  @UseGuards(AuthorizationGuard, PermissionsGuard, FullyRegisteredUserGuard)
  @Delete(':articleId')
  delete(
    @Param('articleId') articleId: string,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.articlesService.delete(articleId, user);
  }
}
