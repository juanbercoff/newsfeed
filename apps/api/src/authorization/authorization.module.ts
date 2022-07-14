import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';

@Module({
  providers: [UsersService, Auth0ManagementApiService],
})
export class AuthorizationModule {}
