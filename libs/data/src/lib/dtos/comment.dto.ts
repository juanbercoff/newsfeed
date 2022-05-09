import {
  IsString,
  IsUUID,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Prisma, Comment } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';

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

export type CommentsResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  parentCommentId: string;
  articleId: string;
  articleHistoryId: string;
  userName: string;
  likes: number;
};
