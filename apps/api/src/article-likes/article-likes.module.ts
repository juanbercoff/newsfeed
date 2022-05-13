import { Module } from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import { ArticleLikesController } from './article-likes.controller';
import { UsersService } from '../users/users.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';

@Module({
  controllers: [ArticleLikesController],
  providers: [ArticleLikesService, UsersService, Auth0ManagementApiService],
})
export class ArticleLikesModule {}
