import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';

const commentsWithAuthor = Prisma.validator<Prisma.CommentArgs>()({
  include: { author: true },
});

export type CommentWithAuthorDto = Prisma.CommentGetPayload<
  typeof commentsWithAuthor
>;
