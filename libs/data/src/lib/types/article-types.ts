import { Tag } from '@prisma/client';

export type GetOneArticlePayload = { id: string };

export type GetArticlesPayload = { cursor?: string; tags?: string };

export type ArticleFormData = {
  title: string;
  content: string;
  portraitImageUrl?: string | null;
  tag: Tag;
};
