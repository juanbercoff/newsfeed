import { useContext, createContext } from 'react';
import {
  ArticleResponseDto,
  ArticlesWithLikesResponseDto,
  ArticleHistoryDto,
} from '@newsfeed/data';

export const ArticleContext = createContext<
  ArticlesWithLikesResponseDto | ArticleHistoryDto
>(undefined);

export const useArticleContext = () => useContext(ArticleContext);
