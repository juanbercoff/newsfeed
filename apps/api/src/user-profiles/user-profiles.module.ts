import { Module } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { UserProfilesController } from './user-profiles.controller';
import { UsersService } from '../users/users.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [UserProfilesController],
  imports: [UsersModule],
  providers: [UserProfilesService, UsersService, Auth0ManagementApiService],
})
export class UserProfilesModule {}
