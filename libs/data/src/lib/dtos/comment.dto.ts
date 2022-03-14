import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';

const commentsWithClosure = Prisma.validator<Prisma.CommentArgs>()({
  include: { parentComment: true },
});

export type CommentWithClosureDto = Prisma.CommentGetPayload<
  typeof commentsWithClosure
>;
