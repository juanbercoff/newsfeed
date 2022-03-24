import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { UserProfile } from '@prisma/client';
import { UserProfilesService } from './user-profiles.service';
import { AuthenticatedRequest, AuthenticatedUser } from '@newsfeed/data';
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

  @Get(':userProfileId')
  async getUserProfileById(
    @Param('userProfileId') userProfileId: string
  ): Promise<UserProfile> {
    return await this.userProfilesService.getUserProfileById(userProfileId);
  }
}
