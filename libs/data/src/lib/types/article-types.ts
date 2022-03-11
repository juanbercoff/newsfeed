import { Article } from '@prisma/client';

export type GetOneArticlePayload = { id: string };
export type GetArticlesListPayload = Record<string, never>; // TODO: Pagination, Order by, etc.
