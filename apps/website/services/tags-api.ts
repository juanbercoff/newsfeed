import { callApiService, getEndpoint } from './api-service-utilities';
import { Tag } from '@newsfeed/data';

export async function getTags(): Promise<Tag[]> {
  return callApiService<Tag[]>({
    url: getEndpoint('tags'),
    method: 'GET',
  });
}

export async function getTag(tagId: string): Promise<Tag> {
  return callApiService<Tag>({
    url: getEndpoint(`tags/${tagId}`),
    method: 'GET',
  });
}
