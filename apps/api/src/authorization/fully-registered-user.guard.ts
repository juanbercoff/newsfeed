import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserNotFullyRegisteredException } from '../others/exceptions/user-not-fully-registered.exception';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FullyRegisteredUserGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    /*
      TODO: Find a way to avoid fetching this data from the DB.
     */
    const user = await this.prismaService.user.findFirst({
      where: {
        auth0Id: req.user.sub,
      },
    });

    function setMetadata(user: User) {
      req.user.metadata = {
        userId: user.id,
      };
    }

    if (user) {
      setMetadata(user);
    } else {
      try {
        const user = await this.userService.upsert(req.user);
        setMetadata(user);
        return true;
      } catch (error) {
        //TODO: error handling
        console.log(error);
        return false;
      }
    }
    return true;
  }
}
