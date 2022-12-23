export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export type GetOneArticlePayload = { id: string };
export type GetArticlesListPayload = Record<string, unknown>; // TODO: Pagination, Order by, etc.
