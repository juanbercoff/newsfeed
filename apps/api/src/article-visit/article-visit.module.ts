import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ArticleVisitService } from './article-visit.service';
import { ArticleVisitController } from './article-visit.controller';
import { CookiesMiddleware } from '../middleware/cookies.middleware';

@Module({
  controllers: [ArticleVisitController],
  providers: [ArticleVisitService],
})
export class ArticleVisitModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookiesMiddleware)
      .forRoutes({ path: 'article-visit', method: RequestMethod.POST });
  }
}
