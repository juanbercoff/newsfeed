import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsInt,
  Validate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CorrectUrlDomain } from './custom-validators';
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform(({ value }) => {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(value, {
      FORBID_ATTR: ['style'],
      ALLOWED_TAGS: ['p', 'span'],
    });
  })
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsUrl()
  @Validate(CorrectUrlDomain)
  portraitImageUrl: string;

  @IsNotEmpty()
  @IsUUID()
  tagId: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export const getArticleCondition = ['latest', 'top', 'mostDiscused'] as const;
export type GetArticleCondition = typeof getArticleCondition[number];
export type GetArticleConditionValue = {
  orderBy: string;
};

export type GetArticleConditionMappedValues = {
  [key in GetArticleCondition]: GetArticleConditionValue;
};

export class GetManyArticlesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cursor?: number;

  @IsOptional()
  tags?: string[];

  @IsString()
  sortBy: GetArticleCondition;
}

//https://stackoverflow.com/questions/68366105/get-full-type-on-prisma-client
//https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const articlesResponseDto = Prisma.validator<Prisma.ArticleArgs>()({
  include: {
    author: { include: { profile: true } },
    _count: { select: { comments: true } },
    articleHistory: true,
    articleTag: { include: { tag: true } },
  },
});

export type ArticleResponseDto = Prisma.ArticleGetPayload<
  typeof articlesResponseDto
>;

export type ArticlesResponseDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  articleContent: string;
  portraitImageUrl: string;
  userName: string;
  firstName: string;
  likes: number;
  countOfComments: number;
  tagName: string;
};

const userArticles = Prisma.validator<Prisma.ArticleArgs>()({
  include: {
    _count: { select: { articleHistory: true } },
  },
});

export type UserArticles = Prisma.ArticleGetPayload<typeof userArticles>;
