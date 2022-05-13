import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { CommentsModule } from '../comments/comments.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
import { UserProfilesModule } from '../user-profiles/user-profiles.module';
import { ArticleLikesModule } from '../article-likes/article-likes.module';
import { CommentLikesModule } from '../comment-likes/comment-likes.module';
import { ArticleContentModule } from '../article-content/article-content.module';
import { ArticleVisitModule } from '../article-visit/article-visit.module';
import { ArticleHistoryModule } from '../article-history/article-history.module';
import { TagsModule } from '../tags/tags.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ArticlesModule,
    CommentsModule,
    AuthorizationModule,
    UserProfilesModule,
    ArticleLikesModule,
    CommentLikesModule,
    ArticleContentModule,
    ArticleVisitModule,
    ArticleHistoryModule,
    TagsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, Auth0ManagementApiService],
})
export class AppModule {}
