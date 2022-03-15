import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':articleId')
  findAll(@Param('articleId') articleId: string) {
    return this.commentsService.findAll(articleId);
  }
}
