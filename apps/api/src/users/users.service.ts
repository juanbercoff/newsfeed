import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Auth0ManagementApiService } from '../auth0-management-api/auth0-management-api.service';
import {
  AuthenticatedUser,
  UserWithUserProfileResponseDto,
} from '@newsfeed/data';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth0ManagementApiService: Auth0ManagementApiService
  ) {}

  async upsert(authenticatedUser: AuthenticatedUser): Promise<User> {
    const auth0User = await this.auth0ManagementApiService.getUserById(
      authenticatedUser.sub
    );

    if (!auth0User) {
      //throw new BadRequestException('Invalid user id');
      throw new Error('Invalid user id');
    }

    await this.auth0ManagementApiService.assignRoleToUser(
      auth0User.user_id,
      'CUSTOMER'
    );

    const createdUser = await this.prisma.user.upsert({
      where: {
        auth0Id: auth0User.user_id,
      },
      update: {},
      create: {
        auth0Id: auth0User.user_id,
        email: auth0User.email,
        profile: {
          create: {
            firstName: auth0User.given_name ?? 'empty',
            lastName: auth0User.family_name ?? 'empty',
            userName: auth0User.nickname,
          },
        },
      },
    });

    return createdUser;
  }

  async create(
    authenticatedUser: AuthenticatedUser
  ): Promise<UserWithUserProfileResponseDto> {
    const user = await this.getUserAccount(authenticatedUser);
    // Avoid creating an entry for this user if it already exists in our DB
    if (user) {
      throw new Error('User already exists');
      //throw new ConflictException('The user is already registered');
    }

    // Otherwise, create the user entry based on what we receive from auth0
    const auth0User = await this.auth0ManagementApiService.getUserById(
      authenticatedUser.sub
    );

    if (!auth0User) {
      //throw new BadRequestException('Invalid user id');
      throw new Error('Invalid user id');
    }

    const createdUser = await this.prisma.user.create({
      data: {
        auth0Id: auth0User.user_id,
        email: auth0User.email,
        profile: {
          create: {
            // TODO: should ask for this during login
            firstName: auth0User.given_name ?? 'empty',
            lastName: auth0User.family_name ?? 'empty',
            userName: auth0User.nickname,
          },
        },
      },
    });

    return await this.getUserById(createdUser.id);
  }

  async getUserAccount(authenticatedUser): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        auth0Id: authenticatedUser.sub,
      },
    });
  }

  async getUserById(userId: string): Promise<UserWithUserProfileResponseDto> {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
