import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  async getUserById(userId: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userUpdates,
      },
    });
  }
}
