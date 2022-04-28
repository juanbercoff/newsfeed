import { useQuery } from 'react-query';
import axios from 'axios';

export function useGetImages(query: string, page: number) {
  const API_URL = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}`;
  return useQuery(['images', query, page], async () => await axios(API_URL));
}
