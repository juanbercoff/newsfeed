import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateArticleVisitDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string;
}
