import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersService } from '../users/users.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
import { ArticleHistoryService } from '../article-history/article-history.service';
@Module({
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    UsersService,
    Auth0ManagementApiService,
    ArticleHistoryService,
  ],
})
export class ArticlesModule {}
