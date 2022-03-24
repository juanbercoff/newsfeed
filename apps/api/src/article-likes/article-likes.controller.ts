import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import {
  AuthenticatedUser,
  CreateOrUpdateArticleLikeDto,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { AuthenticatedRequest } from '@newsfeed/data';

@Controller('article-likes')
export class ArticleLikesController {
  constructor(private readonly articleLikesService: ArticleLikesService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  createOrUpdate(
    @Body() createOrUpdateArticleLikeDto: CreateOrUpdateArticleLikeDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as AuthenticatedUser;
    return this.articleLikesService.createOrUpdate(
      createOrUpdateArticleLikeDto,
      user
    );
  }

  @Get(':articleId')
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
}
