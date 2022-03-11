export interface Article {
	id: string;
	title: string;
	content: string;
	authorId: string;
}

export type GetOneArticlePayload = { id: string };
export type GetArticlesListPayload = {}; // TODO: Pagination, Order by, etc.
