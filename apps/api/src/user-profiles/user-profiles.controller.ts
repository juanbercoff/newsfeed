import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { Prisma, UserProfile } from '@prisma/client';
import { UserProfilesService } from './user-profiles.service';
import {
  AuthenticatedRequest,
  AuthenticatedUser,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { FullyRegisteredUserGuard } from '../authorization/fully-registered-user.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';

@UseGuards(AuthorizationGuard)
@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @UseGuards(FullyRegisteredUserGuard)
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

  @UseGuards(AuthorizationGuard, FullyRegisteredUserGuard, PermissionsGuard)
  @Patch(':userProfileId')
  createOrUpdate(
    @Param('userProfileId') userProfileId: string,
    @Body() data: Prisma.UserProfileUpdateInput,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user as FullyRegisteredAuthenticatedUser;
    return this.userProfilesService.updateUserProfile(
      userProfileId,
      user,
      data
    );
  }
}
