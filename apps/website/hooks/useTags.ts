import { getTag, getTags } from '../services/tags-api';
import { useQuery } from 'react-query';

export function useGetTags() {
  return useQuery(['tags'], () => getTags());
}

export function useGetTag(tagId: string) {
  return useQuery(['tag'], () => getTag(tagId));
}
