import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';

export class CreateArticleLikeDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  like: boolean;
}

export class CreateOrUpdateArticleLikeDto extends PartialType(
  CreateArticleLikeDto
) {}

export class UpdateArticleLikeDto extends PartialType(CreateArticleLikeDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export type AllArticlesLikesDto = {
  articleId: string;
  _sum: {
    like: number;
  };
};
