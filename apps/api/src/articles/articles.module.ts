import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ArticlesController],
  providers: [PrismaService, ArticlesService, UsersService],
})
export class ArticlesModule {}
