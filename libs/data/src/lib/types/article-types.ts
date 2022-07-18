import { Tag } from '@prisma/client';
import { GetArticleCondition } from '../dtos/article.dto';

export type GetOneArticlePayload = { id: string };

export type GetArticlesPayload = {
  cursor?: number;
  tags?: string;
  condition: GetArticleCondition;
};

export type ArticleFormData = {
  title: string;
  content: string;
  portraitImageUrl?: string | null;
  tag: Tag;
};
