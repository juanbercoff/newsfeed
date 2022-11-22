import { useContext, createContext } from 'react';
import { ArticleResponseDto, ArticleHistoryDto } from '@newsfeed/data';

export const ArticleContext = createContext<
  ArticleResponseDto | ArticleHistoryDto
>(undefined);

export const useArticleContext = () => useContext(ArticleContext);
