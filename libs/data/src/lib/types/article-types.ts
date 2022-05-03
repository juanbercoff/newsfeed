import { Article } from '@prisma/client';

export type GetOneArticlePayload = { id: string };

export type GetArticlesPayload = { cursor?: string; tags?: string };
