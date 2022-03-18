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
import { UsersService } from '../users/users.service';
import { UserProfilesService } from '../user-profiles/user-profiles.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ArticlesModule,
    CommentsModule,
    AuthorizationModule,
    UserProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, Auth0ManagementApiService],
})
export class AppModule {}
