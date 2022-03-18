import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserProfile } from '@prisma/client';
import {
  AuthenticatedRequest,
  AuthenticatedUser,
  UserWithUserProfileResponseDto,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Req() req: AuthenticatedRequest
  ): Promise<UserWithUserProfileResponseDto> {
    const user = req.user as AuthenticatedUser;
    return this.usersService.create(user);
  }

  @Get()
  async getUser(@Req() req: AuthenticatedRequest): Promise<User> {
    const user = req.user as AuthenticatedUser;
    return this.usersService.getUserAccount(user);
  }
}
