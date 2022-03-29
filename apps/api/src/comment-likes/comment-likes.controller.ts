import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import {
  AuthenticatedUser,
  CreateOrUpdateCommentLikeDto,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { AuthenticatedRequest } from '@newsfeed/data';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  createOrUpdate(
    @Body() createOrUpdateCommentLikeDto: CreateOrUpdateCommentLikeDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as AuthenticatedUser;
    return this.commentLikesService.createOrUpdate(
      createOrUpdateCommentLikeDto,
      user
    );
  }

  @Get('/all/:commentId')
  getAllLikesByComment(@Param('commentId') commentId: string) {
    return this.commentLikesService.getAllLikesByComment(commentId);
  }

  @Get('/likes-count/all')
  getAllCommentsLikes() {
    return this.commentLikesService.getAllCommentsLikes();
  }

  @Get('/likes-count/:commentId')
  getCommentLikesCount(@Param('commentId') commentId: string) {
    return this.commentLikesService.getCommentLikesCount(commentId);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':commentLikeId')
  delete(@Param('commentLikeId') commentLikeId: string) {
    return this.commentLikesService.delete(commentLikeId);
  }

  @UseGuards(AuthorizationGuard)
  @Get(':commentId')
  get(@Param('commentId') commentId: string, @Req() req: AuthenticatedRequest) {
    const user = req.user as AuthenticatedUser;

    return this.commentLikesService.getUserCommentLike({ commentId }, user);
  }
}
