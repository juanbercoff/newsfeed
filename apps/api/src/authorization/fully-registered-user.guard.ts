import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserNotFullyRegisteredException } from '../others/exceptions/user-not-fully-registered.exception';

@Injectable()
export class FullyRegisteredUserGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    /*
      TODO: Find a way to avoid fetching this data from the DB. Possible options:
     */
    const user = await this.prismaService.user.findFirst({
      where: {
        auth0Id: req.user.sub,
      },
    });

    if (!user) throw new UserNotFullyRegisteredException();

    req.user.metadata = {
      userId: user.id,
    };
    return true;
  }
}
