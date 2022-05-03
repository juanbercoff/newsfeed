import {
  postArticleVisit,
  getArticleVisits,
} from '../services/article-visits-api';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { CreateArticleVisitDto } from '@newsfeed/data';

export function usePostArticleVisit() {
  const queryClient = useQueryClient();
  return useMutation((data: CreateArticleVisitDto) => postArticleVisit(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('articleVisits');
    },
  });
}

export function useGetArticleVisits(articleId: string) {
  return useQuery(['articleVisits', articleId], () =>
    getArticleVisits(articleId)
  );
}
