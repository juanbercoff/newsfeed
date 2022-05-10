import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import {
  AuthenticatedUser,
  CreateOrUpdateArticleLikeDto,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { AuthenticatedRequest } from '@newsfeed/data';
import { FullyRegisteredUserGuard } from '../authorization/fully-registered-user.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';

@Controller('article-likes')
export class ArticleLikesController {
  constructor(private readonly articleLikesService: ArticleLikesService) {}

  @UseGuards(AuthorizationGuard, FullyRegisteredUserGuard, PermissionsGuard)
  @Post()
  createOrUpdate(
    @Body() createOrUpdateArticleLikeDto: CreateOrUpdateArticleLikeDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.articleLikesService.createOrUpdate(
      createOrUpdateArticleLikeDto,
      user
    );
  }

  @Get('/all/:articleId')
  getAllLikesByArticle(@Param('articleId') articleId: string) {
    return this.articleLikesService.getAllLikesByArticle(articleId);
  }

  @Get('/likes-count/all')
  getAllArticlesLikes() {
    return this.articleLikesService.getAllArticlesLikes();
  }

  @Get('/likes-count/:articleId')
  getArticleLikesCount(@Param('articleId') articleId: string) {
    return this.articleLikesService.getArticleLikesCount(articleId);
  }

  @UseGuards(AuthorizationGuard, FullyRegisteredUserGuard, PermissionsGuard)
  @Delete(':articleLikeId')
  delete(
    @Param('articleLikeId') articleLikeId: string,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.articleLikesService.delete(articleLikeId, user);
  }

  @UseGuards(AuthorizationGuard)
  @Get(':articleId')
  get(@Param('articleId') articleId: string, @Req() req: AuthenticatedRequest) {
    const user = req.user as AuthenticatedUser;

    return this.articleLikesService.getUserArticleLike({ articleId }, user);
  }
}
