import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { PrismaService } from '../prisma/prisma.service';
import { CommentsModule } from '../comments/comments.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
import { UserProfilesModule } from '../user-profiles/user-profiles.module';
import { ArticleLikesModule } from '../article-likes/article-likes.module';
import { CommentLikesModule } from '../comment-likes/comment-likes.module';
import { ArticleContentModule } from '../article-content/article-content.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, Auth0ManagementApiService],
})
export class AppModule {}
