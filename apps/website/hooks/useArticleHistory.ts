import { getArticleHistory } from '../services/article-history-api';
import { useQuery } from 'react-query';

export function useGetArticleHistory(articleId: string) {
  return useQuery(['articleHistory', articleId], () =>
    getArticleHistory(articleId)
  );
}
