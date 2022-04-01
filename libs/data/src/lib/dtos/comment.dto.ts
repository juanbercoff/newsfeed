import {
  IsString,
  IsUUID,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  content: string;

  @IsNotEmpty()
  @IsUUID()
  articleId: string;

  @IsUUID()
  @IsOptional()
  parentCommentId?: string;
}

const commentsWithAuthor = Prisma.validator<Prisma.CommentArgs>()({
  include: { author: { include: { profile: true } } },
});

export type CommentWithAuthorDto = Prisma.CommentGetPayload<
  typeof commentsWithAuthor
>;
