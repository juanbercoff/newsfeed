import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateArticleVisitDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string;
}

export type ArticleVisitDto = {
  articleId: string;
  _count: {
    id: number;
  };
};
