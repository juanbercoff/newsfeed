import { Get, Controller, Param } from '@nestjs/common';
import { ArticleHistoryService } from './article-history.service';

@Controller('article-history')
export class ArticleHistoryController {
  constructor(private readonly articleHistoryService: ArticleHistoryService) {}

  @Get(':articleId')
  getArticleHistory(@Param('articleId') articleId: string) {
    return this.articleHistoryService.getArticleHistory(articleId);
  }
}
