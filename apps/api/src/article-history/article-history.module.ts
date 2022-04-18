import { Module } from '@nestjs/common';
import { ArticleHistoryService } from './article-history.service';
import { ArticleHistoryController } from './article-history.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ArticleHistoryController],
  providers: [PrismaService, ArticleHistoryService],
})
export class ArticleHistoryModule {}
