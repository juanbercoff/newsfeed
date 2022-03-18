import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
@Module({
  controllers: [ArticlesController],
  providers: [
    PrismaService,
    ArticlesService,
    UsersService,
    Auth0ManagementApiService,
  ],
})
export class ArticlesModule {}
