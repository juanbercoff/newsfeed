import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateArticleHistoryDto {
  @IsNotEmpty()
  content: Prisma.ArticleContentUncheckedCreateWithoutArticleInput[];

  @IsNotEmpty()
  @IsUUID()
  articleId: string;

  @IsOptional()
  comments: Prisma.CommentUncheckedCreateInput[];
}

const articleHistory = Prisma.validator<Prisma.ArticleHistoryArgs>()({
  include: {
    articleContent: true,
    comments: true,
  },
});

export type ArticleHistoryDto = Prisma.ArticleHistoryGetPayload<
  typeof articleHistory
>;
