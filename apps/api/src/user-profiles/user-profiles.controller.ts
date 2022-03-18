import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { Prisma, UserProfile } from '@prisma/client';
import { UserProfilesService } from './user-profiles.service';
import { AuthenticatedRequest, AuthenticatedUser } from '@newsfeed/data';
import { FullyRegisteredUserGuard } from '../authorization/fully-registered-user.guard';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Get()
  async getUserProfile(@Req() req: AuthenticatedRequest): Promise<UserProfile> {
    const user = req.user as AuthenticatedUser;
    return await this.userProfilesService.getUserProfile(user);
  }

  @Get(':userId')
  async getUserProfileById(
    @Param('userId') userId: string
  ): Promise<UserProfile> {
    return await this.userProfilesService.getUserProfileById(userId);
  }
}
