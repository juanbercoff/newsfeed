import { useContext, createContext } from 'react';
import {
  ArticleResponseDto,
  ArticlesWithLikesResponseDto,
} from '@newsfeed/data';

export const ArticleContext =
  createContext<ArticlesWithLikesResponseDto>(undefined);

export const useArticleContext = () => useContext(ArticleContext);
