import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import {
  AuthenticatedUser,
  CreateCommentLikeDto,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { AuthenticatedRequest } from '@newsfeed/data';
import { FullyRegisteredUserGuard } from '../authorization/fully-registered-user.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @UseGuards(AuthorizationGuard, FullyRegisteredUserGuard, PermissionsGuard)
  @Post()
  create(
    @Body() createOrUpdateCommentLikeDto: CreateCommentLikeDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.commentLikesService.create(createOrUpdateCommentLikeDto, user);
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

  @UseGuards(AuthorizationGuard, FullyRegisteredUserGuard, PermissionsGuard)
  @Delete(':commentLikeId')
  delete(
    @Param('commentLikeId') commentLikeId: string,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.commentLikesService.delete(commentLikeId, user);
  }

  @UseGuards(AuthorizationGuard)
  @Get(':commentId')
  get(@Param('commentId') commentId: string, @Req() req: AuthenticatedRequest) {
    const user = req.user as AuthenticatedUser;

    return this.commentLikesService.getUserCommentLike({ commentId }, user);
  }

  @UseGuards(AuthorizationGuard, FullyRegisteredUserGuard, PermissionsGuard)
  @Patch(':commentLikeId')
  patch(
    @Body() data: { like: boolean },
    @Param('commentLikeId') commentLikeId: string,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.commentLikesService.update(
      { commentLikeId, like: data.like },
      user
    );
  }
}
