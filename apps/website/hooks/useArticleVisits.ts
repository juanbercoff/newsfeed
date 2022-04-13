import { postArticleVisit } from '../services/article-visits-api';
import { useMutation, useQueryClient } from 'react-query';
import { CreateArticleVisitDto } from '@newsfeed/data';

export function usePostArticleVisit() {
  const queryClient = useQueryClient();
  return useMutation((data: CreateArticleVisitDto) => postArticleVisit(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('articleVisits');
    },
  });
}
