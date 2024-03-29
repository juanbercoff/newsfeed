import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Auth0ManagementApiService],
})
export class UsersModule {}
