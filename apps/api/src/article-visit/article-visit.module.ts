import { Module } from '@nestjs/common';
import { ArticleVisitService } from './article-visit.service';
import { ArticleVisitController } from './article-visit.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ArticleVisitController],
  providers: [ArticleVisitService, PrismaService],
})
export class ArticleVisitModule {}
