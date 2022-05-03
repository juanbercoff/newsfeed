import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Req,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import {
  CreateCommentDto,
  AuthenticatedRequest,
  AuthenticatedUser,
  CommentOrderByInput,
} from '@newsfeed/data';
import { Comment, Prisma } from '@prisma/client';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':articleId')
  findAll(
    @Param('articleId') articleId: string,
    @Query()
    orderBy: CommentOrderByInput
  ): Promise<Comment[]> {
    return this.commentsService.findAll(articleId, orderBy);
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  create(
    @Body() data: CreateCommentDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Comment> {
    const user = req.user as AuthenticatedUser;
    return this.commentsService.create(data, user);
  }

  @Get('count/:articleId')
  countOfComments(@Param('articleId') articleId: string): Promise<number> {
    return this.commentsService.countOfComments(articleId);
  }
}
