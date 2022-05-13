import { Module } from '@nestjs/common';
import { CommentLikesController } from './comment-likes.controller';
import { UsersService } from '../users/users.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
import { CommentLikesService } from './comment-likes.service';

@Module({
  controllers: [CommentLikesController],
  providers: [CommentLikesService, UsersService, Auth0ManagementApiService],
})
export class CommentLikesModule {}
