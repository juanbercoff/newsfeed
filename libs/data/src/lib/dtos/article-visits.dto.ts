import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleVisitDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string;
}
