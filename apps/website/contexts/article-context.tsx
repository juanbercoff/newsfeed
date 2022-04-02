import { useContext, createContext } from 'react';
import { ArticleResponseDto } from '@newsfeed/data';

export const ArticleContext = createContext<ArticleResponseDto>(undefined);

export const useArticleContext = () => useContext(ArticleContext);
