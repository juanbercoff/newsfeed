import { Prisma, ArticleVisit as PrismaArticleVisit } from '@prisma/client';
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
  tag: string;
};

export type Article = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  authorId: string;
  portraitImageUrl: string;
  articleContent: string;
};

export type ArticleHistory = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  articleId: string;
  articleContent: string;
};

export type ArticleVisit = PrismaArticleVisit;
