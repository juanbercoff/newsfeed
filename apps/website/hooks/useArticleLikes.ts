import { AllArticlesLikesDto } from '@newsfeed/data';
import { getAllArticlesLikes } from '../services/article-likes-api';
import { useQuery } from 'react-query';

export function useGetAllArticlesLikes(initialData: AllArticlesLikesDto[]) {
  return useQuery(['allArticlesLikes'], () => getAllArticlesLikes(), {
    initialData,
  });
}
