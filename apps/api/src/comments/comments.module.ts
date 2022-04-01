import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';

@Module({
  controllers: [CommentsController],
  providers: [
    PrismaService,
    CommentsService,
    UsersService,
    Auth0ManagementApiService,
  ],
})
export class CommentsModule {}
