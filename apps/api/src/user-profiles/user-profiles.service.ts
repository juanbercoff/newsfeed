import { Injectable } from '@nestjs/common';
import {
  AuthenticatedUser,
  FullyRegisteredAuthenticatedUser,
} from '@newsfeed/data';
import { Prisma } from '@prisma/client';
import { EntityNotOwnedByUserException } from '../others/exceptions/entity-not-owned-by-user.exception';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async getUserProfile(authenticatedUser: AuthenticatedUser) {
    const user = await this.usersService.getUserAccount(authenticatedUser);
    return await this.prisma.userProfile.findUnique({
      where: {
        id: user.profileId,
      },
    });
  }

  async getUserProfileById(userProfileId: string) {
    return await this.prisma.userProfile.findUnique({
      where: {
        id: userProfileId,
      },
    });
  }

  async updateUserProfile(
    id: string,
    authenticatedUser: FullyRegisteredAuthenticatedUser,
    data: Prisma.UserProfileUpdateInput
  ) {
    const userId = authenticatedUser.metadata.userId;

    const userProfile = await this.prisma.userProfile.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (userProfile.user.id !== userId) {
      throw new EntityNotOwnedByUserException(Prisma.ModelName.UserProfile);
    }

    return await this.prisma.userProfile.update({
      where: {
        id,
      },
      data,
    });
  }
}
