import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrUpdateLikesEntityPayload } from '../types/likes-payload-types';
import { Prisma } from '@prisma/client';

export class CreateArticleLikeDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string;

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
  articleLikeId: string;
}

export class GetUserArticleLikeDto extends PartialType(CreateArticleLikeDto) {}

export type AllArticlesLikesDto = {
  articleId: string;
  _sum: {
    like: number;
  };
};

export interface CreateArticleLikePayload
  extends CreateOrUpdateLikesEntityPayload {
  articleId: string;
}

export interface UpdateArticleLikePayload
  extends CreateOrUpdateLikesEntityPayload {
  articleLikeId: string;
}

export interface DeleteArticleLikePayload {
  articleLikeId: string;
  authToken: string;
}

export type ArticleLikeAggregateType<
  T extends Prisma.ArticleLikeAggregateArgs
> = Prisma.GetArticleLikeAggregateType<T>;
