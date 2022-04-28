import { IsUUID, IsNotEmpty, IsArray } from 'class-validator';
import { Tag } from '@prisma/client';

export class CreateArticleTagDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string;
}
