import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateArticleHistoryDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  articleId: string;

  @IsOptional()
  comments: Prisma.CommentUncheckedCreateInput[];
}

const articleHistory = Prisma.validator<Prisma.ArticleHistoryArgs>()({
  include: {
    comments: true,
  },
});

export type ArticleHistoryDto = Prisma.ArticleHistoryGetPayload<
  typeof articleHistory
>;
