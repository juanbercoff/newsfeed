import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import {
  CreateCommentDto,
  AuthenticatedRequest,
  AuthenticatedUser,
} from '@newsfeed/data';
import { Comment } from '@prisma/client';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':articleId')
  findAll(@Param('articleId') articleId: string) {
    return this.commentsService.findAll(articleId);
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
}
