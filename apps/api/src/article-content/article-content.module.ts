import { Module } from '@nestjs/common';
import { ArticleContentService } from './article-content.service';
import { ArticleContentController } from './article-content.controller';

@Module({
  controllers: [ArticleContentController],
  providers: [ArticleContentService]
})
export class ArticleContentModule {}
