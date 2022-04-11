import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
import { ArticleLikesService } from '../article-likes/article-likes.service';
import { CookiesMiddleware } from '../middleware/cookies.middleware';
import { ArticleVisitService } from '../article-visit/article-visit.service';
@Module({
  controllers: [ArticlesController],
  providers: [
    PrismaService,
    ArticlesService,
    UsersService,
    Auth0ManagementApiService,
    ArticleLikesService,
    ArticleVisitService,
  ],
})
export class ArticlesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookiesMiddleware)
      .forRoutes({ path: 'articles/:articleId', method: RequestMethod.GET });
  }
}
