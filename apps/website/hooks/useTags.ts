import { getTags } from '../services/tags-api';
import { useQuery } from 'react-query';

export function useGetTags() {
  return useQuery(['tags'], () => getTags());
}
