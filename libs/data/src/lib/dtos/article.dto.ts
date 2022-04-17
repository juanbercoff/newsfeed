import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma, ArticleContent } from '@prisma/client';
import { AllArticlesLikesDto } from './article-likes.dto';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  content: Prisma.ArticleContentUncheckedCreateWithoutArticleInput[];
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class GetManyArticlesDto {
  @IsUUID()
  @IsOptional()
  cursor?: string;
}

//https://stackoverflow.com/questions/68366105/get-full-type-on-prisma-client
//https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const articlesResponseDto = Prisma.validator<Prisma.ArticleArgs>()({
  include: {
    author: { include: { profile: true } },
    _count: { select: { comments: true } },
    articleContent: true,
  },
});

export type ArticleResponseDto = Prisma.ArticleGetPayload<
  typeof articlesResponseDto
>;

export type ArticlesWithLikesResponseDto = ArticleResponseDto & {
  articleLike: AllArticlesLikesDto;
};
