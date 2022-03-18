import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '@newsfeed/data';
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

  async getUserProfileById(userId: string) {
    return await this.prisma.userProfile.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
