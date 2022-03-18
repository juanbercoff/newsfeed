import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

//https://stackoverflow.com/questions/68366105/get-full-type-on-prisma-client
//https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const articlesResponseDto = Prisma.validator<Prisma.ArticleArgs>()({
  include: { author: true, _count: { select: { comments: true } } },
});

export type ArticleResponseDto = Prisma.ArticleGetPayload<
  typeof articlesResponseDto
>;
